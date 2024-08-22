const App = require('../models/app.model')
const moment = require('moment')

exports.createApp = async (req,res)=> {
    try{
        const getApp = await App.findOne({title:req.body.title})
        if(getApp){
            res.status(200).send({status:false,message: 'app already exist'})
        return
    }
        
        const app = new App(req.body)
        await app.save()
        res.status(202).send({status:true,app})
    }
    catch(error){
        res.status(500).send(error)
    }
    }

    // Get app
exports.getApps = async (req, res) => {
    try {
        const apps = await App.find();
        let formatData = apps.map(app => (
            {
                _id: app._id ,
                title: app.title,
                logo: app.logo,
                description : app.description,
                createdAt: moment.utc(app.createdAt).format("D/M/YYYY"),
            }))
        res.status(200).send({status:true,result:formatData});
    } catch (error) {
        console.log(error);
        
        res.status(500).send(error);
    }
};

// edit app
exports.editApp = async (req, res) => {
    try {
        await App.findByIdAndUpdate({ _id: req.params.id },{title:req.body.title})
        res.status(200).send({status:true,message:"Successfully edited"});
    } catch (error) {
        res.status(500).send(error);
    }
};

//delete app
exports.deleteApp = async (req, res) => {
    try {
        await App.findByIdAndDelete({ _id: req.params.id })
        res.status(200).send({status:true,message:"Successfully deleted"});
    } catch (error) {
        res.status(500).send(error);
    }
};