import React from 'react'

const Header = ({ roomID }) => {
  return (
    <header className='absolute pl-8 pt-6 font-medium'>
      <span>{roomID}</span>
    </header>
  )
}

export default Header