const { post } = require("../../models")
const { user } = require("../../models")
const { room } = require("../../models")
const { Op } = require("sequelize")

module.exports = {
    post: async (req, res) => {
        //show
        console.log(req.body)
        console.log("여긴 /chat/messagelist post")

        let chatcontentList = await room.findAll({
            where: {
                // user_id: req.body.user_id,
                // receiver_id: req.body.receiver_id,
                roomName: req.body.roomName,
                // chatcontent: req.body.chatcontent,
            },
        })
        // console.log(updateContents)

        res.send(chatcontentList)
    },
    put: async (req, res) => {
        //post
        console.log("여긴 /chat/messagelist 의 put")
        console.log("req.body= " + req.body)

        await room.create({
            user_id: req.body.user_id,
            receiver_id: req.body.receiver_id,
            roomName: req.body.roomName,
            chatcontent: req.body.chatcontent,
        })
        // console.log(updateContents)

        res.send("정상완료")
    },
}
