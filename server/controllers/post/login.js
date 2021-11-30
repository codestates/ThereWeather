const { getAccessToken, getRefreshToken, sendToken } = require("../tokenFunc")
const { user } = require("../../models")
const { decrypto } = require("../get/setpw")

module.exports = async (req, res) => {
    //console.log(req.body)
    const { user_id, password } = req.body

    try{
      const userInfo = await user.findOne({
          where: {
            user_id
          }
      })
      if(!userInfo) {
      return res.status(401).send('아이디를 확인해주세요.');
      }

      const dePw = decrypto(userInfo.password);
      //console.log(dePw)
      if(dePw !== password){
      return res.status(401).send("비밀번호를 확인해주세요.")
      }
      else{
        delete userInfo.dataValues.password
            const accessToken = getAccessToken(userInfo.dataValues)
            const refreshToken = getRefreshToken(userInfo.dataValues)
            sendToken(res, accessToken, refreshToken)
            //sendToken(res, accessToken)
      }
    }catch(err){
        console.log(err)
    }
}
    

