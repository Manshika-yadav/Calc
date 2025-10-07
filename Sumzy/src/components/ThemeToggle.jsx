import React from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      className="p-2 rounded-full shadow-sm focus:outline-none"
      onClick={() => setDarkMode(!darkMode)}
      aria-label="Toggle theme"
    >
      {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
    </button>
  )
}
