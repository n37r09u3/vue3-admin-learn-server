const mongoose = require('mongoose')
const userScheme = mongoose.Schema({
    "userId": Number,
    "userName": String,
    "userPwd": String,
    "userEmail": String,
    "mobile": String,
    "sex": Number,
    "depId": [],
    "job": String,
    "state": {
        type: Number,
        default:1
    },
    "role": {
        type: Number,
        default:1
    },
    "roleList": [],
    "createTime": {
        type: Date,
        default:Date.now()
    },
    "lastLoginTime": {
        type: Date,
        default: null
    },
    remark: String
})

module.exports = mongoose.model("users",userScheme,"users")
