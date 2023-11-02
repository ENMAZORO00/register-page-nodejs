//console.log("hello shubham");
const express = require('express');
const res = require('express/lib/response');
const app = express();

let port = 3000;
require('./db/db');
const empCollection = require('./model/model');
const path = require('path');
const template_path = path.join(__dirname,'../template/views');
app.set('view engine', 'hbs');
app.set('views',template_path);




app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/empdata',async(req,res)=>{
    try {
        const password = req.body.password;
    const cpassword = req.body.cpassword;

    if(password === cpassword) {
        const empdata = new empCollection({
           name : req.body.name,
           email : req.body.email,
           phone : req.body.phone,
           password : req.body.password,
           cpassword : req.body.cpassword,
        });

        const postData = await empdata.save();
        res.send(postData)
    }else {
        res.send("password are not matching")
    }
    } catch (error) {
        res.send(error)
    }
})

app.listen(port,()=>{
    console.log(`listing to the port ${port}`);
})