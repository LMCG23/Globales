const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
  });

router.get('/main/dashboard', (req, res) => {
  var flag = true;
  console.log(req.user.DatosGraficos[0].peso);
  if(req.user.Rol=="usuario"){
    console.log(req.user.Rol);
    flag = false;
  }
  console.log(req.user.Rol);
   res.render('main/dashboard',{flag});
   });
   
  

module.exports = router;