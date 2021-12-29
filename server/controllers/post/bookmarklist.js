const { bookmark, post, user } = require("../../models")

module.exports = async(req, res) => {
  //res.send()
  // console.log("server/bookmarklist.js::::", req.body) 
  const { user_id } = req.body; 

  if(!user_id){
    res.status(404).send("정보가 없습니다.")
  }
  else{
    const list = await bookmark.findAll({
      include: [{
              model: post, required: true
          }]
    })

    if(!list){
      res.status(404).send("북마크가 없습니다.")
    }
    else{
      let lists = list.map((el) => {
          //return el.dataValues;
          return el.dataValues.post.dataValues;
      })
  
      res.status(202).send(lists)
    }
  }
   
}