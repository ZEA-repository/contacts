import { useForm } from '@mantine/form'
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Checkbox,
  Anchor,
  Stack,
  // CheckboxProps,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { createUserRequest } from '@/api/userApi'
import type { Registration } from '@/types'
import { errorMessages } from '@/utils/validateForm'
import { Link } from 'react-router-dom'
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from '@/utils/validateForm'

export function RegistrationForm(props: PaperProps) {
  const [visible, { toggle }] = useDisclosure(false)
  const form = useForm<Registration>({
    initialValues: {
      login: '',
      username: '',
      phone: '',
      password: '',
      passwordConfirm: '',
      terms: true,
    },

    validate: {
      login: validateEmail,
      password: validatePassword,
      passwordConfirm: validatePasswordConfirm,
    },
  })

  const handleSubmit = (values: Registration) => {
    return createUserRequest(values)
  }

  return (
    <Paper radius='md' p='xl' withBorder {...props}>
      <Text size='lg' weight={500} transform='capitalize'>
        Welcom to Registration
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
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
            error={form.errors.login && 'Invalid email'}
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

          <PasswordInput
            required
            label='Confirm password'
            placeholder='Confirm password'
            value={form.values.passwordConfirm}
            onChange={(event) =>
              form.setFieldValue('passwordConfirm', event.currentTarget.value)
            }
            error={form.errors.passwordConfirm && errorMessages.passwordConfirm}
            visible={visible}
            onVisibilityChange={toggle}
          />

          <TextInput
            label='Username'
            placeholder='username'
            value={form.values.username}
            onChange={(event) =>
              form.setFieldValue('username', event.currentTarget.value)
            }
            radius='md'
          />

          <TextInput
            label='Phone'
            placeholder='Your phone'
            size='md'
            type='tel'
            onChange={(event) =>
              form.setFieldValue('phone', event.currentTarget.value)
            }
          />

          <Checkbox
            label='I accept terms and conditions'
            checked={form.values.terms as boolean | undefined}
            onChange={(event) =>
              form.setFieldValue('terms', event.currentTarget.checked)
            }
          />
        </Stack>

        <Group position='apart' mt='xl'>
          <Anchor component={Link} to='/login' color='dimmed' size='xs'>
            Already have an account? Login
          </Anchor>

          <Button type='submit' radius='xl'>
            Register
          </Button>
        </Group>
      </form>
    </Paper>
  )
}
