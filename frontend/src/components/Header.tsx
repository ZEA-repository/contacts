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
  ActionIcon,
  Tooltip,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Centered from '@/layouts/Centered'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IconLogout } from '@tabler/icons-react'

import { logoutRequest } from '@/api/auth'

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
  const navigate = useNavigate()
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

  const handleLogout = async () => {
    const data = await logoutRequest()
    if (data.status === 200) navigate('/login')
  }

  const buttonLogout = (
    <Tooltip
      label='Logout'
      position='right'
      transitionProps={{ duration: 500 }}
      className={classes.hiddenMobile}
      onClick={handleLogout}
    >
      <ActionIcon variant='subtle' aria-label='Logout'>
        <IconLogout size='1.5rem' />
      </ActionIcon>
    </Tooltip>
  )

  return (
    <>
      <Header height={rem(60)} p='xs'>
        <Centered>
          <Group position='apart' sx={{ height: '100%' }}>
            {logo}
            <Group className={classes.hiddenMobile}>{items}</Group>
            {buttonLogout}

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

          <Button variant='default' type='submit' onClick={handleLogout}>
            Logout
          </Button>
        </ScrollArea>
      </Drawer>
    </>
  )
}
