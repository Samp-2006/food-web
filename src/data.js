// data.js
// PURPOSE: Fake restaurant + menu data. Later this could come from a server.
// Every food has a unique id so the cart can tell items apart.
//
// Each restaurant now also has:
//   image        -> picture shown on its card (files live in public/images/)
//   deliveryTime -> text shown on the card
//   delivery     -> delivery info shown on the card
//   tags         -> words used by search + category cards (e.g. "Burgers")

export const restaurants = [
  {
    id: 1,
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.5,
    emoji: "🍛",
    image: "/images/indian.svg",
    deliveryTime: "25-30 min",
    delivery: "Free delivery",
    tags: ["Indian"],
    menu: [
      { id: 101, name: "Butter Chicken", price: 280, emoji: "🍗", description: "Creamy tomato curry with tender chicken pieces." },
      { id: 102, name: "Paneer Tikka", price: 220, emoji: "🧀", description: "Grilled paneer cubes with mint chutney." },
      { id: 103, name: "Garlic Naan", price: 60, emoji: "🫓", description: "Soft oven-baked bread brushed with garlic butter." },
    ],
  },
  {
    id: 2,
    name: "Pizza Corner",
    cuisine: "Italian",
    rating: 4.2,
    emoji: "🍕",
    image: "/images/pizza.svg",
    deliveryTime: "30-35 min",
    delivery: "₹30 delivery",
    tags: ["Pizza", "Italian"],
    menu: [
      { id: 201, name: "Margherita Pizza", price: 250, emoji: "🍕", description: "Classic pizza with tomato sauce and mozzarella." },
      { id: 202, name: "Pasta Alfredo", price: 270, emoji: "🍝", description: "Penne in a rich white cream sauce." },
      { id: 203, name: "Garlic Bread", price: 120, emoji: "🥖", description: "Crispy bread with herbs and butter." },
    ],
  },
  {
    id: 3,
    name: "Burger Barn",
    cuisine: "Fast Food",
    rating: 4.0,
    emoji: "🍔",
    image: "/images/burger.svg",
    deliveryTime: "25-30 min",
    delivery: "Free delivery",
    tags: ["Burgers"],
    menu: [
      { id: 301, name: "Veg Burger", price: 140, emoji: "🍔", description: "Crispy veg patty with lettuce and special sauce." },
      { id: 302, name: "French Fries", price: 90, emoji: "🍟", description: "Golden salted fries." },
      { id: 303, name: "Chocolate Shake", price: 130, emoji: "🥤", description: "Thick chocolate milkshake." },
    ],
  },
  // ---- NEW restaurants (added so every category card has a match) ----
  {
    id: 4,
    name: "Sushi Zen",
    cuisine: "Japanese",
    rating: 4.7,
    emoji: "🍣",
    image: "/images/sushi.svg",
    deliveryTime: "35-40 min",
    delivery: "₹40 delivery",
    tags: ["Japanese"],
    menu: [
      { id: 401, name: "Salmon Nigiri", price: 320, emoji: "🍣", description: "Fresh salmon over seasoned sushi rice." },
      { id: 402, name: "California Roll", price: 290, emoji: "🍱", description: "Crab, avocado and cucumber rolled in rice." },
      { id: 403, name: "Miso Soup", price: 110, emoji: "🍜", description: "Warm soybean broth with tofu and seaweed." },
    ],
  },
  {
    id: 5,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.3,
    emoji: "🌮",
    image: "/images/tacos.svg",
    deliveryTime: "20-25 min",
    delivery: "Free delivery",
    tags: ["Mexican"],
    menu: [
      { id: 501, name: "Chicken Tacos", price: 180, emoji: "🌮", description: "Soft shells with spicy chicken, salsa and lettuce." },
      { id: 502, name: "Veg Burrito", price: 200, emoji: "🌯", description: "Rice, beans and veggies wrapped in a warm tortilla." },
      { id: 503, name: "Cheesy Nachos", price: 150, emoji: "🧀", description: "Crunchy chips with melted cheese and jalapeños." },
    ],
  },
  {
    id: 6,
    name: "Dragon Wok",
    cuisine: "Chinese",
    rating: 4.4,
    emoji: "🍜",
    image: "/images/chinese.svg",
    deliveryTime: "30-35 min",
    delivery: "₹25 delivery",
    tags: ["Chinese"],
    menu: [
      { id: 601, name: "Veg Hakka Noodles", price: 190, emoji: "🍜", description: "Stir-fried noodles with crunchy vegetables." },
      { id: 602, name: "Veg Manchurian", price: 210, emoji: "🥡", description: "Crispy veg balls in a tangy garlic sauce." },
      { id: 603, name: "Spring Rolls", price: 140, emoji: "🥟", description: "Golden rolls filled with cabbage and carrots." },
    ],
  },
  {
    id: 7,
    name: "Green Bowl",
    cuisine: "Healthy",
    rating: 4.6,
    emoji: "🥗",
    image: "/images/healthy.svg",
    deliveryTime: "20-25 min",
    delivery: "Free delivery",
    tags: ["Healthy"],
    menu: [
      { id: 701, name: "Quinoa Salad Bowl", price: 260, emoji: "🥗", description: "Quinoa, greens, tomato and a lemon dressing." },
      { id: 702, name: "Avocado Toast", price: 190, emoji: "🥑", description: "Multigrain toast topped with smashed avocado." },
      { id: 703, name: "Fruit Smoothie", price: 150, emoji: "🥤", description: "Fresh seasonal fruit blended with yogurt." },
    ],
  },
  {
    id: 8,
    name: "Sweet Tooth",
    cuisine: "Desserts",
    rating: 4.8,
    emoji: "🍰",
    image: "/images/dessert.svg",
    deliveryTime: "25-30 min",
    delivery: "₹20 delivery",
    tags: ["Desserts"],
    menu: [
      { id: 801, name: "Chocolate Brownie", price: 130, emoji: "🍫", description: "Warm fudgy brownie with chocolate chunks." },
      { id: 802, name: "Red Velvet Cupcake", price: 110, emoji: "🧁", description: "Soft red velvet with cream cheese frosting." },
      { id: 803, name: "Glazed Donut", price: 90, emoji: "🍩", description: "Fluffy donut with a sweet pink glaze." },
    ],
  },
];
