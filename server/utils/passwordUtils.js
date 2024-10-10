const bcrypt = require("bcryptjs");

const getPasswordHash = async (password, salt) => {
    try {
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch {
        if (process.env.NODE_ENV === "development") {
            console.log(err.message);
        } else {
            console.log("unable to get password hash")
        }
    }
}

const comparePassword = async (password, hash) => {
    try {
        const result = await bcrypt.compare(password, hash);
        return result;
    } catch (err) {
        if (process.env.NODE_ENV === "development") {
            console.log(err.message);
        } else {
            console.log("unable to compare password with hash")
        }
    }
}

module.exports = { getPasswordHash, comparePassword }