import React from "react";
import momo from "../../../assets/cat_3.png";
import thakali from "../../../assets/cat_sri.png";
import selroti from "../../../assets/item_3.png";
import './KhanaKhajan.css';

const recipes = [
  {
    name: "Momo",
    image: momo,
    desc: "Steamed dumplings filled with spiced meat or vegetables, served with tangy achar.",
  },
  {
    name: "Thakali Khana Set",
    image: thakali,
    desc: "Traditional Nepali meal with rice, lentil soup, vegetables, pickles, and meat curry.",
  },
  {
    name: "Sel Roti",
    image: selroti,
    desc: "Sweet, ring-shaped rice bread, crispy outside and soft inside, a festival favorite.",
  },
];

const KhanaKhajan = () => (
  <section className="section">
    <h2 className="section-title glow-text">Khana Khajan: Nepali Recipes</h2>
    <div className="khana-recipes-row">
      {recipes.map((r) => (
        <div className="khana-recipe-card" key={r.name}>
          <img src={r.image} alt={r.name} className="khana-recipe-img" />
          <h3 className="khana-recipe-title">{r.name}</h3>
          <p className="khana-recipe-desc">{r.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default KhanaKhajan; 
