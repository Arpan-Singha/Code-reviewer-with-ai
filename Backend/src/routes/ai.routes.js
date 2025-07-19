const express=require ('express');
const router=express.Router();

const{getreview}=require('../controllers/ai.controller');

router.post('/get-review',getreview);





module.exports=router;