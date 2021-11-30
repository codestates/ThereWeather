const express = require("express")
const router = express.Router()
const { chatsController } = require("../controllers")

router.post("/rooms", chatsController.rooms.post)
router.get("/rooms", chatsController.rooms.get)
router.post("/messagelist", chatsController.messagelist.post)
router.put("/messagelist", chatsController.messagelist.put)

module.exports = router
