const express=require('express')
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');


const app=express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

app.use('/ai', aiRoutes);
app.get('/',(req,res)=>{
  res.send('hello world')
})

module.exports=app