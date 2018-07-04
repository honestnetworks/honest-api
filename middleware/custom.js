const Company 			    = require('./../models/company');
const Building 			    = require('./../models/building');

let company = async function (req, res, next) {
    let company_id, err, company;
    company_id = req.params.company_id;

    [err, company] = await to(Company.findOne({_id:company_id}));
    if(err) return ReE(res,"err finding company");

    if(!company) return ReE(res, "Company not found with id: "+company_id);
    let user, users_array;
    user = req.user;
    users_array = company.users.map(obj=>String(obj.user));

    if(!users_array.includes(String(user._id))) return ReE(res, "User does not have permission to read app with id: "+app_id);

    req.company = company;
    next();
}
module.exports.company = company;

let building = async function (req, res, next) {
    let building_id, err, building;
    building_id = req.params.building_id;

    [err, building] = await to(Building.findOne({_id:building_id}));
    if(err) return ReE(res,"err finding building");

    if(!building) return ReE(res, "Building not found with id: "+building_id);
    let user, users_array;
    user = req.user;
    users_array = building.users.map(obj=>String(obj.user));

    if(!users_array.includes(String(user._id))) return ReE(res, "User does not have permission to read app with id: "+app_id);

    req.building = building;
    next();
}
module.exports.building = building;