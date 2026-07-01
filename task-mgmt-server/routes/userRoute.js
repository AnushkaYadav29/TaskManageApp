const express = require("express");

const {
    register,
    login,
    getUserInfo,
    update,
    getTotalUsers,
    getAllUsers,
    changePassword
} = require("../controllers/userController");

const { auth, admin } = require("../middleware/auth");

const upload = require("../middleware/multer");

const userRouter = express.Router();

userRouter.post(
    "/register",
    upload.single("profileImage"),
    register
);

userRouter.post("/login", login);

userRouter.get(
    "/getUserInfo",
    auth,
    getUserInfo
);

userRouter.put(
    "/update/:id",
    auth,
    upload.single("profileImage"),
    update
);

userRouter.get(
    "/totalUsers",
    auth,
    admin,
    getTotalUsers
);

userRouter.get(
    "/getAllUsers",
    auth,
    admin,
    getAllUsers
);

userRouter.put(
    "/changePassword",
    auth,
    changePassword
);

module.exports = userRouter;