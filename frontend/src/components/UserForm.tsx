import { TextInput, Button, rem, createStyles, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'
import type { User } from '@/types'
import { IconDeviceFloppy } from '@tabler/icons-react'

interface Props {
  user: User
  onSubmit: (user: User) => void
}

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing.md,
  },
  input: {
    height: rem(56),
    paddingTop: rem(22),
  },
  label: {
    position: 'absolute',
    pointerEvents: 'none',
    color: theme.colors.dark[3],
    fontSize: theme.fontSizes.sm,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
}))

export const UserForm: React.FC<Props> = ({ user, onSubmit }) => {
  const { classes } = useStyles()
  const form = useForm<Omit<User, '_id' | 'avatar'>>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
    },
    validate: {
      // name:  (value) => (value.length < 2 ? 'Name must have at least 2 letters' : ''),
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      // phone: (value) => (),
    },
  })
  useEffect(() => {
    user ? form.setValues(user) : form.reset()
  }, [user])

  return (
    <form onSubmit={form.onSubmit((user) => onSubmit(user))}>
      <TextInput
        label='name'
        placeholder='John Doe'
        classNames={classes}
        {...form.getInputProps('name')}
      />

      <TextInput
        label='email'
        placeholder='your@email.com'
        classNames={classes}
        {...form.getInputProps('email')}
      />

      <TextInput
        label='phone'
        placeholder='xx-xxx-xxx-xx-xx'
        classNames={classes}
        {...form.getInputProps('phone')}
      />

      <Group mt='md'>
        <Button leftIcon={<IconDeviceFloppy size='1rem' />} type='submit'>
          Save
        </Button>
      </Group>
    </form>
  )
}
