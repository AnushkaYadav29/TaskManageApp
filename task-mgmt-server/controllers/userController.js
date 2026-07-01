const User=require('../models/userModel')
const bcryptjs=require('bcryptjs')
const jwt = require("jsonwebtoken");
require('dotenv').config()
const { Op } = require("sequelize");

 const register = async (req, res) => {
    try {

        let { name, email, password, contactNumber } = req.body;

        // Get uploaded image
        const profileImage = req.file ? req.file.filename : null;

        if (!name || !email || !password || !contactNumber) {
            return res.status(400).send({
                msg: "All fields are required",
                success: false
            });
        }

        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(401).send({
                msg: "User already exists",
                success: false
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create User
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            contactNumber,
            profileImage      // <-- New field
        });

        return res.status(201).send({
            msg: "Successfully Registered",
            success: true,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                contactNumber: newUser.contactNumber,
                profileImage: newUser.profileImage
            }
        });

    } catch (error) {

        console.log(error);

        return res.status(500).send({
            msg: "Server Error",
            success: false
        });

    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        if (!email || !password) {
            return res.status(400).send({
                msg: "Email and Password are required",
                success: false
            });
        }

        
        const existingUser = await User.findOne({
            where: { email }
        });

        if (!existingUser) {
            return res.status(404).send({
                msg: "User does not exist",
                success: false
            });
        }

       
        const isPassCorrect = await bcryptjs.compare(
            password,
            existingUser.password
        );

        if (!isPassCorrect) {
            return res.status(401).send({
                msg: "Invalid Credentials",
                success: false
            });
        }

        const id=existingUser.id
        const role=existingUser.role

        const token=jwt.sign({id:id,role:role}, process.env.SECRET_KEY,{expiresIn:"2h"})

        return res.status(200).send({
            msg: "Logged in Successfully",
            success: true,
            user: {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
                contactNumber: existingUser.contactNumber
            },token:token
        });

    } catch (error) {
        console.log(error);

        return res.status(500).send({
            msg: "Server Error",
            success: false
        });
    }
};

// const getUserInfo = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const user = await User.findByPk(id, {
//             attributes: {
//                 exclude: ["password"]
//             }
//         });

//         console.log(user)
//         if (!user) {
//             return res.status(404).send({
//                 msg: "User not found",
//                 success: false
//             });
//         }

//         return res.status(200).send({
//             success: true,
//             user
//         });

//     } catch (error) {
//         res.status(500).send({
//             msg: "Server Error",
//             success: false
//         });
//     }
// };


const getUserInfo = async (req, res) => {
    try {
        const { id } = req.user;

        const user = await User.findByPk(id, {
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"]
            }
        });

        if (!user) {
            return res.status(404).send({
                success: false,
                msg: "User not found"
            });
        }

        return res.status(200).send({
            success: true,
            loggedUser: user
        });

    } catch (error) {
        console.log(error);

        return res.status(500).send({
            success: false,
            msg: "Server Error"
        });
    }
};

const update = async (req, res) => {

    try {

        const { id } = req.params;

        const {

            name,

            email,

            contactNumber

        } = req.body;

        const user = await User.findByPk(id);

        if (!user) {

            return res.status(404).send({

                success:false,

                msg:"User not found"

            });

        }

        let profileImage=user.profileImage;

        if(req.file){

            profileImage=req.file.filename;

        }

        await user.update({

            name:name || user.name,

            email:email || user.email,

            contactNumber:contactNumber || user.contactNumber,

            profileImage

        });

        res.status(200).send({

            success:true,

            msg:"Profile Updated Successfully",

            user

        });

    }

    catch(error){

        console.log(error);

        res.status(500).send({

            success:false,

            msg:"Server Error"

        });

    }

}

async function getTotalUsers(req, res) {
    try {

        const totalUsers = await User.findAll({
            where: {
                role: "user"
            }
        });

        return res.status(200).send({
            success: true,
            totalUsers
        });

    } catch (error) {

        console.log(error);

        return res.status(500).send({
            success: false,
            msg: "Server Error"
        });

    }
}



async function getAllUsers(req, res) {
    try {

        const users = await User.findAll({
            where: {
                role:"user"
            },
            attributes: {
                exclude: ["password"]
            }
        });

        return res.status(200).send({
            success: true,
            users
        });

    } catch (error) {

        console.log(error);

        return res.status(500).send({
            success: false,
            msg: "Server Error"
        });

    }
}



async function changePassword(req, res) {
    try {

        const { id } = req.user;

        const {
            oldPassword,
            newPassword
        } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).send({
                success: false,
                msg: "All fields are required"
            });
        }

        const user =
            await User.findByPk(id);

        if (!user) {
            return res.status(404).send({
                success: false,
                msg: "User not found"
            });
        }

        const isMatch =
            await bcryptjs.compare(
                oldPassword,
                user.password
            );

        if (!isMatch) {
            return res.status(400).send({
                success: false,
                msg: "Old password is incorrect"
            });
        }

        const salt =
            await bcryptjs.genSalt(10);

        const hashedPassword =
            await bcryptjs.hash(
                newPassword,
                salt
            );

        await user.update({
            password: hashedPassword
        });

        return res.status(200).send({
            success: true,
            msg: "Password changed successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).send({
            success: false,
            msg: "Server Error"
        });

    }
}




module.exports={
    register,
    login,
    getUserInfo,
    update,
    getTotalUsers,
    getAllUsers,
    changePassword
}





