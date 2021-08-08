const Report = require("../models").report
const User = require("../models").user
const Lead = require("../models").lead
const { Router } = require("express");

const router = new Router();

router.get("/", async (req, res, next) => {
    try {
        const reports = await Report.findAll({include: [Lead, User]})
        return res.
            status(200).send(reports)    
    } catch(error) {
        console.log(error)
        return res.status(400).send(`something went wrong`)
    }
})

router.post("/", async (req, res, next) => {
    const { userId, leadId, note } = req.body
    try {
        const newReport = await Report.create({userId, leadId, note})
        return res.status(200).send(newReport)
    } catch(error) {
        console.log(error)
        return res.status(400).send(`something went wrong`)
    }
})

router.patch("/:id", async (req, res, next) => {
    const { id, note, userId, leadId } = req.body

    try {
        const reportToUpdate = await Report.findByPk(id)
        if(!reportToUpdate) {
            return res.
                status(404).send(`No report found with id ${id}`)
        } else {
            await reportToUpdate.update({note, userId, leadId})
            const updatedReport = await Report.findByPk(id)
            return res.
                status(200).
                send(updatedReport)
        }
    } catch {
        console.log(error)
        return res.status(400).send(`something went wrong`)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const reportToDelete = await Report.findByPk(id)
        if(!reportToDelete){
            return res.
                status(404).send(`No report found with id ${id}`)
        } else {
            const deleted = await reportToDelete.destroy();
            res.json(deleted);
        }
    } catch {
        console.log(error)
        return res.status(400).send(`something went wrong`)
    }
})

module.exports = router;