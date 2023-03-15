import { Title, Box, Flex, Group, Button } from '@mantine/core'
import { Contacts } from '@/components/Contacts'
import { CreateUser } from '@/components/CreateUser'
import Centered from '@/layouts/Centered'

export function ContactsPage() {
  return (
    <Centered>
      <Flex gap='md'>
        <Box sx={{ flex: 0.5 }}>
          <Group align='center' py='md'>
            <Title order={2}>Contacts</Title>
            <Button>+ Add Contact</Button>
          </Group>
          <Contacts />
        </Box>
        <Box sx={{ flex: 0.5 }}>
          <Title order={3}>Create</Title>
          <CreateUser />
        </Box>
      </Flex>
    </Centered>
  )
}
