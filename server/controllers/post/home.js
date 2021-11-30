const { post } = require("../../models")
const sequelize = require("sequelize")
const Op = sequelize.Op;
const getAddress = require("../get/geocoder/getAddress")    // 위도, 경도로 주소 찾는 모듈

module.exports = async (req, res) => {
    // console.log('home.js - req : ', req.body)
    const { lat, lon } = req.body
    const { right, left, top, bottom } = req.body

    // bottom,top,left,right를 받아옴
    post.findAll({ 
        where : {
            // Op.between left-right, bottom-top 사이의 위치들에 해당하는 post 조회
            xLocation: { [Op.between]: [left, right] },
            yLocation: { [Op.between]: [bottom, top] }
        },
        limit : 9 , 
        order :  [['createdAt', 'DESC']]
    })
    .then(async curtPost => {
        // console.log('currentPost 들어온 데이터 : ', currentPost);

        // 위도, 경도 주소변환
        // console.log('lat : ',lat , 'long : ', lon);
        const {level1, level2, level4L} = await getAddress(lat, lon)
        let address = `${level1} ${level2} ${level4L}`
        if(!level1 || !level2 || !level4L) {
            address = "주소를 찾을 수 없습니다."
        }
        console.log('address : ', address);
        
        if(!curtPost){
            res.status(422).send("post 없음")
        }else{
            res.status(202).send(
                {
                    curtPost: curtPost,
                    address:address
                }
                // currentPost.map((el) => {return el.dataValues},
                // {data: address},    // 주소변환부분 (다시 확인)
            )
        }
    })
}