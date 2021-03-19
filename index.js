const express=require('express');
const app=express();
const mongoose=require('mongoose');




mongoose.connect("mongodb+srv://Ertugrul:Ertugrul@cluster1.bcqt2.mongodb.net/temelAuthDB?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true},()=>{console.log('DBye erişim sağlandı');})

const authRoute=require('./routes/auth');
const postRoute=require('./routes/posts')
app.use(express.json())
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);

app.listen(3000,()=>{
    console.log('SERVER ÇALIŞIYOR!!');
})