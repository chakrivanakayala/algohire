const jwt = require("jsonwebtoken");
module.exports = {
    auth :  async (allowedRoles) =>{


        return async (req,res,next) =>{


            try{


                let token = req?.headers?.authorization?.split(" ")[1];

                if (token === undefined) {
                  res.status(401).json({ message: " authorization  token is required" });
                  return "";
                }

                try {
                    let decoded = jwt.verify(token, __configurations.SECREAT);
                    req.user = decoded;
                  } catch (err) {
                    res.status(401).json({ message: "  token is invalid" });
                    return "";
                  }
            

                  let isAllowed = req.user.roles.some((role) => allowedRoles.includes(role))
                  if (!isAllowed){
                    res.status(403).json({message:"not permitted"})
                    return
                  }
                next();
        
            }
            catch(err){
                console.log(`Error occured while doing auth`)
                req.status(500).json({message:"internal server error"})
            }
        }
    } 
}