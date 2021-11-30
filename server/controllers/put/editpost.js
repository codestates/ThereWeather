const { post, user } = require("../../models")

module.exports = async (req, res) => {
    //res.send()
    const { user_id, post_id, post_photo, post_title, post_content, weather, wind, temp, outer_id, top_id, bottom_id } = req.body;
    let posts = Number(post_id) 
    const checkUser = await post.findOne({
        where: {
            user_id: user_id,
            id: posts
        }
    })
    //현재 접속한 유저가 포스트에서 찾은 유저 정보가 아니면 
    if(!checkUser){
      res.send("게시물의 작성자가 아닙니다.")
    }
    //현재 접속한 유저가 포스트에서 찾은 유저 정보가 맞으면 
    else{
        if(!post_photo || !post_content || !post_content || !weather || !wind || !temp || !outer_id || !top_id || !bottom_id){
            res.send("모든 내용을 필수로 수정해주세요:)")
        }
        else{
            await post.update({
                post_photo: post_photo,
                post_title: post_title,
                post_content: post_content,
                weather: weather,
                wind: wind,
                temp: temp
            }, {
                where: {
                    // user_id: user_id,
                    id: post_id
                }
            })
            res.send("변경완료")
        }
    }
}