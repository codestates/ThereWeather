module.exports = async (req, res) => {
  //console.log(req.headers)
  
  delete req.headers.authorization
  res.clearCookie('refreshToken').status(205).send("로그아웃 성공");
}