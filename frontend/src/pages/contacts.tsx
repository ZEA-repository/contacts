import { Title, Box, Button, Modal } from '@mantine/core'
import { UsersTable } from '@/components/UsersTable'
import { UserForm } from '@/components/UserForm'
import Centered from '@/layouts/Centered'
import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import { IconUserPlus } from '@tabler/icons-react'
import { deleteUserRequest, createUserRequest, updateUserRequest } from '@/api'
import type { User } from '@/types'

export function ContactsPage() {
  const initialUsers = useLoaderData() as User[]
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [user, setUser] = useState<User>()
  const [mode, setMode] = useState<'create' | 'update'>()

  const onSetUser = (user: User) => {
    setUser(user)
    setMode('update')
  }
  const onCreate = (user: User) => {
    createUserRequest(user).then((response) =>
      response.json().then((newUser) => {
        setUsers([...users, { ...user, _id: newUser._id }])
        close()
      })
    )
  }
  const onUpdate = (user: User) => {
    updateUserRequest(user).then((response) =>
      response.json().then(({ _doc }) => {
        setUsers(users.map((user) => (user._id === _doc._id ? _doc : user)))
        close()
      })
    )
  }
  const onDelete = (user: User) => {
    deleteUserRequest(user._id)
    setUsers(users.filter((u) => u._id != user._id))
  }
  const close = () => {
    setUser(undefined)
    setMode(undefined)
  }
  return (
    <Centered>
      <Box mt='md'>
        <Title mb='md' order={2}>
          Contacts
        </Title>
        <UsersTable
          users={users}
          activeUserId={user?._id}
          setUser={onSetUser}
          deleteUser={onDelete}
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
        <UserForm
          user={user}
          onSubmit={mode == 'create' ? onCreate : onUpdate}
        />
      </Modal>
    </Centered>
  )
}
