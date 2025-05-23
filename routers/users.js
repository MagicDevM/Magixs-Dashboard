const express = require('express');
const router = express.Router()

router.get("/", (req, res) => {
  res.render('login')
});

router.get("/create", (req, res) => {
  res.render('register')
});

router.get("/login", (req, res) => {
  res.render('login')
});

router.get("/login/forgot-password", (req, res) => {
  res.render('forgotpass')
});

module.exports = router;