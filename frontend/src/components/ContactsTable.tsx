import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  createStyles,
} from '@mantine/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import type { Contact } from '@/types'

interface Props {
  contacts?: Contact[]
  activeContactId?: string
  setContact: (contact: Contact) => void
  deleteContact: (contactId: string) => void
}

const useStyles = createStyles((theme) => ({
  row: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  rowActive: {
    fontWeight: 500,
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 2 : 7],
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
    },
  },
}))

export function ContactsTable({
  contacts,
  activeContactId,
  setContact,
  deleteContact,
}: Props) {
  const { classes, cx } = useStyles()
  const rows = contacts?.map((contact) => (
    <tr
      key={contact._id}
      className={cx(classes.row, {
        [classes.rowActive]: activeContactId === contact._id,
      })}
    >
      <td>
        <Group spacing='sm'>
          <Avatar size={30} src={contact.avatar?.url} radius={30} />
          <Text fz='sm' fw={500}>
            {contact.firstname}
          </Text>
        </Group>
      </td>
      <td>
        <Anchor component='button' size='sm'>
          {contact.email}
        </Anchor>
      </td>
      <td>
        <Text fz='sm' c='dimmed'>
          {contact.phone}
        </Text>
      </td>
      <td>
        <Group spacing={0} position='right'>
          <ActionIcon onClick={() => setContact(contact)}>
            <IconPencil size='1rem' stroke={1.5} />
          </ActionIcon>
          <ActionIcon color='red' onClick={() => deleteContact(contact._id)}>
            <IconTrash size='1rem' stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ))

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing='sm'>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Email</th>
            <th>Phone</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}
