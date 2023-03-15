import { List } from '@mantine/core'

interface Props {
  contacts?: []
}
export const Contacts = ({ contacts }: Props) => {
  const items = contacts?.map((contact) => {
    const { id, firstName, lastName } = contact

    return <List.Item key={id}>{`${firstName} ${lastName}`}</List.Item>
  })
  return (
    <>
      <List>
        {contacts?.length ? (
          <> {items}</>
        ) : (
          <List.Item>You have not added any contacts, yet.</List.Item>
        )}
      </List>
    </>
  )
}

export default Contacts
