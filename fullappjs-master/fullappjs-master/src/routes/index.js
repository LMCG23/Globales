const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
  });

router.get('/main/dashboard', (req, res) => {
   res.render('main/dashboard');
   });
     

module.exports = router;