const express = require('express');
const router = express.Router();
const Admin = require("../models/Admin")
const bcrypt = require("bcryptjs")
const auth = require('../middleware/auth')

router.get("/login", function (req, res, next) {
    res.render("auth/login", {
        title: "login page",
    })

})

router.get("/register", function (req, res, next) {
    res.render("auth/register", {
        title: "register page"
    })

})

router.get("/logout", function (req, res, next) {
    req.session.destroy((err) => {
        res.redirect("/auth/login")
        next()

    })
})

router.post("/login", async (req, res, next) => {


    try {

        const { email, password } = req.body

        const candidate = await Admin.findOne({ email })


        if (candidate) {

            const areSame = await bcrypt.compare(password, candidate.password)
            console.log(areSame);
            if (areSame) {
                req.session.isAuthen = true;
                req.session.save((err) => {
                    if (err) {
                        console.log(err);
                        throw new Error
                    }
                    res.redirect("/admin")
                })


            } else {
                res.redirect("/auth/login")
            }

        }
        else {
            res.redirect("/auth/login")
        }
    } catch (error) {
        console.log(error);
    }



})

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, img } = req.body

        const candidate = await Admin.findOne({ email })

        console.log("Email", candidate)

        if (candidate) {
            res.redirect('/auth/register')
        } else {
            const hashPassword = await bcrypt.hash(password, 12)

            const admin = new Admin({
                name,
                email,
                password: hashPassword,
                img
            })

            await admin.save()


            res.redirect('/auth/login')
        }


    } catch (error) {
        console.log(error)
    }
})

module.exports = router