require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const authProtect = async (req, res, next) => {
    let token;

    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = [req.headers.authorization.split(" ")[1]];

            const decoded = jwt.verify(token[0], process.env.JWT_KEY);

            req.user = await User.findById(decoded.id).select("-password");
            next();
        }
        if (!token) {
            res.status(401);

            throw new Error("Not authorized, token failed");
        }
    } catch (error) {
        throw new Error("Not authorized, token failed");
    }
};
const verifyJWT = async (req, _, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new Error("Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.JWT_KEY);

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken",
        );

        if (!user) {
            throw new Error("Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new Error(error?.message || "Invalid access token");
    }
};
module.exports = {
    authProtect,
    verifyJWT,
};
