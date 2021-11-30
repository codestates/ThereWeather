const { post, user } = require("../../models")
const getAddress = require("./geocoder/getAddress")
// 위도, 경도로 주소 찾는 모듈

/*
    [수정]
    - 위도, 경도로 주소 찾아서 응답 데이터에 추가
    - .env에 GEOCODER_AUTH_KEY 추가해야함
*/

module.exports = async function(req, res)  {
    console.log('**readpost 쿼리 확인**', req.query.id);

    post.findOne({ where: { id: req.query.id } })
    .then(raw => raw.dataValues)
    .then(postData => {
        const userId = postData.user_id;
            // 포스트 데이터에서 작성자 아이디 뽑아내기
        user.findOne({ where: { user_id : userId } })
            // 작성자 아이디로 회원 정보 찾기
        .then(async userinfo => {
            const { nickName, user_Photo } = userinfo.dataValues;
            // 위도 경도 이용해서 주소 찾기
            const { xLocation, yLocation } = postData;
            const {level1, level2, level4L} = await getAddress(xLocation, yLocation);
            let address = `${level1} ${level2} ${level4L}`;
            if (!level1 || !level2 || !level4L) {
                address = "주소를 찾을 수 없습니다"
            }

            return {
                nickName: nickName,
                user_Photo: user_Photo,
                address: address
            };
        })
        .then(selectedInfo => {
            res.send({...postData, ...selectedInfo});
        })
        .catch(err => {
            // 에러 핸들링
            console.log(err);
            res.status(400).send("bad request");
        })
    })
    .catch(err => {
        // 에러 핸들링
        console.log(err);
        res.status(400).send("bad request");
    })
}