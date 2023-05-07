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
import { loginRequest } from '@/api/auth'
import { errorMessages } from '@/utils/validateForm'
import { Link } from 'react-router-dom'
import type { Login } from '@/types'
import { validateEmail, validatePassword } from '@/utils/validateForm'
import { useNavigate } from 'react-router-dom'

const baseUrl = import.meta.env.VITE_CLIENT_URL

export function LoginForm(props: PaperProps) {
  const navigate = useNavigate()
  const form = useForm<Login>({
    initialValues: {
      login: '',
      password: '',
    },
    validate: {
      login: validateEmail,
      password: validatePassword,
    },
  })

  const loginSubmit = async (values: Login) => {
    const data = await loginRequest(values)
    if (data.status === 200) {
      navigate('/')
    }
  }

  return (
    <Paper radius='md' p='xl' withBorder {...props}>
      <Text size='lg' weight={500} transform='capitalize'>
        Login
      </Text>

      <form onSubmit={form.onSubmit(loginSubmit)}>
        <Stack>
          <TextInput
            required
            data-autofocus
            label='Email'
            placeholder='hello@mantine.dev'
            value={form.values.login}
            onChange={(event) =>
              form.setFieldValue('login', event.currentTarget.value)
            }
            error={form.errors.login && errorMessages.login}
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
