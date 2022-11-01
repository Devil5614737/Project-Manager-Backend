const dotenv=require('dotenv')
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')
const app=express()
 const signup=require('./routes/signup')
 const login=require('./routes/login');
 const post=require('./routes/post');


dotenv.config({path:'./.env'});


app.use(cors());
app.use(express.json());

function ConnectDb(){
    mongoose.connect(process.env.URI,{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log('connected to mongodb')).catch(e=>console.log(e))
}
ConnectDb();

 app.use('/api',signup);
 app.use('/api',login);
 app.use('/api',post);



const port=process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})