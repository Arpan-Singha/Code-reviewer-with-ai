const aiService = require('../Services/ai.service');


module.exports.getreview= async(req,res)=>{
  
  const code=req.body.code;

  if(!code){
    return res.status(400).send('code is required');
  }
  
  const response= await aiService(code);

  res.status(200).send(response);
}