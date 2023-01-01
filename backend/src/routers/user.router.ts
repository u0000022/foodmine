import { Router } from 'express'
import { sample_users } from '../data'
import  jwt from "jsonwebtoken"
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';

const router = Router()

router.get("/seed", asyncHandler(
   async (req, res) => {
      const foodsCount = await UserModel.countDocuments();
      if(foodsCount> 0){
        res.send("Seed is already done!");
        return;
      }
      await UserModel.create(sample_users);
      res.send("Seed Is Done!");
  }
))

router.post("/login",  asyncHandler(
   async (req,res) => {
   const {email, password} = req.body
   //const user =  sample_users.find(user => user.email === email && user.password === password)
   const user = await UserModel.findOne({email})

   if(user && (await bcrypt.compare(password,user.password))) {
      res.send(generateTokenResponce(user))
   } else {
      res.status(HTTP_BAD_REQUEST).send("User name or password is not valid")
   }
}))

const generateTokenResponce = (user: any) => {
 const  token = jwt.sign({
   email: user.emails,
   isAdmin : user.isAdmin
}, "SomeRandomRoken",{expiresIn:"30d"}
)

return {
   id: user.id,
   email: user.email,
   name: user.name,
   address: user.address,
   isAdmin: user.isAdmin,
   token: token
 };

}

router.post('/register', asyncHandler(
   async (req,res) => {
      const { name, email, password, address}  = req.body
      const user = await UserModel.findOne({email})
      if (user) {
         res.status(HTTP_BAD_REQUEST).send("Username is already exist,  please login!")
         return
      }
      const encryptedPassword = await bcrypt.hash(password, 10)
      const newUser : User = {
         id: '',
         name,
         email : email.toLowerCase(),
         address,
         password : encryptedPassword,
         isAdmin :false
      } 
      const dbUser  = await UserModel.create(newUser)
      res.send(generateTokenResponce(dbUser))

   }
))

export default router