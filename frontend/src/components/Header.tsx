import {
  createStyles,
  Header,
  Group,
  Button,
  UnstyledButton,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Divider,
  Flex,
  Center,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Centered from '@/layouts/Centered'
import { Link, useLocation } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  linksMobile: {
    width: rem(100),
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    textTransform: 'uppercase',
    '&:hover': {
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.gray[0]
          : theme.colors.gray[7],
    },
    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.gray[0]
          : theme.colors.dark[6]
      }`,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.gray[0]
          : theme.colors.gray[7],
    },
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}))

interface Props {
  links?: { href: string; label: string }[]
}

export function CustomHeader({ links }: Props) {
  const { pathname } = useLocation()
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false)
  const { classes, cx, theme } = useStyles()
  const items = links?.map((link) => (
    <Link
      key={link.label}
      to={link.href}
      className={cx(classes.link, {
        [classes.linkActive]: pathname === link.href,
      })}
      onClick={(event) => {
        closeDrawer()
      }}
    >
      {link.label}
    </Link>
  ))
  const logo = (
    <UnstyledButton to='/' component={Link}>
      🧸 Contacts
    </UnstyledButton>
  )
  return (
    <>
      <Header height={rem(60)} p='xs'>
        <Centered>
          <Group position='apart' sx={{ height: '100%' }}>
            {logo}

            <Group className={classes.hiddenMobile}>{items}</Group>
            <Button.Group className={classes.hiddenMobile}>
              <Button variant='default'>Log in</Button>
              <Button>Sign up</Button>
            </Button.Group>
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
          </Group>
        </Centered>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size='100%'
        padding='md'
        title='Contacts'
        className={classes.hiddenDesktop}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`}>
          <Divider
            my='sm'
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />
          <Center>
            <Flex
              direction='column'
              align='center'
              className={cx(classes.linksMobile, classes.hiddenDesktop)}
            >
              {items}
            </Flex>
          </Center>

          <Divider
            my='sm'
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />
          <Group position='center' grow pb='xl' px='md'>
            <Button variant='default'>Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </>
  )
}
