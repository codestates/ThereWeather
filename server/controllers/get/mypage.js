const { post } = require("../../models")

module.exports = async (req, res) => { 
    //console.log("maypage.js",req.query.searchID)

    const { searchID } = req.query; 
    post.findAll({
        where: {
            user_id: searchID
        },
        limit: 6,
        order :  [['createdAt', 'DESC']]
    }) 
    .then((userPost) => {
        if(!userPost){
            res.status(422).send("post 없음")
        }
        else{
            res.status(202).send(userPost.map((el) => {
                return el.dataValues;
            }))
            // res.status(202).send("post")
        }
    })
}