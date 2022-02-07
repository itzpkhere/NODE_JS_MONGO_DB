const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

mongoose.connect('mongodb+srv://itzpkhere:itz_pk_here@nodetuts.epwi7.mongodb.net/users?retryWrites=true&w=majority');
const user_records = mongoose.model('user_records',{name : String ,city : String, email : String ,password : String });


app.get('/',(req,res)=>{
    console.log("Welcome To Node JS!");
    // res.cookie('name','pankaj',{ httpOnly : true, secure : true});
    res.json({ 
        message : 'Welcome To Node JS!',
    })
})

app.get('/login',(req,res)=>{
    res.json({
        message : 'Welcome To The Login Page!'
    })
})

app.post('/login',async(req,res)=>{ 
    const user = {
        email : 'w@w',
        password : 'w'
    }
    const user1 = await user_records.findOne({ user });
    if(user1){
        const token = jwt.sign({ user_id : user._id },"my_secret_key",{ expiresIn: "5m" },{ httpOnly : true });
        user.token = token;
        user.password = undefined;
        res.status(200).cookie("token",token).json({ user });
        
        // res.send({ 
        //     name : user.name,
        //     email : user.email,
        //     password : user.password,
        //     city : user.city
        // })
    }
    console.log(user);  
})
    // {
    //     if(err){
    //         throw new Error('Invalid Input!');
    //     }else{
    //             const token = jwt.sign({ user_id : user._id },"my_secret_key",{ expiresIn: "5m" },{ httpOnly : true });
    //             user.token = token;
    //             user.password = undefined;
    //             res.send({ 
    //                 name : user.name,
    //                 email : user.email,
    //                 password : user.password,
    //                 city : user.city
    //             })
    //             res.status(200).cookie("token",token).json({ user });
    //           }
    //     })
    // })


// Verify Token
function verifyToken(req,res,next){
    jwt.verify(req.cookies.token,'my_secret_key');
    // req.user = decode;
    // console.log("Decode : " + decode);
    next();


    // const token = req.cookies.token ;
    // if(!token){
    //     res.status(403).json({
    //         message : 'not Logged In!'
    //     });
    // }else{
    //     const decode = jwt.verify(req.token,'my_secret_key');
    //     req.user = decode;
    //     next();
    // }
}
    
    // jwt.verify()
    // const bearerHeader = req.headers['authorization'];
    // if(typeof bearerHeader !== 'undefined'){
    //     const bearer = bearerHeader.split(' ');                                       
    //     const bearerToken = bearer[1];
    //     req.token = bearerToken;
    //     next();
    // }else{
    //     res.sendStatus(403);
    // }
    
app.get('/protected',verifyToken,(req,res,decoded)=>{
        // console.log(req.user);
        const user = jwt.verify(req.cookies("token",token),"my_secret_key").json({ user });
        // const ca = yourToken;
        // const base64Url = user.split('.')[1];
        // const decodedValue = JSON.parse(window.atob(base64Url));
        // console.log(user);
        // res.json({
        //     name : decoded.name,
        //     city : decoded.city
        // })
    })

    // jwt.verify(req.cookies.token,'my_secret_key',(err,decoded)=>{
    //     if(err){
    //         res.sendStatus(403);
    //     }else{
    //             res.json({
    //             message : 'Welcome To Protected Page',
    //             // data : data,
    //             // name : decoded.name,
    //             // email : decoded.email,
    //             // city : decoded.city
    //         })
    //     }


    // res.json({
    //     message :'Welcome to protected Page!'
    // })
    // jwt.verify(req.token,'my_secret_key',(err,data)=>{
    //     if(err){
    //         res.sendStatus(403);
    //     }else{
            
    //         res.json({
    //             data : data
    //         })
    //     }
    // })



app.get("/logout", (req, res) => {
    res.clearCookie(token);
    res.redirect("/");
})

app.post('/signup',(req,res)=>{
    const new_user = new user_records({name : 'x',city : 'Gwalior',email : 'x@x',password : 'x'});
    new_user.save().then(()=>{
        console.log("User Added Succesfully!");
        res.json({
            name : new_user.name,
            city : new_user.city,
            email : new_user.email,
            message : 'User Added Succesfully!'
        });
    })
})


app.listen(3000,()=>{
    console.log('Server started successfully on port 3000')
})



// if(user1){
    //     res.json({
    //         name : user1.name,
    //         city : user1.city,
    //         email : user1.email 
    //     })
    // }else{
    //     res.sendStatus(404);
    // }
