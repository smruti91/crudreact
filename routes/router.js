const express = require('express');
const users = require('../models/userSchema');
const router = express.Router();

// router.get('/', function(req, res) {
//     console.log("connect");
// });
//register
router.post("/register",async(req,res)=>{
    //console.log(req.body);
    const {name,email,age,mobile,work,address} = req.body;
    if(!name || !email || !age || !mobile || !work || !address){
        res.status(404).json("pleae fill the data");
    }
    try {
        const chkUser = await users.findOne({ email: email});
        console.log(chkUser);

        if(chkUser){
            res.status(404).json("This user already persent");
        }else{
            const addUser = new users({
                name,email,age,mobile,work,address
            });
            await addUser.save();
            res.status(201).json(addUser);
            console.log(addUser);
        }
        
    } catch (error) {
        res.status(404).json(error);
    }
});

//get user data

  router.get("/getdata",async(req,res)=>{
    try{
       const userdata = await users.find();
       res.status(201).json(userdata);
       console.log(userdata);
    }catch(error){
      res.status(201).json(error);
    }
  })

//get individual user
router.get("/getuser/:id",async(req,res)=>{
    try {
      const {id} = req.params;
      const userIndividual = await users.findById({_id:id});
      res.status(201).json(userIndividual);  
    } catch (error) {
        res.status(404).json(error);
    }
})

//update user data
router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const updateUser = await users.findByIdAndUpdate(id,req.body,{new:true});
        console.log(updateUser);
        res.status(201).json(updateUser);
    } catch (error) {
      res.status(422).json(error);  
    }
})

//delete user data 
router.delete('/deleteuser/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteUser = await users.findByIdAndDelete({_id:id});
        console.log(deleteUser);
        res.status(201).json(deleteUser);
    } catch (error) {
        res.status(422).json(error)
    }
})

module.exports = router;