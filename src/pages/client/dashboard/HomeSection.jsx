import React from "react";
import loved1 from "../../../assets/item_1.png";
import loved2 from "../../../assets/item_2.png";
import loved3 from "../../../assets/item_3.png";
import res1 from "../../../assets/res_1.png";
import res2 from "../../../assets/res_2.png";
import res3 from "../../../assets/res_3.png";
import momo from "../../../assets/cat_3.png";
import chowmein from "../../../assets/cat_4.png";
import thakali from "../../../assets/cat_sri.png";
import "../Dashboard.css";
import { useOrders } from '../../../hooks/useOrders';

const muchLovedDishes = [
  { id: 1, name: "Spicy Momo", image: loved1, price: 130, type: "Nepali", restaurant: "Momo House" },
  { id: 2, name: "Paneer Chowmein", image: loved2, price: 140, type: "Indian", restaurant: "Chowmein Express" },
  { id: 3, name: "Sel Roti", image: loved3, price: 60, type: "Nepali", restaurant: "Nepali Snacks" },
];

const popularRestaurants = [
  { id: 1, name: "Momo House", desc: "Famous for momos", image: res1, rating: "⭐ 4.7" },
  { id: 2, name: "Chowmein Express", desc: "Fast & Tasty", image: res2, rating: "⭐ 4.5" },
  { id: 3, name: "Thakali Kitchen", desc: "Authentic cuisine", image: res3, rating: "⭐ 4.8" },
];

const recentOrders = [
  { id: 1, name: "Chicken Momo", image: momo, time: "2h ago", restaurant: "Momo House" },
  { id: 2, name: "Indian Chowmein", image: chowmein, time: "1d ago", restaurant: "Chowmein Express" },
  { id: 3, name: "Thakali Set", image: thakali, time: "3d ago", restaurant: "Thakali Kitchen" },
];

const HomeSection = () => {
  const { data, isLoading, error } = useOrders();
  const orders = data?.data || [];

  return (
    <>
      <section className="section">
        <h2 className="section-title glow-text">Much Loved Dishes</h2>
        <div className="categories-row">
          {muchLovedDishes.map((dish) => (
            <div className="category-card animated-card" key={dish.id}>
              <img src={dish.image} alt={dish.name} className="category-image" />
              <h3 className="category-title">{dish.name}</h3>
              <p className="category-subtitle">NPR {dish.price} | {dish.type} | {dish.restaurant}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <h2 className="section-title glow-text">Popular Restaurants</h2>
        <div className="categories-row">
          {popularRestaurants.map((res) => (
            <div className="category-card animated-card" key={res.id}>
              <img src={res.image} alt={res.name} className="category-image" />
              <h3 className="category-title">{res.name}</h3>
              <p className="category-subtitle">{res.desc}</p>
              <span className="category-subtitle">{res.rating}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <h2 className="section-title glow-text">Recently Ordered</h2>
        {isLoading ? (
          <div>Loading recent orders...</div>
        ) : error ? (
          <div>Error loading orders</div>
        ) : (
          <div className="categories-row">
            {orders.length === 0 ? (
              <div>No recent orders found.</div>
            ) : (
              orders.slice(0, 4).map((order) => (
                <div className="category-card animated-card" key={order._id}>
                  <img
                    src={order.items?.[0]?.productId?.image || '/placeholder-food.jpg'}
                    alt={order.items?.[0]?.productId?.name || 'Product'}
                    className="category-image"
                    onError={(e) => {
                      e.target.src = '/placeholder-food.jpg';
                    }}
                  />
                  <h3 className="category-title">{order.items?.[0]?.productId?.name || 'Product'}</h3>
                  <p className="category-subtitle">
                    {order.items?.[0]?.productId?.restaurantName || 'Restaurant'} |
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default HomeSection; 