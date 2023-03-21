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
import type { User } from '@/types'

interface Props {
  users?: User[]
  activeUserId?: string
  setUser: (user: User) => void
  setMode: (mode: 'edit') => void
  deleteUser: (user: User) => void
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

export function UsersTable({
  users,
  activeUserId,
  setUser,
  deleteUser,
}: Props) {
  const { classes, cx } = useStyles()
  const rows = users?.map((user) => (
    <tr
      key={user._id}
      className={cx(classes.row, {
        [classes.rowActive]: activeUserId === user._id,
      })}
    >
      <td>
        <Group spacing='sm'>
          <Avatar size={30} src={user.avatar} radius={30} />
          <Text fz='sm' fw={500}>
            {user.name}
          </Text>
        </Group>
      </td>
      <td>
        <Anchor component='button' size='sm'>
          {user.email}
        </Anchor>
      </td>
      <td>
        <Text fz='sm' c='dimmed'>
          {user.phone}
        </Text>
      </td>
      <td>
        <Group spacing={0} position='right'>
          <ActionIcon onClick={() => setUser(user)}>
            <IconPencil size='1rem' stroke={1.5} />
          </ActionIcon>
          <ActionIcon color='red' onClick={() => deleteUser(user)}>
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
