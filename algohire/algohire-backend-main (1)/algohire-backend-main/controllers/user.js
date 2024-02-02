
const path = require('path');
const UserModal = require(path.resolve(DB_MODEL,'user'))
const dbconnect = require(path.resolve(__dirname,'..','dbconnect'))
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const SALTROUNDS = 10
module.exports ={

    'create': async (req,res) =>{

        // if time permit  do input validation

        try{
            dbconnect()
            req.body.password = await bcrypt.hash(req.body.password,SALTROUNDS)
            let doc =    await   UserModal.create(req.body)
            res.status(201).json({id:doc._id})

        }
        catch(err){

            console.log(`Error occured while creating a new user ${err}`)
            res.status(500).json({message:'internal server error'})
        }
    },

    'login': async (req,res) =>{
       
        try{

            // find user 
            //  campare password
            // generate token
           await  dbconnect()
           let userDoc = await UserModal.findOne({email:req.body.email})
        
           if (userDoc == undefined) {
            return res.status(404).json({message:"user doesn ot exist"})
           }

           let isPasswordMatched = await bcrypt.compare(req.body.password,userDoc.password)

           if (isPasswordMatched == false){
            return res.status(400).json({message:'invalid password'})
           }

           let token = jwt.sign({id:userDoc._id, roles:userDoc.roles} ,__configurations.SECREAT)
           res.status(200).json({token:token})


        }
        catch(err){

            console.log(`Error occured while login  a new user ${err}`)
            res.status(500).json({message:'internal server error'})
        }
    }
}