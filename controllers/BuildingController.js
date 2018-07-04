const Building = require('../models').Building;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, building;
    let user = req.user;

    let building_info = req.body;
    building_info.users = [{user:user._id}];

    [err, building] = await to(Building.create(building_info));
    if(err) return ReE(res, err, 422);

    return ReS(res,{building:building.toWeb()}, 201);
};
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, buildings;
    [err, buildings] = await to(user.Buildings());
    let buildings_json = [];
    for (let i in buildings){
        let building = buildings[i];
        buildings_json.push(building.toWeb())
    }
    return ReS(res, {buildings: buildings_json});
};
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let building = req.building;
    return ReS(res, {building:building.toWeb()});
};
module.exports.get = get;

const update = async function(req, res){
    let err, building, data;
    building = req.user;
    data = req.body;
    building.set(data);

    [err, building] = await to(building.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {building:building.toWeb()});
};
module.exports.update = update;

const remove = async function(req, res){
    let building, err;
    building = req.building;

    [err, building] = await to(building.remove());
    if(err) return ReE(res, 'error occured trying to delete the building');

    return ReS(res, {message:'Deleted Building'}, 204);
};
module.exports.remove = remove;