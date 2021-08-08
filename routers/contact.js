const Contact = require('../models').contact
const Lead = require('../models').lead
const { Router } = require('express')
const router = new Router()

router.get('/', async (req, res, next) => {
	try {
		const contacts = await Contact.findAll({ include: Lead })
		res.send(contacts)
	} catch (error) {
		console.log(error)
		return res.status(400).send(`something went wrong`)
	}
})

router.post('/', async (req, res, next) => {
	const { contact_name, contact_email, contact_phone, job_title } = req.body

	if ((!contact_name, !contact_email, !contact_phone)) {
		return res.status(400).send(`Please provide a name, email and phone number`)
	}
	try {
		const newContact = await Contact.create({
			job_title: job_title,
			name: contact_name,
			email: contact_email,
			phone: contact_phone,
        })
        const sendNewContact = await Contact.findByPk(newContact.id, {include: Lead})
		res.status(200).send(sendNewContact)
	} catch (error) {
		console.log(error)
		return res.status(400).send(`something went wrong`)
	}
})

router.patch('/:id', async (req, res, next) => {
	const id = parseInt(req.params.id)
	const { contact_name, job_title, contact_phone, contact_email } = req.body

	if (!contact_name || !contact_email || !contact_phone || !job_title) {
		return res
			.status(400)
			.send(`Please provide a name, email, phone number and job title`)
	}
	try {
		const contactToUpdate = await Contact.findByPk(id)

		if (!contactToUpdate) {
			return res.status(404).send(`No lead found with id ${id}`)
		} else {
			await contactToUpdate.update({
				name: contact_name,
				job_title: job_title,
				phone: contact_phone,
				email: contact_email,
			})
			const updatedContact = await Contact.findByPk(id, { include: Lead })
			return res.status(200).send(updatedContact)
		}
	} catch (error) {
		console.log(error)
		return res.status(400).send(`something went wrong`)
	}
})

router.delete("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const contactToDelete = await Contact.findByPk(id)
        if(!contactToDelete){
            return res.
                status(404).send(`No Contact found with id ${id}`)
        } else {
            const deleted = await contactToDelete.destroy({include: Lead});
            return res.
            status(200).
            send(deleted)
        }
    } catch(error) {
        console.log(error)
        return res.status(400).send(`something went wrong`)
    }
})

module.exports = router
