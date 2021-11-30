const { post } = require("../../models")

module.exports = {
    post: async (req, res) => {
        console.log(req.body)
        console.log("여긴 post/write/")
            await post.create({
                user_id: req.body.user_id,
                post_photo: req.body.post_photo,
                post_title: req.body.post_title,
                post_content: req.body.post_content,
                weather: req.body.weather,
                wind: req.body.wind,
                temp: req.body.temp,
                outer_id: req.body.outer_id,
                top_id: req.body.top_id,
                bottom_id: req.body.bottom_id,
                xLocation: req.body.xLocation,
                yLocation: req.body.yLocation,
            })      
        res.status(210).send("posting ok")
    },
}
