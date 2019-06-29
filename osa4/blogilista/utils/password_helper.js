"use strict";

let crypto;
try{
    crypto = require("crypto");
}
catch(error){
    throw error;
}

const jwt = require("jsonwebtoken");

const user = require("../models/user.js");

module.exports = {
    encryptPassword: (password) => {
        return crypto.createHash("sha512").update(password).digest("hex");
    },
    login: async (username,password) => {
        let userInfo;
        try{
            userInfo = await user.getUserInfo(username);
            userInfo = userInfo[0];
        }
        catch(error){
            return {
                status: -1,
                token: null,
                username: null,
                name: null
            };
        }
        if(userInfo && crypto.createHash("sha512").update(password).digest("hex") === userInfo.password){
            // Oikea salasana
            const loginTokenData = {
                username: userInfo.username,
                id: userInfo.id
            };
            return {
                status: 1,
                token: jwt.sign(loginTokenData,process.env.TOKENSECRET),
                username: userInfo.username,
                name: userInfo.name
            };
        }
        else{
            // Väärä salasana
            return {
                status: -2,
                token: null,
                username: null,
                name: null
            };
        }
    },
    decryptToken: (token) => {
        try{
            const decoded = jwt.verify(token,process.env.TOKENSECRET);
            if(!decoded || !decoded.id){
                return -1;
            }
            else{
                return decoded;
            }
        }
        catch(error){
            return -1;
        }
    }
};