import { List } from '@mantine/core'

interface Props {
  users?: []
}
export const Contacts = ({ users }: Props) => {
  const items = users?.map((user) => {
    const { id, firstName, lastName } = user
    return <List.Item key={id}>{`${firstName} ${lastName}`}</List.Item>
  })
  return (
    <>
      <List>
        {users?.length ? (
          <> {items}</>
        ) : (
          <List.Item>You have not added any contacts, yet.</List.Item>
        )}
      </List>
    </>
  )
}

export default Contacts
