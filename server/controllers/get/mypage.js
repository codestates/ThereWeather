const { post } = require("../../models")

module.exports = async (req, res) => {
    // const a = await post.findAll({ limit : 3 })
    // console.log(a);
    console.log(req.query)
    res.send(await post.findAll({ limit : 6 , order :  [['createdAt', 'DESC']]}))
}