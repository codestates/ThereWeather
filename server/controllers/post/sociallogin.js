const { getAccessToken, getRefreshToken, sendToken } = require("../tokenFunc")
const { user } = require("../../models")

module.exports = async (req, res) => {
    console.log(req.body)
    const { user_id } = req.body

    try {
        const userInfo = await user.findOne({
            where: {
                user_id,
            },
        })
        if (!userInfo) {
            return res.status(414).send("아이디를 확인해주세요.")
        } else {
            const accessToken = getAccessToken(userInfo.dataValues)
            sendToken(res, accessToken)
        }
    } catch (err) {
        console.log(err)
    }
}
