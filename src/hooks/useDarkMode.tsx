import { useState, useCallback, useEffect, createContext, useContext } from 'react'

type DarkModeContextStruct = {
  isDarkMode: boolean
  setIsDarkMode: (value: boolean) => void
}

const THEME_STORAGE_KEY = 'themeType'
const THEME_TYPE = {
	DARK: 'DARK',
	LIGHT: 'LIGHT',
}

const DarkModeContext = createContext<DarkModeContextStruct>({
  isDarkMode: false,
  setIsDarkMode: () => {
    // none
  }
})

const useDarkMode = () => {
	const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext)

	const toggleDarkMode = useCallback(() => {
		setIsDarkMode(isDarkMode ? false : true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDarkMode])

	return {
		isDarkMode,
		toggleDarkMode
	}
}

type DarkModeProviderProps = {
  children: React.ReactNode
}


export const DarkModeProvider:React.FC<DarkModeProviderProps> = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(THEME_STORAGE_KEY) === THEME_TYPE.DARK) setIsDarkMode(true)
  }, [])

	useEffect(() => {
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        if (isDarkMode) {
          document.body.classList.add('dark')
        } else {
          document.body.classList.remove('dark')
        }
        localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? THEME_TYPE.DARK : THEME_TYPE.LIGHT) 
      }
    }, 100)
	}, [isDarkMode])

	return (
		<DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	)
}

export default useDarkMode
