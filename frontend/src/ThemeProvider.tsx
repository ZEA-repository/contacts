import { MantineProvider, MantineThemeOverride } from '@mantine/core'
import { ReactNode } from 'react'

export const theme: MantineThemeOverride = {
  colorScheme: 'dark',
}

interface Props {
  children: ReactNode
}

export function ThemeProvider({ children }: Props) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      {children}
    </MantineProvider>
  )
}
