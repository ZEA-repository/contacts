import type { ContainerProps } from '@mantine/core'
import { Container, createStyles } from '@mantine/core'

export default function Centered(props: ContainerProps) {
  const { classes } = useStyles()

  return (
    <Container {...props} className={classes.container}>
      {props.children}
    </Container>
  )
}

const useStyles = createStyles((theme) => ({
  container: {
    [theme.fn.smallerThan('xs')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
}))
