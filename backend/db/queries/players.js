const client = require('../connection');

//get all players
const getAllPlayers = function() {
  return client
    .query('SELECT * FROM players')
    .then(players => {
      return players.rows;
    })
    .catch(err => {
      console.log(err);
    });
};

//get player by ID
const getPlayerByID = function(id) {
  return client
    .query('SELECT * FROM players WHERE id = $1;', [id])
    .then(item => {
      return item.rows[0];
    })
    .catch(err => {
      console.log(err);
    });
};

//add a player to the queue
const enqueuePlayerByID = function(id, player) {
  return client
    .query('UPDATE players SET name = $1, enqueued_at = NOW(), table_id = $2 WHERE id = $3 RETURNING *',
      [player.name, player.table_id, id])
    .then(player => {
      return player.rows[0];
    })
    .catch(err => {
      console.log(err);
    });
};

//remove player from the queue
const dequeuePlayerByID = function(id, player) {
  return client
    .query('UPDATE players SET name = $1, enqueued_at = null, table_id = null WHERE id = $2 RETURNING *',
      [player.name, id])
    .then(player => {
      return player.rows[0];
    })
    .catch(err => {
      console.log(err);
    });
};

const addPlayer = function(player) {
  return client
    .query('INSERT INTO players (name, enqueued_at, is_admin, table_id) VALUES($1, null, false, null) RETURNING *',
      [player.name])
    .then(player => {
      return player.rows[0];
    })
    .catch((err) => {
      console.log(err);
    });
};



module.exports = {
  getAllPlayers,
  getPlayerByID,
  enqueuePlayerByID,
  dequeuePlayerByID,
  addPlayer
};