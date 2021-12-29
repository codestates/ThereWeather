const { sign, verify } = require("jsonwebtoken")
require("dotenv").config()

module.exports = {
    //액세스 토큰 발급
    getAccessToken: (data) => {
        return sign(data, process.env.ACCESS_SECRET, {
            expiresIn: "1h",
        })
    },

    //리프레시 토큰 발급
    getRefreshToken: (data) => {
        return sign(data, process.env.REFRESH_SECRET, {
            expiresIn: "1days",
        })
    },

    //액세스, 리프레시 토큰 전달
    sendToken: (res, accessToken, refreshToken) => {
        return res
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "None",
                secure: true,
            })
            .status(200)
            .json({
                data: { accessToken, refreshToken },
                message: "로그인 성공",
            })
    },

    //액세스 토큰 재전달
    resendAccessToken: (res, accessToken, data) => {
        return res.json({
            data: { accessToken, userInfo: data },
            message: "access token 재발급 완료",
        })
    },

    //리프레시 토큰 유효성검사, 해독
    checkAuthRefreshToken: (refreshToken) => {
        try {
            return verify(refreshToken, process.env.REFRESH_SECRET)
        } catch (err) {
            return null
        }
    },
    isAuthorized: (req) => {
        const authorization = req.headers.authorization
        //console.log("여기 tokenfunc/index.js:" ,authorization) //token e~
        if (!authorization) {
            return null
        }
        const atoken = authorization.split(" ")[1]
        //console.log("server/tokenfunc/index.js:", atoken) //토큰값 잘 찍힘
        try {
            return verify(atoken, process.env.ACCESS_SECRET)
        } 
        catch (err) {
            return null
        }
    },
}
