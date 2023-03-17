import {
  TextInput,
  Button,
  rem,
  createStyles,
  Title,
  Stack,
  Group,
} from '@mantine/core'

interface Props {
  id: string
  name: string
  email: string
  phone: string
}

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: rem(56),
    paddingTop: rem(22),
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.sm,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
}))

export const UserForm = ({ id, name, email, phone }: Props) => {
  const { classes } = useStyles()
  const submitUpdate = (event: any) => {
    event.preventDefault()
    //  handleUpdateUser(user)
  }

  const submitCreate = (event: any) => {
    event.preventDefault()
    //  handleCreateUser(user)
  }

  const submitDelete = (event: any) => {
    event.preventDefault()
    //  handleDeleteUser(user.id)
  }
  return (
    <form onSubmit={id ? submitUpdate : submitCreate}>
      <Title order={2}>{id ? 'Update' : 'Create'}</Title>

      <Stack>
        <TextInput
          label='name'
          placeholder='John Doe'
          classNames={classes}
          value={name}
        />

        <TextInput
          label='email'
          placeholder='your@email.com'
          value={email}
          classNames={classes}
        />

        <TextInput
          label='phone'
          placeholder='xx-xxx-xxx-xx-xx'
          classNames={classes}
          value={phone}
        />
      </Stack>
      <Group position='apart'>
        {id && (
          <Button type='submit' onClick={submitDelete}>
            Delete
          </Button>
        )}

        <Button type='submit'>{id ? 'Update' : 'Create'}</Button>
      </Group>
    </form>
  )
}
