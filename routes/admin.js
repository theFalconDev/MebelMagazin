const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const mongoose = require("mongoose")
const Category = require("../models/Category");
const Furniture = require("../models/Furniture");

/* GET users listing. */
router.get("/", auth, function (req, res, next) {
  res.render("admin/index", {
    title: "admin page",
  });
});

router.get("/category", async function (req, res, next) {
  const category = await Category.find()
  // console.log(category)
  res.render("admin/category", {
    title: "kategoriya sahifasi",
    category
  });
});

router.post("/category/add", auth, async (req, res, next) => {
  const { name, img, des } = req.body
  const category = new Category({
    name,
    img,
    des
  })

  await category.save()

  res.redirect("/admin/category")

})


router.get("/category/:id", auth, async (req, res, next) => {


  const category = await Category.findById(req.params.id)
  const furniture = await Furniture.aggregate([
    {$match:{
        categoryId : mongoose.Types.ObjectId(req.params.id)
    }}
  ])



  res.render("admin/categorySingle", {
    title: category.name,
    furniture
  })

})

router.get("/furniture", auth, async (req, res, next) => {
  const category = await Category.find()
  const furniture = await Furniture.find()

  res.render("admin/furniture", {
    title: "Furniture",
    category,
    furniture
  })
})


router.post("/furniture/add", auth, async (req, res, next) => {
  const { name,
    img,
    cost,
    isSale,
    des,
    categoryId } = req.body
  const furniture = new Furniture({
    name,
    img,
    cost,
    isSale,
    des,
    categoryId
  })
  console.log(furniture);

  await furniture.save()
  res.redirect("/admin/furniture")
})



module.exports = router;
