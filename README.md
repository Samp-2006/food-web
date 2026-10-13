# FoodieGo (Web)

A simple food delivery website built with **React + Vite**, made for learning React and **CleverTap** analytics. Browse restaurants, view menus, add food to a cart, place an order and see the order confirmation. CleverTap tracks what users do.

No router and no state library are used. One `screen` variable in `App.jsx` decides which page is shown, so the code stays easy to read.

---

## Features

- Full-width, responsive website layout (desktop, tablet and phone)
- Sticky navbar: Home, Restaurants, Offers, About, Search, Login/Logout, Cart (with item count)
- Home page: hero with search, category cards, popular restaurants, special offer, more restaurants
- Restaurant page: menus for every restaurant, with search by name, cuisine, category or dish
- Food details page with quantity picker
- Cart page: change quantities, see total, place order
- Order confirmation page
- Simple demo login page (name, email, optional phone)
- CleverTap Web SDK integration (events, order tracking, user login)

---

## Tech

| Item | Used |
|---|---|
| UI | React |
| Build tool | Vite |
| Analytics | `clevertap-web-sdk` |
| Linter | oxlint (comes with the Vite template) |
| Styling | Plain CSS (`src/App.css`) |

---

## Project structure

```
web/
  index.html
  package.json
  .env.local                  <- you create this (see Setup). Never commit it.
  public/
    images/                   <- food illustrations (SVG) used on cards and sections
  src/
    main.jsx                  <- entry point, mounts <App />
    App.jsx                   <- the "brain": state, cart logic, login, CleverTap calls
    App.css                   <- all styling
    data.js                   <- restaurants + menus (fake data)
    analytics.js              <- the ONLY file that talks to CleverTap
    components/
      Header.jsx              <- sticky navbar
      Footer.jsx              <- footer (also the "About" section)
      RestaurantCard.jsx      <- one restaurant card (used in two sections)
      Reveal.jsx              <- fade-in animation when a section scrolls into view
    screens/
      HomeScreen.jsx          <- landing page
      RestaurantListScreen.jsx<- menus + search
      FoodDetailsScreen.jsx   <- one food item + quantity + Add to Cart
      CartScreen.jsx          <- cart items, total, Place Order
      OrderConfirmationScreen.jsx
      LoginScreen.jsx         <- demo login form
```

---

## Setup

You need **Node.js** installed.

```bash
cd web
npm install
```

### CleverTap settings

Create a file named `.env.local` inside the `web` folder (next to `package.json`):

```
VITE_CLEVERTAP_LOGIN_ID=your-account-id
VITE_CLEVERTAP_LOGIN_REGION=in1
```

- Find the Account ID in the CleverTap dashboard under **Settings > Project** (shown as Project ID).
- The region comes from your dashboard URL (for example `in1.dashboard.clevertap.com` means `in1`).
- Variable names must start with `VITE_`, or Vite will not expose them to the browser.
- Restart the dev server after changing this file.
- Do not put the Account Token or Passcode in this project. The web SDK does not need them.
- Make sure `.env.local` is listed in `.gitignore` (the Vite template ignores `*.local`).

---

## Run

```bash
npm run dev
```

Open the link it prints (usually `http://localhost:5173`).

Other commands:

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check the code with oxlint |

---

## How the app works

- `App.jsx` holds all shared state: current screen, selected food, cart, last order, search text, logged-in user.
- Screens and components receive data and functions as props. They only display things and call the functions they are given.
- Restaurant data lives in `src/data.js`. Each restaurant has `id`, `name`, `cuisine`, `rating`, `image`, `deliveryTime`, `delivery`, `tags` and a `menu`.
- Category cards and the search boxes use the same search text. A category click searches for that category name.
- The login is a **demo**. There is no password and no server. It stores the user in the browser (`localStorage`) so a refresh does not log you out.

---

## CleverTap

All CleverTap code is in `src/analytics.js`:

| Function | What it does |
|---|---|
| `LoginUser({ name, identity, email, phone })` | Identifies the user (`onUserLogin`) |
| `updateProfile(props)` | Updates profile properties (`profile.push`) |
| `trackEvents(name, props)` | Records any event |
| `trackCharged(orderId, total, items)` | Records a finished order (`Charged` event) |

### Events currently tracked

| Event | When | Properties |
|---|---|---|
| Restaurant Clicked | A restaurant card is clicked | Restaurant Name, Cuisine, Rating, Delivery Time, Delivery Info |
| Food Clicked | A food item is clicked | Food Name, Restaurant Name, Cuisine, Price |
| Added to Cart | Food is added to the cart | Food Name, Restaurant Name, Price, Quantity |
| Charged | An order is placed | Amount, Charged ID, Items (name, restaurant, quantity, price) |

Logging in calls `onUserLogin` with the user's name and email (the email is also used as the Identity). Phone is optional and should include the country code, for example `+919876543210`.

### Add a new event

1. Import the helper at the top of the file: `import { trackEvents } from "./analytics";` (use `../analytics` inside `components/` or `screens/`).
2. Call it inside the function that runs when the user does the action, after the action succeeds:
   ```jsx
   trackEvents("Event Name", { "Property Name": value });
   ```
3. Never call it directly in the component body (it would fire on every re-render).
4. Keep event and property names spelled exactly the same everywhere.

### Where to see the data in CleverTap

- **Debugger** (left pane): live events and properties while testing.
- **Segments > Find People**: search a user by email, identity or CleverTap ID.
- **Analytics > Events**: event counts and charts.

A visitor stays **anonymous** until `onUserLogin` runs. Events recorded before login stay on that profile, which gets the identity when the user logs in.

---

## Images

The pictures in `public/images/` are simple illustrations (SVG). To use real photos, add them to that folder and change the `image` paths in `src/data.js` (and the image paths in `src/screens/HomeScreen.jsx` for the categories, hero and offer).

---

## Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Blank page | Open the browser console (`F12`). Usually an import name does not match an export name, for example `trackEvents` vs `trackEvent`. |
| "Account ID is not set" | `.env.local` is missing, in the wrong folder, names do not start with `VITE_`, or the dev server was not restarted. |
| Events in the console but not in the dashboard | The region in `.env.local` does not match your dashboard URL. |
| No events in the dashboard at all | Check the **Debugger** first, and confirm the event call is inside a click handler. |
| Profile has no name or email | Check the profile you are viewing is the logged-in one (search by email in **Find People**), and that `LoginUser` is called once with an object. |
| `crypto` warning when building | Vite shows this about the CleverTap SDK. It is only a warning. |

---

## Notes

- This is a learning project. The login, restaurants and orders are all fake and run in the browser only.
- The `FOODIE30` offer code is display only; the cart has no coupon field yet.
- `clevertap.setLogLevel(3)` in `analytics.js` prints CleverTap logs to the console. Remove it for production.

---

## Ideas for next steps

- Add a coupon field that actually applies `FOODIE30`
- Track more events: Category Clicked, Search Performed, Cart Viewed, Restaurant Favorited
- Add a profile counter such as "Orders Placed"
- Add CleverTap pop-ups (for the offer) and web push notifications
- Connect a real backend for login and orders
