const express =require('express');
const cors= require('cors')
const app =express();
app.use(express.json());
app.use(cors());
const validateInput=(req,res,next)=>{
    if(!req.body.dat||!Array.isArray(req.body.data)){
        return res.status(400).json({
            is_success:false,
            error:"Invalid Input"
            
        });
    }
    next();
};
app.post('/bfhl', validateInput,(req,res)=>{
    try{
        const{data}=req.body;
        const numbers=data.filter(item=>!isNaN(item));
        const alphabets=data.filter(item=>/^[A-Za-z]$/.test.test(item));
    const highest_alphabet=alphabets.length>0
    ?[alphabets.reduce((max,curr)=>
        curr.toLowerCase(), max.toLowerCase()?curr:max)]
    :[];
    const response={
        is_success:true,
        user_id:"john_doe_17091999",
        email:"john@xyz.com",
        roll_number:"ABCD123",
        number,
        alphabets,
        highest_alphabet,
    };
    
    res.json(response);
    }
    catch(error){
    res.status(500).json({
is_success:false,
error:"Internal server error"
    })
}
});
app.get('/bfhl',(req,res)=>{
    res.json({operation_code:1});
});
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`Server running on port${PORT}`)
});