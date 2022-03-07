const express = require('express');
const router = express.Router();
const Category = require("../models/Category");
const Furniture = require("../models/Furniture");

/* GET home page. */
router.get('/',  async (req, res, next)=> {
  const category = await Category.find()
  const furniture = await Furniture.find()
  res.render('index', { 
    title: 'index page',
    category,
    furniture

 });
});

module.exports = router;
