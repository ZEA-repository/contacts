import { Title, Box, SimpleGrid, Group, Button, Paper } from '@mantine/core'
import { Contacts } from '@/components/Contacts'
import { UserForm } from '@/components/UserForm'
import Centered from '@/layouts/Centered'

export function ContactsPage() {
  const user = {
    id: '',
    name: '',
    email: '',
    phone: '',
  }
  return (
    <Centered>
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 755, cols: 1 }]}>
        <Box>
          <Group align='center' py='md'>
            <Title order={2}>Contacts</Title>
            <Button>+ Add Contact</Button>
          </Group>
          <Contacts />
        </Box>
        <Paper shadow='xs' p='md' withBorder>
          <UserForm {...user} />
        </Paper>
      </SimpleGrid>
    </Centered>
  )
}
