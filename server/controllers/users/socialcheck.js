const { user } = require("../../models")

module.exports = {
    get: async (req, res) => {
        console.log("여긴 users/socialcheck/")
        console.log(req.query)
        const { user_id } = req.query
        console.log(user_id)

        try {
            const userInfo = await user.findOne({
                where: {
                    user_id,
                },
            })
            if (!userInfo) {
                return res.status(215).send(false)
            } else {
                return res.status(214).send(true)
            }
        } catch (err) {
            console.log(err)
        }
    },
}
