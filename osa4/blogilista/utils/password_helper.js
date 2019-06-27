"use strict";

let crypto;
try{
    crypto = require("crypto");
}
catch(error){
    throw error;
}

module.exports = {
    encryptPassword: (password) => {
        return crypto.createHash("sha512").update(password).digest("hex");
    }
};