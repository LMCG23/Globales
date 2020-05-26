const express = require('express');
const router = express.Router();

router.get('/login/register', (req, res) => {
  res.render('login/register');
});

router.get('/login/forgot_password', (req, res) => {
    res.render('login/forgot_password');
  });  

router.get('/partials/login', (req, res) => {
   res.render('partials/login');
 }); 
module.exports = router;