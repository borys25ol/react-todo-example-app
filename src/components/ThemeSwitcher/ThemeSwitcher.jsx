import React, { useEffect, useState } from 'react'

import { ReactComponent as IconMoon } from 'assets/icon-moon.svg'
import { ReactComponent as IconSun } from 'assets/icon-sun.svg'
import { THEME } from 'const'
import { Wrapper } from 'components/ThemeSwitcher'
import { useLocalStorage } from 'hooks/useLocalStorage'

function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useLocalStorage('theme', THEME.Dark)
  const [theme, setTheme] = useState(currentTheme)

  const iconsMap = {
    dark: <IconSun />,
    light: <IconMoon />,
  }

  const toggleTheme = () => {
    setTheme(theme === THEME.Light ? THEME.Dark : THEME.Light)
  }

  useEffect(() => {
    document.body.setAttribute('data-theme', theme.toString())
    setCurrentTheme(theme)
  }, [theme, setCurrentTheme])

  return <Wrapper onClick={() => toggleTheme()}>{iconsMap[theme]}</Wrapper>
}

export { ThemeSwitcher }
