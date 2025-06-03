import React from 'react';
import './Menu.css';
import { FaArrowLeft } from 'react-icons/fa';

import momo from '../assets/images/momo.png';
import dalBhat from '../assets/images/dal_bhat.png';
import chatamari from '../assets/images/chatamari.png';
import selRoti from '../assets/images/sel_roti.png';
import gundruk from '../assets/images/gundruk.png';
import yomari from '../assets/images/yomari.png';

export default function WhatsCooking() {
  const dishes = [
    {
      id: 1,
      name: 'Steamed Momo',
      image: momo,
      description:
        'Delicious steamed dumplings filled with spiced meat or vegetables. A beloved Nepali street food.',
    },
    {
      id: 2,
      name: 'Dal Bhat',
      image: dalBhat,
      description:
        'Traditional lentil soup served with rice and vegetables. The everyday fuel of Nepali homes.',
    },
    {
      id: 3,
      name: 'Chatamari',
      image: chatamari,
      description:
        'A rice flour crepe topped with meat and spices, often referred to as the "Nepali Pizza".',
    },
    {
      id: 4,
      name: 'Sel Roti',
      image: selRoti,
      description:
        'A sweet rice-based ring-shaped bread, deep-fried and perfect with milk tea. A festival favorite.',
    },
    {
      id: 5,
      name: 'Gundruk',
      image: gundruk,
      description:
        'Fermented leafy greens rich in flavor and nutrients, a unique dish found only in Nepal.',
    },
    {
      id: 6,
      name: 'Yomari',
      image: yomari,
      description:
        'A sweet dumpling made of rice flour filled with molasses and sesame seeds, traditionally eaten in winter.',
    },
  ];

  return (
    <section className="whats-cooking-container">
      <a href="/" className="back-to-home" aria-label="Back to homepage">
        <FaArrowLeft size={18} />
        <span>Back to Home</span>
      </a>

      <h1 className="whats-cooking-title">What's Cooking 🍽️</h1>
      <p className="whats-cooking-subtitle">Signature Dishes of Nepal</p>
      <div className="title-underline" />

      <div className="dishes-grid">
        {dishes.map((dish) => (
          <article key={dish.id} className="dish-card" tabIndex={0}>
            <img
              src={dish.image}
              alt={dish.name}
              className="dish-image"
              loading="lazy"
            />
            <h2 className="dish-name">{dish.name}</h2>
            <p className="dish-description">{dish.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
