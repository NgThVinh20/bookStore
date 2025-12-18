var jwt = require('jsonwebtoken');
const AccountAdmin = require("../../models/accountAdmin.model")
const Role = require("../../models/role.model");
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
    if(existAccount.role){
      const role = await Role.findOne({
        _id:existAccount.role,
        deleted:false
      })
      if(role){
        existAccount.roleName = role.name;
        res.locals.pers = role.permissions;
      }
    }
    req.account = existAccount;
    res.locals.account = existAccount;

    next();
  } catch (error) {
    // console.log(error);
    res.clearCookie("token");
    res.redirect(`/${pathAdmin}/account/login`);
  }
 
  
}