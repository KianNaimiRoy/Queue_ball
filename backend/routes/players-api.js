const express = require('express');
const router = express.Router();
const playerQueries = require('../db/queries/players');


//get all players
router.get('/', (req, res) => {
  console.log("PLAYERS::")
  playerQueries.getAllPlayers()
    .then(players => {
      res.json({ players });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//get player/:id
router.get('/:id', (req, res) => {
  const playerID = req.params.id;
  playerQueries.getPlayerByID(playerID)
    .then(player => {
      res.json({ player });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//when a player joins the queue
router.patch('/enqueued/:id', (req, res) => {
  const playerID = req.params.id;
  const player = req.body;

  playerQueries.enqueuePlayerByID(playerID, player)
    .then(player => {
      console.log('Edited player', player);
      res.send(player);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//when player leaves a queue
router.patch('/dequeued/:id', (req, res) => {
  const playerID = req.params.id;
  const player = req.body;

  playerQueries.dequeuePlayerByID(playerID, player)
    .then(player => {
      console.log('Dequeued player', player);
      res.send(player);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//add a player
router.post('/', (req, res) => {
  const newPlayer = req.body;

  playerQueries.addPlayer(newPlayer)
    .then(player => {
      console.log('New player added', player);
      res.send(player);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});





module.exports = router;