const express = require("express");
const router = express.Router();

router.get("/test", async (req, res) => {
    console.log({ req })
    res.send(req.query)
});


module.exports = router;
