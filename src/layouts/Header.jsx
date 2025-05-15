import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header>
        <div className='container ms-auto'>
            <nav className='space-x-4'>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/">Login</NavLink>
                <Link to="/">Register</Link>
            </nav>
        </div>
    </header>
  )
}
