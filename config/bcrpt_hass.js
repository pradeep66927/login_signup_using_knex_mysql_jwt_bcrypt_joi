const bcrypt = require('bcrypt')
const knex = require("../db")

const passwordChanger = async (req,res,next)=>{
    let hasrs = await bcrypt.hash(req.body.password,10)
    req.body.password=hasrs
    next()
}

const verifyHash = (req,res,next)=>{
    knex("customers").where({email:req.body.email}).then((result) => {
        if(!bcrypt.compareSync(req.body.password,result[0].password)){
            res.send("Incorrect Password enter password again")
        }else{
            next()
        }
    }).catch((err) => {
        
    });
}

module.exports = {passwordChanger,verifyHash};