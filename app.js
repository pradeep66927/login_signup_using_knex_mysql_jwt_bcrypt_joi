const express = require('express');
const app = express();
const {genrateToken ,verifyToken} = require('./validation/jsonwebbtoken');
const validData = require('./validation/authentications');
const {paswordChanger , verifyHash, passwordChanger} = require('./config/bcrpt_hass');
const knex = require("./db")

const port = 5005;

app.use(express.json());


app.post("/signup",validData,passwordChanger, (req, res) => {
    knex("customers").where({ email: req.body.email }).then((result) => {
        if (result.length == 0) {
            knex("customers").insert(req.body)
                .then((result) => {
                    // console.log(req.body);
                    res.send("inserted")
                })
        } else {
            res.send("already exist")
        }
    })
})

app.post("/signin", verifyHash, (req, res) => {
    knex("customers").where({ email: req.body.email }).then((result) => {
        console.log('hello');
        const token = genrateToken(result[0])
        res.cookie('signinCookie', token)
        res.send("signup Succecfully has done or Cookie also created")
    })
})


app.get("*", (req, res) => {
    res.send("ooo what are you doing write the currect ,api ....!!!!")
    })

app.listen(port , ()=>{
    console.log('port is listening on',port)
})