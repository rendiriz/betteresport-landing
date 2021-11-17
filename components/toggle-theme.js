import { Button, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Button variant="ghost" onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
    </>
  )
}

export default ToggleTheme
