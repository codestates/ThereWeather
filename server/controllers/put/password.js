const { user } = require("../../models")
const { encrypto } = require("../get/setpw")
const { isAuthorized } = require('../tokenFunc/index');

module.exports = async (req, res) => {
//클라이언트 헤더로 받은 토큰중에 유저 정보확인하고 
//새로운 비밀번호 입력받고 암호화 
//console.log(isAuthorized(req))
const accessToken = isAuthorized(req);
//console.log(accessToken)
if(!accessToken){
  return res.status(401).send("로그인 정보를 확인해주세요.")
}
const { user_id, nickName } = accessToken; 
const { password } = req.body;
const enPw = encrypto(password);

user.update({
  password: enPw
  },
  { where: { 
      user_id: user_id, nickName: nickName 
    } 
  })
  res.status(200).send()
}