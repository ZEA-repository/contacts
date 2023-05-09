import { Box, Button, Modal } from '@mantine/core'
import { ContactsTable } from '@/components/ContactsTable'
import { ContactForm } from '@/components/ContactForm'
import Centered from '@/layouts/Centered'
import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import { IconUserPlus } from '@tabler/icons-react'
import {
  deleteContactRequest,
  createContactRequest,
  updateContactRequest,
} from '@/api/phoneBook'
import type { User, Contact, ContactFormType } from '@/types'

export function ContactsPage() {
  const loadedUser = useLoaderData() as User

  const [contacts, setContacts] = useState<Contact[]>(loadedUser.contacts)
  const [contact, setContact] = useState<Contact>()
  const [mode, setMode] = useState<'create' | 'update'>()

  const onSetContact = (contact: Contact) => {
    setContact(contact)
    setMode('update')
  }
  const onCreate = async (contact: ContactFormType) => {
    const data = await createContactRequest({
      ...contact,
      userId: loadedUser._id,
    })
    if (data.status === 200) setContacts([{ ...data.user }, ...contacts])
    close()
  }
  const onUpdate = async (contact: ContactFormType) => {
    await updateContactRequest({
      ...contact,
      userId: loadedUser._id,
    })

    setContacts(
      //@ts-ignore
      contacts.map((item) => (item._id === contact._id ? contact : item))
    )
    close()
  }
  const onDelete = async (contactId: string) => {
    const data = await deleteContactRequest({
      contactId,
      userId: loadedUser._id,
    })

    if (data.status === 200)
      setContacts(contacts.filter((u) => u._id != contactId))
  }
  const close = () => {
    setContact(undefined)
    setMode(undefined)
  }
  return (
    <Centered>
      <Box mt='md'>
        <ContactsTable
          contacts={contacts}
          activeContactId={contact?._id}
          setContact={onSetContact}
          deleteContact={onDelete}
        />
        <Button
          mt='md'
          leftIcon={<IconUserPlus size='1rem' />}
          onClick={() => setMode('create')}
        >
          Add Contact
        </Button>
      </Box>
      <Modal
        opened={mode !== undefined}
        onClose={close}
        title={mode == 'create' ? 'Add contact' : 'Edit contact'}
      >
        <ContactForm
          contact={contact}
          onSubmit={mode == 'create' ? onCreate : onUpdate}
        />
      </Modal>
    </Centered>
  )
}
