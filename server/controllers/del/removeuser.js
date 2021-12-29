const { user } = require("../../models")
const { isAuthorized } = require('../tokenFunc/index')

module.exports = async (req, res) => {
  const accessToken = isAuthorized(req);
  console.log(accessToken)
  if(!accessToken){
  return res.status(401).send("로그인 정보를 확인해주세요.")
  }
  const { user_id, nickName } = accessToken; 
  user.destroy({
    where: {
      user_id: user_id,
      nickName: nickName
    }
  })
  res.clearCookie("refreshToken").status(205).send('회원탈퇴가 되었습니다.')
}