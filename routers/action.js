const Action = require('../models').action
const User = require('../models').user
const Lead = require('../models').lead
const { Router } = require('express')

const router = new Router()

router.post('/', async (req, res, next) => {
	const { leadId, userId, action, due_date, note } = req.body

	try {
		if ((leadId, userId, action, due_date, note)) {
			const newAction = await Action.create({
				leadId,
				userId,
				action,
				due_date,
				note,
            })
            const newActionResponse = await Action.findByPk(newAction.id, { include: [User, Lead] })
			return res.status(200).send(newActionResponse)
		} else {
			return res.status(400).send(`Missing parameters`)
		}
	} catch (error) {
		console.log(error)
		return res.status(400).send(`something went wrong`)
	}
})

router.get('/', async (req, res, next) => {
	try {
		const actions = await Action.findAll({ include: [User, Lead] })
		res.send(actions)
	} catch (error) {
		console.log(error)
		return res.status(400).send(error.message)
	}
})

router.get('/:id', async (req, res, next) => {
	const leadId = parseInt(req.params.id)

	try {
		const actions = await Action.findAll({ where: { leadId } })
		return res.status(200).send(actions)
	} catch (error) {
		console.log(error)
		return res.status(400).send(`something went wrong`)
	}
})

router.patch('/:id/status', async (req, res, next) => {
	const id = parseInt(req.params.id)
    const status = req.body.status

	try {
		const actionToUpdate = await Action.findByPk(id)
		if (!actionToUpdate) {
			return res.status(404).send(`No action found with id ${id}`)
		} else {
			await actionToUpdate.update({ done: status })
			const updatedAction = await Action.findByPk(id, {include: [User, Lead]})
			return res.status(200).send(updatedAction)
		} 
	} catch {
		console.log(error)
		return res.status(400).send(`something went wrong`)
	}
})

router.patch('/:id', async (req, res, next) => {
	const { id, action, due_date, note, userId, leadId } = req.body

	try {
		const actionToUpdate = await Action.findByPk(id)
		if (!actionToUpdate) {
			return res.status(404).send(`No action found with id ${id}`)
		} else {
			await actionToUpdate.update({ action, due_date, note, userId, leadId })
			const updatedAction = await Action.findByPk(id)
			return res.status(200).send(updatedAction)
		}
	} catch {
		console.log(error)
		return res.status(400).send(`something went wrong`)
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		const id = parseInt(req.params.id)
		const actionToDelete = await Action.findByPk(id)
		if (!actionToDelete) {
			return res.status(404).send(`No report found with id ${id}`)
		} else {
			const deleted = await actionToDelete.destroy()
			res.json(deleted)
		}
	} catch {
		console.log(error)
		return res.status(400).send(`something went wrong`)
	}
})

module.exports = router
