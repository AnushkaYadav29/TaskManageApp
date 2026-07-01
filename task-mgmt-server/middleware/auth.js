const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send({
                msg: "Token not provided"
            });
        }

        if (!authHeader.startsWith("Bearer ")) {
            return res.status(400).send({
                msg: "Not authorized. Invalid format"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY
        );

        req.user = {
            id: decoded.id,
            role: decoded.role
        };

        next();

    } catch (error) {
        return res.status(401).send({
            msg: "Invalid Token"
        });
    }
}


function admin(req,res,next){
    if(req.user.role=="admin"){
        next()
    }else{
        res.status(400).send({msg:"Unauthorized access"})
    }
}

module.exports = { auth,admin };