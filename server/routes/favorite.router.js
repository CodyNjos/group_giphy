const express = require('express');
const pool = require('../modules/pool');
const { default: axios } = require('axios');

const router = express.Router();
console.log(`your API key is:${process.env.GIPHY_API_KEY}`)

router.get('/search/:search', (req, res) => {
  const GIPHY_URL = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${req.params.search}&limit=10`

  axios.get(GIPHY_URL).then(response => {
      res.status(200).send(response.data);
  }).catch(err => {
      console.log('Error getting gif', err.response)
      res.send(500);
  });
});

// return all favorite images
router.get('/', (req, res) => {
  console.log('retrieving all favorites');
  const queryText = `SELECT f.id, url, category_id, name FROM "favorites" as f
                    FULL OUTER JOIN "category" as c on f."category_id" = c."id"
                    WHERE f.id IS NOT NULL ORDER BY f.id ASC;`;

  pool.query(queryText).then(response => {
    console.log('Retrieved all favorites successfully');
    res.status(200).send(response.rows);
  }).catch(err => {
    console.log('Error in get', err);
    res.sendStatus(500);
  });
});

// add a new favorite
router.post('/addfavorite', (req, res) => {
  console.log('Adding gif to favorites');
  const gifUrl = req.body.payload;
  
  if (!gifUrl) {
    console.log('Please post valid responses');
    res.sendStatus(400);
    return;
  };

  const queryText = `INSERT INTO "favorites" ("url") VALUES ($1);`;

  pool.query(queryText, [gifUrl]).then(() => {
    console.log('Favorite added successfully');
    res.sendStatus(201);
  }).catch(err => {
    console.log('Error in post', err);
    res.sendStatus(500);
  });
});

// update given favorite with a category id
router.put('/category/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
<<<<<<< HEAD
  console.log(req.body)
  res.sendStatus(200);
=======
  const gifId = req.params.favId;
  const catId = req.body.payload;
  console.log(`Updating the category at favId: ${gifId} to category Id: ${catId}`);
  console.log(catId, gifId)
  const queryText = `UPDATE "favorites" SET "category_id" = $1
                    WHERE "id" = $2;`;

  pool.query(queryText, [catId, gifId]).then(() => {
    console.log(`Updated the category at favId: ${gifId} to category Id: ${catId} successfully`);
    res.sendStatus(200);
  }).catch(err => {
    console.log('Error in update', err);
    res.sendStatus(500);
  });
>>>>>>> 1f96448f0996593ba26901a80d4d56321c3743cd
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
