const SalesCyclePhase = require("../models").salesCyclePhase
const { Router } = require("express");

const router = new Router();

router.get("/", async (req, res, next) => {
    console.log("hi")
    try {
        const salesCyclePhase = await SalesCyclePhase.findByPk(1)
        console("RESPONSE:", salesCyclePhase)
        res.send(salesCyclePhase)
    } catch(error) {    
        console.log(error)
    }
})

module.exports = router;