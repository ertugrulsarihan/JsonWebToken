const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
 const token=req.header('auth-token');
 if(!token) return res.status(401).send('İzin sağlanamadı!');
 try {
     const correct=jwt.verify(token,process.env.TOKEN_SECRET);
     req.userİnfo=correct;
     console.log(req.userİnfo);
     next();
 } catch (error) {
     res.status(400).send('Yanlış token');
 }
}