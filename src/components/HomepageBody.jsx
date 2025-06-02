import React from 'react'
import { FaSearch } from 'react-icons/fa'

export default function HomepageBody() {
    return (
        <section className="hero">
            <div className="hero-overlay">
                <div className="hero-content">
                    <h1>Welcome to Mitho Bites</h1>
                    <p>Delight in every bite – Authentic Nepali flavors delivered to your doorstep.</p>
                    <div className="search-bar-container">
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Explore best restaurants & cafes..."
                        />
                        <FaSearch className="search-icon" />
                    </div>
                </div>
            </div>
        </section>
    )
}
