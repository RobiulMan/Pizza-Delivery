const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");
const generateAccessAndRefereshToekns = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("user not found");
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error("something went wrong!");
    }
};

const loginUserController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const { accessToken, refreshToken } =
                await generateAccessAndRefereshToekns(user._id);
            const loggedInUser = await User.findById(user._id).select(
                "-password -refresToken",
            );

            const options = {
                httpOnly: true,
                secure: true,
            };

            res.status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json({
                    isAdmin: user?.isAdmin,
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                });
        } else {
            res.status(401).json({ message: "user does not exist" });
            return;
        }
    } catch (err) {
        throw new Error(err);
    }
};
const refreshAccessTokenController = async (req, res) => {
    try {
        const incomingRefreshToken =
            req.cookies.refresToken || req.body.refresToken;

        if (incomingRefreshToken) {
            throw new Error("unauthorized request");
        }

        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET,
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new Error("Invlid refreshToken");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new Error("refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        };

        const { refreshToken, accessToken } =
            await generateAccessAndRefereshToekns(user._id);

        res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                newAccessToken: accessToken,
                newRefreshToken: refreshToken,
            });
    } catch (error) {
        throw new Error(error);
    }
};

const logoutUserController = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    refreshToken: undefined,
                },
            },
            {
                new: true,
            },
        );

        const options = {
            httpOnly: true,
            secure: true,
        };

        res.status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({ message: "user logged out" });
    } catch (error) {
        throw new Error(error);
    }
};

const profileController = (req, res) => {
    if (req.user) {
        res.status(200).json({
            profile: req.user,
        });
    }
};

module.exports = {
    loginUserController,
    logoutUserController,
    profileController,
    refreshAccessTokenController,
};
