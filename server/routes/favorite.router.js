const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();
console.log(`your API key is:${process.env.GIPHY_API_KEY}`)
router.get('/random', (req, res) => {
  const GIPHY_URL = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}`

  axios.get(GIPHY_URL).then(response => {
      res.status(200).send(response.data);
  }).catch(err => {
      console.log('Error getting gif', err.response)
      res.send(500);
  })
})

router.post('/tag', (req, res) => {
  const GIPHY_URL = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=${req.body.payload}`

  axios.get(GIPHY_URL).then(response => {
      res.status(200).send(response.data);
  }).catch(err => {
      console.log('Error getting gif', err.response)
      res.send(500);
  })
})



// return all favorite images
router.get('/', (req, res) => {
  console.log('retrieving all favorites');
  const queryText = `SELECT f.id, url, category_id, name FROM "favorites" as f
                    JOIN "category" as c on f."category_id" = c."id";`;

  pool.query(queryText).then(response => {
    console.log('Retrieved all favorites successfully');
    res.status(200).send(response.rows);
  }).catch(err => {
    console.log('Error in get', err);
    res.sendStatus(500);
  });
});

// add a new favorite
router.post('/', (req, res) => {
  res.sendStatus(200);
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  console.log('Deleting favorite at id:', id);
  const queryText = `DELETE FROM "favorites" WHERE "id" = $1;`;

  pool.query(queryText, [id]).then(() => {
    console.log(`Deleted at id: ${id} successfully`);
    res.sendStatus(204);
  }).catch(err => {
    console.log('Error in delete', err);
    res.sendStatus(500);
  });
});

module.exports = router;
