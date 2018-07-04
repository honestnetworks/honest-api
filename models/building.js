const mongoose 			= require('mongoose');

let BuildingSchema = mongoose.Schema({
    name: {type:String},
    address: {type:String},
    buildings:  [ {user:{type : mongoose.Schema.ObjectId, ref : 'User'}, permissions:[{type:String}]} ],
}, {timestamps: true});

BuildingSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};

let building = module.exports = mongoose.model('Building', BuildingSchema);


