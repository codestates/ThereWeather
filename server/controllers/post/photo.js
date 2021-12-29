const { users } = require("../../models")

module.exports = {
    post: (req, res) => {
        console.log("여긴 post/photo/")
        res.send({
            fileName: req.file.filename,
        })
    },
}
