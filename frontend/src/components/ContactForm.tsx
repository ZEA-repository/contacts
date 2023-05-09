import { TextInput, Button, rem, createStyles, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'
import type { Contact, ContactFormType } from '@/types'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { validateEmail, validateUsername } from '@/utils/validateForm'

interface Props {
  contact: Contact | undefined
  onSubmit: (contact: ContactFormType) => void
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

export const ContactForm: React.FC<Props> = ({ contact, onSubmit }) => {
  const { classes } = useStyles()
  const form = useForm<ContactFormType>({
    initialValues: {
      firstname: '',
      email: '',
      phone: '',
      avatar: {
        url: '',
      },
    },
    validate: {
      firstname: validateUsername,
      email: validateEmail,
    },
  })
  useEffect(() => {
    contact ? form.setValues(contact) : form.reset()
  }, [contact])

  return (
    <form onSubmit={form.onSubmit((contact) => onSubmit(contact))}>
      <TextInput
        label='firstname'
        placeholder='John Doe'
        classNames={classes}
        {...form.getInputProps('firstname')}
      />

      <TextInput
        label='email'
        placeholder='your@email.com'
        classNames={classes}
        {...form.getInputProps('email')}
      />

      <TextInput
        label='phone'
        placeholder='Your phone'
        classNames={classes}
        {...form.getInputProps('phone')}
      />

      <TextInput
        label='Avatar URL'
        placeholder='https://examples.com/img.jpg'
        classNames={classes}
        value={form.values.avatar?.url}
        onChange={(event) =>
          form.setFieldValue('avatar.url', event.currentTarget.value)
        }
        radius='md'
      />

      <Group mt='md'>
        <Button leftIcon={<IconDeviceFloppy size='1rem' />} type='submit'>
          Save
        </Button>
      </Group>
    </form>
  )
}
