import { TextInput, Button } from '@mantine/core'

export const CreateUser = () => {
  return (
    <form>
      <TextInput />
      <div>
        <Button>Delete</Button>
        <Button type='submit'>Create</Button>
      </div>
    </form>
  )
}
