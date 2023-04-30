import { useForm } from '@mantine/form'
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Anchor,
  Stack,
} from '@mantine/core'
import { authentication } from '@/api'
import { errorMessages } from '@/utils/validateForm'
import { Link } from 'react-router-dom'
import type { Login } from '@/types'
import { validateEmail, validatePassword } from '@/utils/validateForm'

export function LoginForm(props: PaperProps) {
  const form = useForm<Login>({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: validateEmail,
      password: validatePassword,
    },
  })

  const handleSubmit = (values: Login) => {
    return authentication(values, 'login')
  }

  return (
    <Paper radius='md' p='xl' withBorder {...props}>
      <Text size='lg' weight={500} transform='capitalize'>
        Login
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            required
            data-autofocus
            label='Email'
            placeholder='hello@mantine.dev'
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
            radius='md'
          />

          <PasswordInput
            required
            label='Password'
            placeholder='Your password'
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            error={form.errors.password && errorMessages.password}
            radius='md'
          />
        </Stack>

        <Group position='apart' mt='xl'>
          <Anchor component={Link} to='/registration' color='dimmed' size='xs'>
            Don't have an account? Register
          </Anchor>

          <Button type='submit' radius='xl'>
            Login
          </Button>
        </Group>
      </form>
    </Paper>
  )
}
