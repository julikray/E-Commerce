import tokenCreate from '../middleware/tokenCreate.js';
import adminModel from '../models/adminModel.js';

import bcrypt from "bcrypt";

class AuthController {
  async admin_login(req, res) {
    const { email, password } = req.body;

    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      console.log(admin);

      if (admin) {
        const match = await bcrypt.compare(password, admin.password);
        console.log(match);

        if (match) {
          const token = await tokenCreate({
            id: admin.id,
            role: admin.role,
          });

          res.cookie('accessToken' , token ,{
            expires : new Date(Date.now() + 7*24*60*60*1000)
          })
          return res.status(200).json({token , message : "Login success."});

        } else {
          return res.status(404).json({ error: "Password not found."});
        }
      } else {
        return res.status(404).json({error : "Email not found."});
      }
    } catch (error) {
      console.log({ error });
      return res.status(500).send("Internal Server Error");
    }
    // console.log(req.body);
  }


  async getUser(req , res) {

    const { id, role} = req;
    try{
      if(role === 'admin'){
        const user = await adminModel.findById(id)
        return res.status(200).json({ userInfo : user });
        
      }
      else{
        console.log("Seller Info")
      }

    }
    catch(error){
      console.log(error.message);
    }

  }

}

export default new AuthController();


