const express = require("express")
const router = express.Router()
const { postsController } = require("../controllers")

router.post("/write", postsController.write.post)
router.post("/photo", postsController.photo.post)
router.get("/location", postsController.location.get)
router.get("/list", postsController.list.get)

module.exports = router
