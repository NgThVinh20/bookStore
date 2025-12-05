var jwt = require('jsonwebtoken');
const AccountAdmin = require("../../models/accountAdmin.model")

module.exports.verifyToken = async (req, res, next) => {
  try {
     const token = req.cookies.token;
    if(!token){
      res.redirect(`/${pathAdmin}/account/login`);
      return;
    }
    const decode = jwt.verify(token,process.env.JWT_Secret);
    const { id, email } = decode;  
    const existAccount = await AccountAdmin.findOne({
      _id:id,
      email:email,
      status:"active"
    })
    if(!existAccount){
      res.clearCookie("token");
      res.redirect(`/${pathAdmin}/account/login`);
    }
    next();
  } catch (error) {
    // console.log(error);
    res.clearCookie("token");
    res.redirect(`/${pathAdmin}/account/login`);
  }
 
  
}