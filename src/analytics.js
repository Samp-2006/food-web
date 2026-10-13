import clevertap from "clevertap-web-sdk";

// 1) Initialize CleverTap with the account ID and region from .env.local
clevertap.init(
  import.meta.env.VITE_CLEVERTAP_LOGIN_ID,
  import.meta.env.VITE_CLEVERTAP_LOGIN_REGION
);
clevertap.spa = true;
clevertap.privacy.push({ optOut: false }); // set to true to opt out of tracking
clevertap.privacy.push({ useIP: false });  // set to true to opt out of IP tracking
clevertap.setLogLevel(3); // shows logs in the browser console; remove later

// 2) Identify a logged-in user (not used until you build a login page)
export function LoginUser({ name, email, phone }) {
  clevertap.onUserLogin.push({
    Site: {
      Name: name,
      Email: email,
      Phone: phone,
     
    },
  });
}

// 3) Update profile details
export function updateProfile(props) {
  clevertap.profile.push({ Site: props });
}

// 4) Track a normal event
export function trackEvents(name, props) {
  clevertap.event.push(name, props);
}

// 5) Track a finished order
export function trackCharged(orderId, total, items) {
  clevertap.event.push("Charged", {
    Amount: total,
    "Charged ID": orderId,
    Items: items.map((item) => ({
      "Food name": item.name,
      Restaurant: item.restaurantName,
      Quantity: item.quantity,
      Price: item.price,
    })),
  });
}