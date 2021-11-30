const { post } = require("../../models")
const { user } = require("../../models")
const { room } = require("../../models")
const { Op } = require("sequelize")

module.exports = {
    post: async (req, res) => {
        console.log(req.body)
        console.log("여긴 /chat/rooms")
        // 1.방을 만들때 -hoon
        if (!req.body.chatcontent) {
            //빈글작성
            await room.create({
                user_id: req.body.user_id,
                receiver_id: req.body.receiver_id,
                roomName: req.body.roomName,
            })
            //모든 챗팅내역 조회
            const findRoomLists = await room.findAll({
                where: {
                    user_id: req.body.user_id,
                },
            })
            //필요데이터 지우기
            const roomlist = findRoomLists.map((el) => {
                delete el.dataValues.id
                delete el.dataValues.user_id
                delete el.dataValues.receiver_id
                delete el.dataValues.chatcontent
                delete el.dataValues.createdAt
                delete el.dataValues.updatedAt
                return el.dataValues.roomName
            })
            // console.log(roomlist)
            res.send(roomlist)
        }
        //채팅을 생성할때
        else {
        }
    },
    get: async (req, res) => {
        console.log(req.query)
        console.log("여긴 /chat/rooms 의 get")
        // 1.방을 조회만할때 -hoon
        if (!req.body.chatcontent) {
            const findRoomLists = await room.findAll({
                where: {
                    user_id: req.query.user_id,
                },
            })
            if (!findRoomLists) {
                res.send("일치하는 방이름 없음")
            } else {
                const roomlist = findRoomLists.map((el) => {
                    delete el.dataValues.id
                    delete el.dataValues.user_id
                    delete el.dataValues.receiver_id
                    delete el.dataValues.chatcontent
                    delete el.dataValues.createdAt
                    delete el.dataValues.updatedAt
                    return el.dataValues.roomName
                })
                // console.log(roomlistsmap)
                res.send(roomlist)
            }
        }
        //2.채팅을 조회할때
        else {
        }
    },
}
