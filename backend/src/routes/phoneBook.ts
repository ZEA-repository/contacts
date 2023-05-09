import { NextFunction, Request, Response, Router } from 'express'
import UserModel from '../models/userModel'
import type { Contact } from '../models/userModel'
import { SuccessResponse } from '../exceptions/ApiResponse'
import { BadRequestError } from '../exceptions/apiError'

const router = Router()

router.get('/contacts', async (req, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body
    const contacts = await UserModel.findOne({ _id: id })
    return res.json(contacts)
  } catch (e) {
    next(e)
  }
})

router.post('/contact/create', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, firstname, email, phone, avatar } = req.body
    const user = await UserModel.findOne({ _id: userId }, ['contacts'])
    if (!user) throw new BadRequestError('User does not exists or wrong userId')

    const contact: Contact = {
      firstname,
      email,
      phone,
      avatar,
    }

    user.contacts.unshift(contact)
    await user.save()

    const newContactWithId = user.contacts[0]

    return new SuccessResponse('Contact created successfully', newContactWithId).send(res)
  } catch (e) {
    next(e)
  }
})

router.put('/contact/update', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, contactId, firstname, email, phone, avatar } = req.body
    console.log('🚀 ~ file: phoneBook.ts:46 ~ router.put ~ userId:', userId)
    console.log('🚀 ~ file: phoneBook.ts:46 ~ router.put ~ contactId:', contactId)
    await UserModel.updateOne(
      { _id: userId, 'contacts._id': contactId },
      {
        $set: {
          'contacts.$.firstname': firstname,
          'contacts.$.email': email,
          'contacts.$.phone': phone,
          'contacts.$.avatar.$.url': avatar,
        },
      },
    )

    return new SuccessResponse('Contact updated successfully', null).send(res)
  } catch (e) {
    next(e)
  }
})

router.delete('/contact/delete', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, contactId } = req.body
    await UserModel.updateOne({ _id: userId }, { $pull: { contacts: { _id: contactId } } })

    return res.send('Contact deteled successfully')
  } catch (e) {
    next(e)
  }
})

export default router
