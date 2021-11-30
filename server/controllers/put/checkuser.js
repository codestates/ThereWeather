const { post } = require("../../models")


module.exports = async(req, res) => {
    //res.send()
    // console.log(req.body)
    const { user_id, post_id } = req.body; 
    const checkUser = await post.findOne({
        where: {
            user_id: user_id,
            id: post_id
        }
    })
    //현재 접속한 유저가 포스트에서 찾은 유저 정보가 아니면 
    if(!checkUser){
      res.send("게시물의 작성자가 아닙니다.")
    }
}