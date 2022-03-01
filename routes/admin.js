const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Category = require("../models/Category");

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

router.post("/category/add" , auth , async (req , res , next)=> {
  const { name , img , des} = req.body
  const category = new Category({
      name,
      img,
      des
  })

  await category.save()

  res.redirect("/admin/category")

})


router.get("/category/:id" , auth , async (req, res, next)=>{
  const category = await Category.findById(req.params.id)


  res.render("admin/categorySingle",{
    title: category.name,

  })

})

router.get("/furniture" , auth , (req , res, next ) =>{
  res.render("admin/furniture" , {
    title : "Furniture",
    
  })
})

module.exports = router;