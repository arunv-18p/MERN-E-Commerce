const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const getJWTToken = async (data) => {
    try {
        const token = await jwt.sign({ id: data }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE_TIME,
        });
        return token;
    } catch (err) {
        if (process.env.NODE_ENV === "development") {
            console.log(err.message);
        } else {
            console.log("unable to get token");
        }
    }
};

const verifyJWTToken = async (token) => {
    try {
        const data = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        return data;
    } catch (err) {
        if (process.env.NODE_ENV === "development") {
            console.log(err.message);
        } else {
            console.log("unable to verify token");
        }
    }
};

const getCryptoToken = async () => {
    const token = await crypto.randomBytes(20).toString("hex");
    return token;
}

const getCryptoTokenSha256 = async (token) => {
    const sha256hash = await crypto.createHash("sha256").update(token).digest("hex");
    return sha256hash;
}

const sendTokenCookie = async (res, statusCode, user) => {
    const token = await getJWTToken(user._id.toString());
    const cookieOptions = {
        httpOnly: true,
        maxAge: process.env.COOKIE_EXPIRE_TIME,
    };
    res.status(statusCode).cookie("token", token, cookieOptions).json({
        success: true,
        token,
        user,
    });
};

module.exports = { getJWTToken, sendTokenCookie, verifyJWTToken, getCryptoToken, getCryptoTokenSha256 };
