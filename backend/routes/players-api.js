const express = require('express');
const router = express.Router();


//get all players
router.get('/', (req, res) => {
  res.json('Players API');
});

//get player/:id
router.get('/:id', (req, res) => {
  res.json('Players ID API');
});

//edit a player
router.patch('/:id', (req, res) => {
  const edit = req.body;
  res.json({ edit });
});

//add a player
router.post('/', (req, res) => {
  res.json('Player Post');
});





module.exports = router;