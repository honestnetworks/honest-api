const express 			= require('express');
const router 			= express.Router();

const UserController 	= require('./../controllers/UserController');
const CompanyController = require('./../controllers/CompanyController');
const BuildingController = require('./../controllers/BuildingController');
const HomeController 	= require('./../controllers/HomeController');

const custom 	        = require('./../middleware/custom');

const passport      	= require('passport');
const path              = require('path');


require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

router.post(    '/users/login',     UserController.login);  // Login

router.get(     '/users/all',           passport.authenticate('jwt', {session:false}), UserController.getAll);        // R

router.post(    '/users',           UserController.create);                                                    // C
router.get(     '/users',           passport.authenticate('jwt', {session:false}), UserController.get);        // R
router.put(     '/users',           passport.authenticate('jwt', {session:false}), UserController.update);     // U
router.delete(  '/users',           passport.authenticate('jwt', {session:false}), UserController.remove);     // D


router.get(     '/companies/all',             passport.authenticate('jwt', {session:false}), CompanyController.getAll);                  // R

router.post(    '/companies',             passport.authenticate('jwt', {session:false}), CompanyController.create);                  // C
router.get(     '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.get);     // R
router.put(     '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.update);  // U
router.delete(  '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.remove);  // D


router.get(     '/buildings/all',             passport.authenticate('jwt', {session:false}), BuildingController.getAll);               // R

router.post(    '/buildings',             passport.authenticate('jwt', {session:false}), BuildingController.create);                   // C
router.get(     '/buildings/:building_id', passport.authenticate('jwt', {session:false}), custom.building, BuildingController.get);     // R
router.put(     '/buildings/:building_id', passport.authenticate('jwt', {session:false}), custom.building, BuildingController.update);  // U
router.delete(  '/buildings/:building_id', passport.authenticate('jwt', {session:false}), custom.building, BuildingController.remove);  // D


router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)


//********* API DOCUMENTATION **********
router.use('/docs/api.json',            express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;
