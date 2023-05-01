import { TextInput, Button, rem, createStyles, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'
import type { User } from '@/types'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { validateEmail, validateUsername } from '@/utils/validateForm'

type UserFormType = Omit<User, '_id' | 'avatar'>
interface Props {
  user: User | undefined
  onSubmit: (user: Partial<User>) => void
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
  const form = useForm<UserFormType>({
    initialValues: {
      username: '',
      login: '',
      phone: '',
    },
    validate: {
      login: validateEmail,
      username: validateUsername,
    },
  })
  useEffect(() => {
    user ? form.setValues(user) : form.reset()
  }, [user])

  return (
    <form onSubmit={form.onSubmit((user) => onSubmit(user))}>
      <TextInput
        label='Username'
        placeholder='John Doe'
        classNames={classes}
        {...form.getInputProps('username')}
      />

      <TextInput
        label='Email'
        placeholder='your@email.com'
        classNames={classes}
        {...form.getInputProps('login')}
      />

      <TextInput
        label='Phone'
        placeholder='Your phone'
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
