const express = require('express')
const router = express.Router();


//get all players
router.get('/', (req, res) => {
  res.json('Players API')
})



module.exports = router