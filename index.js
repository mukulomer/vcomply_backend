const express = require('express');

const app = express();
const mongoose = require('mongoose');
//pipeline and middleware
app.use(express.json());

mongoose.connect('mongodb://localhost/vendor').then(()=> console.log("connect to database")).catch((err)=>  console.log("exception occured",err));


const VendorSchema = new mongoose.Schema({
   name : String,
   levels : [Object],
   result : String
});

const collectionSchema = new mongoose.Schema({
    type : String,
    acceptcount: Number,
    rejectcount : Number,
    removecount : Number
});


const vendor = new mongoose.model('vendor',VendorSchema);
const User = new mongoose.model('collection',collectionSchema);

app.get('/home',(req,res)=>{
    
    vendor.find().then(data =>  res.send(data) );
    return;
})

app.post('/home',(req,res) =>{
    const vendors = new User({
            type : req.body.type,
            acceptcount: req.body.acceptcount,
            rejectcount : req.body.rejectcount,
            removecount : req.body.removecount
 
    })
 
    vendors.save().then((vendor)=> res.send(vendor));

})

app.get('/venor' ,(req,res)=>{
    User.find().then(data =>  res.send(data) );
    return;
})

app.listen(3000, () => console.log('Listening'));

