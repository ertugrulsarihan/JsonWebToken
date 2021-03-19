const router=require('express').Router();
const authVerify=require("./tokenCorrect");

router.get('/',authVerify,(req,res)=>{
    res.json({
        posts:{
            title:'Post Title',
            description:'Post Description'
        }
    })
});

module.exports=router;