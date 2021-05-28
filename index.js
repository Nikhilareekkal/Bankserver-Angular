const express = require('express');
const session = require('express-session');
const dataService = require('./services/data.service');
const app = express();

app.use(session({
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false
}));
app.use(express.json());
//GET - READ
app.get('/',(req,res)=>{
    res.send("THIS IS A GET METHOD")
})
//POST - CREATE
app.post('/',(req,res)=>{
    res.send("THIS IS A POST METHOD")
})


//POST - REGISTER
app.post('/register',(req,res)=>{
 console.log(req.body);
 const result = dataService.register(req.body.uname,req.body.acno,req.body.pswd);
 res.status(result.statusCode).json(result);
// console.log(res.status(result.statuscode).json(result));
//console.log(res.send(result.message));
});

//POST - LOGIN
app.post('/login',(req,res)=>{
    console.log(req.body);
    const result = dataService.login(req,req.body.acno,req.body.pswd);
    res.status(result.statusCode).json(result);

   });

   //POST - DEPOSIT
   app.post('/deposit',(req,res)=>{
       console.log(req.session.currentUser)
    console.log(req.body);
    const result = dataService.deposit(req,req.body.acno,req.body.pswd,req.body.amount);
    res.status(result.statusCode).json(result);

   });

   //POST - WITHDRAW
   app.post('/withdraw',(req,res)=>{
    console.log(req.body);
    const result = dataService.withdraw(req.body.acno,req.body.pswd,req.body.amount);
    res.status(result.statusCode).json(result);

   });


//PUT - UPDATE/MODIFY WHOLE
app.put('/',(req,res)=>{
    res.send("THIS IS A PUT METHOD")
})
//PATCH - UPDATE/MODIFY PARTIALLY
app.patch('/',(req,res)=>{
    res.send("THIS IS A PATCH METHOD")
})//DELETE - DELETE
app.delete('/',(req,res)=>{
    res.send("THIS IS A DELETE METHOD")
})


app.listen(3000,()=>{
    console.log("Server Started at port:3000");
})