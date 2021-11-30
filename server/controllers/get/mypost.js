const { post } = require("../../models")


module.exports = async(req, res) => {
  //res.send()
  //console.log(req.query)//{ searchID: 'kimcoding1' }
  const { searchID } = req.query;
  post.findAll({
    where: {
        user_id: searchID
    },
    limit: 8,
    order :  [['createdAt', 'ASC']]
}) 
.then((userPost) => {
    if(!userPost){
        res.status(422).send("post 없음")
    }
    else{
        res.status(202).send(userPost.map((el) => {
            return el.dataValues;
        }))
        res.status(202).send("post")
    }
}) 
}