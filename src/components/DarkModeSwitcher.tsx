import useDarkMode from '@/hooks/useDarkMode';
import { memo } from 'react'
import { Moon, Sun } from 'react-feather'

const DarkModeSwitcher = () => {
	const { isDarkMode, toggleDarkMode } = useDarkMode()
	return (
		<div
			onClick={toggleDarkMode}
			className='rounded-full ring-1 ring-gray-300 hover:bg-gray-100 dark:ring-gray-300 dark:hover:bg-gray-600 cursor-pointer p-1'
		>
			{isDarkMode ? (
				<Sun className='text-gray-500 dark:text-white' />
			) : (
				<Moon className='text-gray-500 dark:text-white' />
			)}
		</div>
	)
}

export default memo(DarkModeSwitcher)
