const Lead = require("../models").lead;
const Report = require("../models").report;
const Action = require("../models").action;
const Contact = require("../models").contact;
const User = require("../models").user
const SalesCyclePhase = require("../models").salesCyclePhase
const geolocationsMiddleware = require("../geolocation/geolocationMiddleware")
const { Router } = require("express");

const router = new Router();

router.get("/", async (req, res, next) => {
    try {
        const leads = await Lead.findAll({include: [Report, 
            Action, Contact, User, SalesCyclePhase]})
        res.send(leads)
    } catch(error) {
        console.log(error)
        return res.
        status(400).
        send(error.message)
    }
})

router.post("/", geolocationsMiddleware, async (req, res, next) => {
    const {company_name, associated_company_name, 
        contact_person, company_phone, 
        company_address, 
        supplier, contactId, userId,
        lat, lng} = req.body
    const salesCyclePhaseId = 1

    if (!company_name || !company_phone || !company_address) {
        return res.
            status(402).
            send(`Please provide a company name, an address and a phone number`);
    }
    try {
        const newLead = await Lead.create({
            company_name, associated_company_name, 
            contact_person, company_phone, 
            company_address, supplier,
            userId, contactId, salesCyclePhaseId, lat, lng})

        const addedLead = await Lead.findByPk( newLead.id ,{include: [Report, 
            Action, Contact, User, SalesCyclePhase]})
        return res.
            status(200).
            send(addedLead)
    } catch (error) {
        console.log(error)
        return res.
        status(400).
        send(error.message)
    }
})

router.patch("/:id/phase", async (req, res, next) => {
    const id = parseInt(req.params.id)
    const newSalesCyclePhaseId = req.body.newPhaseId
    try {
        const leadToUpdate = await Lead.findByPk(id)
    if (!leadToUpdate) {
        return res.
        status(404).send(`No lead found with id ${id}`)
    } else {
        await leadToUpdate.update({salesCyclePhaseId: newSalesCyclePhaseId})
        const updatedLead = await Lead.findByPk(id, {include: [Report, 
            Action, Contact, User, SalesCyclePhase]})
        return res.
        status(200).
        send(updatedLead)
    }
    } catch(error) {
        console.log(error)
        return res.
        status(400).
        send(error.message)
    }
})

router.patch("/:id/contact", async (req, res, next) => {
    const contactId = req.body.contactId
    const id = parseInt(req.params.id)

    try {
        const leadToUpdate = await Lead.findByPk(id)
    if (!leadToUpdate) {
        return res.
        status(404).send(`No lead found with id ${id}`)
    } else {
        await leadToUpdate.update({contactId: contactId})
        const updatedLead = await Lead.findByPk(id, {include: [Report, 
            Action, Contact, User, SalesCyclePhase]})
        return res.
            status(200).
            send(updatedLead)
    }

    } catch(error) {
        console.log(error)
        return res.
            status(400).
            send(error.message)
    }
})

router.patch("/:id", geolocationsMiddleware, async (req, res, next) => {
    const id = parseInt(req.params.id)
    const upToDateLead = req.body

    try {       
        const leadToUpdate = await Lead.findByPk(id)
    if (!leadToUpdate) {
        return res.
        status(404).send(`No lead found with id ${id}`)
    } if (upToDateLead.company_name !== leadToUpdate.company_name && upToDateLead.company_name !== "") {
        await leadToUpdate.update({company_name: upToDateLead.company_name})
    } if (upToDateLead.associated_company_name !== leadToUpdate.associated_company_name && upToDateLead.associated_company_name !== "") {
        await leadToUpdate.update({associated_company_name: upToDateLead.associated_company_name})
    } if (upToDateLead.company_phone !== leadToUpdate.company_phone && upToDateLead.company_phone !== "") {
        await leadToUpdate.update({company_phone: upToDateLead.company_phone})
    } if (upToDateLead.contact_person !== leadToUpdate.contact_person && upToDateLead.contact_person !== "") {
        await leadToUpdate.update({contact_person: upToDateLead.contact_person})
    } if (upToDateLead.supplier !== leadToUpdate.supplier && upToDateLead.supplier !== "") {
        await leadToUpdate.update({supplier: upToDateLead.supplier})
    } if (upToDateLead.company_address !== leadToUpdate.company_address && upToDateLead.company_address !== "") {
        await leadToUpdate.update({company_address: upToDateLead.company_address})
    } if (req.body.lat !== leadToUpdate.lat) {
        await leadToUpdate.update({lat: req.body.lat})
    } if (req.body.lng !== leadToUpdate.lng) {
        await leadToUpdate.update({lng: req.body.lng})
    } else {
        return res.
            status(400).
            send({message: "Nothing to update"})
    }
        const updatedLead = await Lead.findByPk(id, {include: [Report, 
            Action, Contact, User, SalesCyclePhase]})
        return res.
            status(200).
            send(updatedLead)
       
    } catch(error) {
        console.log(error)
        return res.
            status(400).
            send(error.message)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const leadToDelete = await Lead.findByPk(id)
        if(!leadToDelete){
            return res.
                status(404).send(`No lead found with id ${id}`)
        } else {
            const deleted = await leadToDelete.destroy({include: [Report, Action]});
            return res.
            status(200).
            send(deleted)
        }
    } catch(error) {
        console.log(error)
        return res.status(400).send(`something went wrong`)
    }
})

router.delete("/:id/contacts", async (req, res, next) => {
    const id = parseInt(req.params.id)
    
    try {
        const leadToUpdate = await Lead.findByPk(id) 
        
        if(!leadToUpdate){
            return res.
                status(404).send(`No lead found with id ${id}`)
        } else {
            const updatedLead = await leadToUpdate.update({contactId: null})
            return res.
                status(200).send(updatedLead)
        }
    } catch(error) {
        console.log(error)
        return res.status(400).send(`something went wrong`)
    }
})
module.exports = router;
