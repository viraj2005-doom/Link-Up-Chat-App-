# Real-Time Chat Application Study README

This project is a **real-time chat application** built with:

- **Frontend:** React.js + Vite
- **Backend:** Node.js + Express.js
- **Real-time communication:** Socket.IO
- **Database:** MongoDB
- **State management:** Zustand
- **Styling:** Tailwind CSS + DaisyUI

This README is written as a **study guide**. It explains not only how to run the project, but also how the **frontend flow**, **backend flow**, and **Socket.IO flow** work in this chat application.

---

## 1. Project Features

- User signup and login
- JWT-based authentication
- Protected routes
- Real-time one-to-one chat
- Online/offline user status
- Sidebar with available users
- Profile picture upload
- Image message support
- Theme support using Zustand + localStorage

---

## 2. Technology Stack

### Frontend

- React.js
- Vite
- React Router DOM
- Zustand
- Axios
- Socket.IO Client
- Tailwind CSS
- DaisyUI
- Lucide React Icons

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO
- JWT
- bcryptjs
- cookie-parser
- cors
- Cloudinary

---

## 3. Folder Structure

```text
chatapp/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
├── package.json
├── README.md
└── README-study.md
```

### What each frontend folder does

- `components/`: Reusable UI parts like navbar, sidebar, chat container, message input
- `pages/`: Full pages like Login, Signup, Home, Profile, Settings
- `store/`: Zustand stores for app-wide state like auth, chat, and theme
- `lib/`: Helper files like Axios setup, token functions, utilities
- `main.jsx`: React starting point
- `App.jsx`: Main app component, routes, auth checking, and layout

### What each backend folder does

- `routes/`: Defines API endpoints
- `controllers/`: Contains logic for signup, login, sending message, fetching messages
- `models/`: MongoDB schemas for User and Message
- `middlewares/`: Authentication checking
- `services/`: Helper services like Socket.IO setup, Cloudinary, token generation
- `index.js`: Starts the Express server

---

## 4. How To Run The Project

### Prerequisites

- Node.js installed
- npm installed
- MongoDB connection string
- Cloudinary account

### Environment Variables

Create a root `.env` file:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_ACCESS_TOKEN_SECRET=your_access_token_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

If frontend and backend are hosted separately, also use:

```env
VITE_API_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001
```

### Install dependencies

```bash
npm install --prefix backend
npm install --prefix frontend
```

### Run backend

```bash
npm run dev --prefix backend
```

### Run frontend

```bash
npm run dev --prefix frontend
```

Open:

```text
http://localhost:5173
```

---

## 5. Frontend Flow In React

This section explains how the React frontend works in this project from the beginning.

### 5.1 How React App Starts

In this project, React starts from `frontend/src/main.jsx`.

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

#### Simple explanation

- `document.getElementById('root')` finds the root div in `index.html`
- `createRoot(...).render(...)` tells React to show the app inside that div
- `<BrowserRouter>` enables routes like `/login`, `/signup`, `/profile`
- `<App />` is the main component of the frontend

#### Syntax breakdown

- `import` means bring code from another file/package
- `createRoot()` creates the React root
- `.render()` tells React what UI should appear
- JSX like `<App />` means "show this component"

#### Why it is used in this project

Without `main.jsx`, the React app cannot start. This file is the **entry point** of the frontend.

---

### 5.2 What Is JSX

#### Simple explanation

JSX means writing HTML-like code inside JavaScript.

Example:

```jsx
const title = <h1>Hello</h1>;
```

This looks like HTML, but it is actually JavaScript syntax that React understands.

#### Syntax breakdown

- `<h1>Hello</h1>` looks like HTML
- But React converts it behind the scenes into JavaScript
- JSX helps us build UI in a cleaner way

#### Example from this project

```jsx
<Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
```

#### What this means

- If user is not logged in, show `LoginPage`
- Otherwise redirect to home page

#### Why JSX is useful in this project

Because the chat UI has many dynamic parts:

- show login page or home page
- show selected chat or empty screen
- show online or offline user
- show sent or received message

---

### 5.3 Components In React

#### Simple explanation

A component is a small reusable part of UI.

In this project:

- `Navbar` shows the top navigation
- `Sidebar` shows users
- `ChatContainer` shows messages
- `MessageInput` lets user type and send messages

#### Functional component syntax

```jsx
const Navbar = () => {
  return <h1>Navbar</h1>;
};
```

#### Why components are used

If we put the whole app in one file, it becomes messy. Components help divide work into smaller parts.

#### Why it is used in this chat app

Because chat applications naturally have many separate UI parts:

- top bar
- left users panel
- message area
- input area
- auth pages

---

### 5.4 Props And Data Flow

#### Simple explanation

Props are values passed from one component to another.

Example:

```jsx
<AuthImagePattern
  title="Welcome back!"
  subtitle="Sign in to continue your conversations."
/>
```

Here:

- `title` is a prop
- `subtitle` is a prop

#### Syntax breakdown

- Parent sends data: `<Child name="Viraj" />`
- Child receives data:

```jsx
const Child = ({ name }) => {
  return <p>{name}</p>;
};
```

#### Data flow rule

React data normally flows **from parent to child**.

#### Why it is used in this project

Props are used to:

- pass text into auth illustration component
- pass dynamic values into reusable UI parts
- keep components flexible instead of hardcoding everything

---

### 5.5 State And Why It Is Used

#### Simple explanation

State means data that can change while the app is running.

Examples in this project:

- typed email/password
- selected user
- list of messages
- online users
- selected theme
- image preview before sending

#### Example

```jsx
const [text, setText] = useState("");
```

#### Syntax breakdown

- `text` is the current value
- `setText` updates the value
- `useState("")` means initial value is empty string

#### Why state is needed in this project

Because chat app UI changes all the time:

- when user types
- when a new message comes
- when another user comes online
- when chat partner changes
- when auth status changes

Without state, the UI would not update automatically.

---

### 5.6 Hooks In Detail

Hooks are special React functions used inside functional components.

#### A. `useState`

##### Simple explanation

Used for storing changing data inside a component.

##### Example from this project

```jsx
const [showPassword, setShowPassword] = useState(false);
const [formData, setFormData] = useState({
  email: "",
  password: "",
});
```

##### Why it is used here

- show/hide password
- store form values
- store typed message
- store image preview
- store local UI choices like online-only filter

##### Common update pattern

```jsx
onChange={(e) => setFormData({ ...formData, email: e.target.value })}
```

This means:

- take old object values
- update only `email`

---

#### B. `useEffect`

##### Simple explanation

`useEffect` runs code after the component renders.

It is mostly used for:

- fetching data
- running setup code
- subscribing to events
- cleaning up listeners

##### Example from `App.jsx`

```jsx
useEffect(() => {
  checkAuth();
}, [checkAuth]);
```

##### What it does

When app loads, it checks whether user is already logged in.

##### Example from chat container

```jsx
useEffect(() => {
  getMessages(selectedUser._id);
  subscribeToMessages();

  return () => unsubscribeFromMessages();
}, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);
```

##### What it does here

- load old messages of selected user
- start listening for new socket messages
- remove old socket listener when component changes/unmounts

##### Why it is used in this project

Because chat apps need side effects:

- load data from backend
- connect logic to UI lifecycle
- keep socket listeners updated

---

#### C. `useRef`

##### Simple explanation

`useRef` stores a value that stays between renders, but changing it does not re-render the component.

##### Example in this project

```jsx
const fileInputRef = useRef(null);
const messageEndRef = useRef(null);
```

##### Why `useRef` is used here

- `fileInputRef`: to open hidden file input from a button
- `messageEndRef`: to scroll to latest message automatically

##### Auto-scroll example

```jsx
useEffect(() => {
  if (messageEndRef.current && messages) {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);
```

##### Why this matters in a chat app

When a new message comes, user should see the latest message immediately.

---

### 5.7 Event Handling

#### Simple explanation

Event handling means reacting to user actions.

Common events in this project:

- `onClick`
- `onChange`
- `onSubmit`

#### Examples

##### Button click

```jsx
<button onClick={logout}>Logout</button>
```

When user clicks, logout function runs.

##### Input change

```jsx
onChange={(e) => setText(e.target.value)}
```

When user types in message box, state updates.

##### Form submit

```jsx
<form onSubmit={handleSendMessage}>
```

When user submits the form, message send logic runs.

#### Why event handling is important here

This app depends heavily on user actions:

- typing messages
- selecting user
- login/signup
- uploading image
- toggling settings

---

### 5.8 Forms Handling

Forms are used in:

- signup page
- login page
- message input

#### Example: login form

```jsx
const [formData, setFormData] = useState({
  email: "",
  password: "",
});
```

```jsx
<input
  type="email"
  value={formData.email}
  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
/>
```

#### Simple explanation

- input value is controlled by React state
- when user types, `onChange` updates state
- on submit, data goes to backend

#### Why controlled inputs are useful

Because React always knows the latest value of the form.

This helps with:

- validation
- sending API request
- clearing form after success

#### Example: message sending form

```jsx
const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!text.trim() && !imagePreview) return;

  await sendMessage({
    text: text.trim(),
    image: imagePreview,
  });
};
```

#### Why it is used in this project

Message input is also a form. It allows:

- text messages
- image messages
- prevent page reload
- clear fields after send

---

### 5.9 Conditional Rendering

#### Simple explanation

Conditional rendering means showing different UI based on a condition.

#### Examples from this project

##### Protect routes

```jsx
<Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
```

##### Show chat or empty screen

```jsx
{!selectedUser ? <NoChatSelected /> : <ChatContainer />}
```

##### Show loading spinner

```jsx
if (isCheckingAuth && !authUser) {
  return <Loader />;
}
```

#### Why it is used here

This chat app has many situations where UI must change:

- logged in vs not logged in
- chat selected vs no chat selected
- loading vs loaded
- image attached vs not attached
- online vs offline

---

### 5.10 Rendering Chat Messages

Messages are shown in `ChatContainer.jsx`.

```jsx
{messages.map((message) => (
  <div key={message._id}>
    {message.text && <p>{message.text}</p>}
  </div>
))}
```

#### Simple explanation

- `messages` is an array
- `.map()` loops over each message
- React creates UI for every message

#### Why `key` is used

```jsx
key={message._id}
```

React uses `key` to track each item efficiently.

#### Sent vs received message

This project checks whether message sender is current logged-in user:

```jsx
String(message.senderId?._id || message.senderId) === String(authUser?._id)
```

If true:

- message appears on right side

If false:

- message appears on left side

#### Why it is used in this project

This is how the app visually separates:

- my messages
- other user's messages

That is a core part of chat UI.

---

### 5.11 How UI Updates When New Message Comes

This is one of the most important parts of the project.

#### Step-by-step

1. User selects another user in sidebar
2. `ChatContainer` loads old messages using API
3. `subscribeToMessages()` starts listening on socket
4. When server sends `newMessage`, frontend receives it
5. Zustand store adds new message to `messages`
6. React re-renders automatically
7. New message appears on screen
8. `useEffect` with `messageEndRef` scrolls chat to bottom

#### Socket listener in store

```jsx
socket.on("newMessage", (newMessage) => {
  const senderId = newMessage.senderId?._id || newMessage.senderId;

  if (String(senderId) !== String(selectedUser._id)) return;

  set({
    messages: [...get().messages, newMessage],
  });
});
```

#### Why this works

- socket receives event instantly
- store updates state
- React sees state change
- component re-renders automatically

This is the heart of a real-time app.

---

### 5.12 API Calls In Frontend

This project uses **Axios** for HTTP requests.

#### Axios setup

```jsx
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
```

#### Authorization token

```jsx
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

#### Simple explanation

- Every request uses same base URL
- Token is automatically attached
- Frontend does not have to write token manually every time

#### API calls used in this project

- `POST /auth/signup`
- `POST /auth/signin`
- `GET /auth/check-auth`
- `PUT /auth/update-profile`
- `GET /message/users`
- `GET /message/:id`
- `POST /message/send/:id`

#### Why API is still needed if Socket.IO exists

Socket.IO is used for **instant updates**.

HTTP API is still used for:

- signup/login
- loading old messages
- loading users list
- profile updates
- sending message to backend so it can save in database

---

### 5.13 Styling Approach

This project uses:

- Tailwind CSS
- DaisyUI

#### Evidence from the code

```css
@import "tailwindcss";
@plugin "daisyui" {
  themes: all;
}
```

#### Simple explanation

- Tailwind gives utility classes like `flex`, `p-4`, `rounded-lg`
- DaisyUI gives ready-made component classes like `btn`, `input`, `chat-bubble`

#### Example

```jsx
<input className="w-full input input-bordered rounded-lg input-sm sm:input-md" />
```

#### Why it is used in this project

It makes UI building faster.

For a chat app, this helps create:

- message bubbles
- buttons
- input boxes
- responsive layouts
- theme support

---

## 6. React App Flow In This Project

Here is the frontend flow in simple order:

1. `main.jsx` starts React app
2. `BrowserRouter` enables routes
3. `App.jsx` runs
4. `App.jsx` calls `checkAuth()` using `useEffect`
5. If user is logged in, home page opens
6. Sidebar loads available users
7. User clicks a contact
8. `selectedUser` is stored in Zustand
9. `ChatContainer` fetches old messages
10. Socket listener starts for live messages
11. User types message in `MessageInput`
12. Message goes to backend
13. Backend saves it and emits socket event
14. Receiver gets new message instantly
15. UI updates automatically

---

## 7. Zustand In This Project

This project uses Zustand instead of Redux.

### Simple explanation

Zustand is a small library for global state management.

### Stores in this project

- `useAuthStore`
- `useChatStore`
- `useThemeStore`

### Why Zustand is used here

Because some data is needed in many components:

- logged-in user
- socket connection
- online users
- selected user
- messages
- theme

### Example

```jsx
const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
```

This allows any component to directly access shared state.

---

## 8. Socket.IO Complete Explanation

### 8.1 What Is Socket.IO

#### Simple explanation

Socket.IO is a library that allows **real-time two-way communication** between client and server.

That means:

- client can send data to server instantly
- server can also send data to client instantly

This is perfect for chat applications.

---

### 8.2 Why Use Socket.IO Instead Of Normal HTTP

#### HTTP works like this

- client sends request
- server sends response
- connection ends

This is good for:

- login
- signup
- loading old data

#### Problem with HTTP for chat

If we only use HTTP, frontend would need to ask repeatedly:

- "Any new message?"
- "Any new message now?"
- "Any new message now?"

This is inefficient.

#### Why Socket.IO is better

With Socket.IO:

- connection stays active
- server can push new messages instantly
- receiver sees message immediately

That is why real-time chat apps use sockets.

---

### 8.3 How Connection Is Established

#### Client side

In this project, socket is created inside `useAuthStore`.

```jsx
const socket = io(SOCKET_URL, {
  auth: {
    token,
  },
});
```

#### Server side

In backend:

```js
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
  socket.userId = decoded.userId;
  next();
});
```

#### Simple explanation

- frontend connects using `io()`
- token is sent in handshake
- server verifies token
- server attaches `userId` to socket
- connection becomes authenticated

#### Why this is used in your project

So only logged-in users can connect to real-time chat.

---

### 8.4 Important Socket.IO Methods

#### A. `io()`

Used on client side to connect to socket server.

```jsx
const socket = io("http://localhost:5001", {
  auth: { token },
});
```

##### Why used here

To start real-time connection after login or auth check.

---

#### B. `socket.on()`

Used to listen for an event.

```jsx
socket.on("newMessage", (newMessage) => {
  console.log(newMessage);
});
```

##### Why used here

To receive:

- `newMessage`
- `getOnlineUsers`

---

#### C. `socket.emit()`

Used to send a custom event from one side to another.

Example syntax:

```js
socket.emit("typing", { userId: "123" });
```

##### Important note for this project

Your current project mainly sends messages through **HTTP API** and uses Socket.IO to **deliver real-time updates**.

So in this codebase:

- frontend does not directly use `socket.emit("sendMessage")`
- backend sends real-time result after saving message

This is also a valid design.

---

#### D. `socket.broadcast.emit()`

#### Simple explanation

This sends an event to everyone **except the current socket**.

Example syntax:

```js
socket.broadcast.emit("userJoined", userData);
```

#### Important note for this project

Your project does **not** use `socket.broadcast.emit()` directly.

Instead, it uses:

```js
io.emit("getOnlineUsers", Object.keys(userSocketMap));
```

and

```js
io.to(receiverSocketId).emit("newMessage", populatedMessage);
```

That means:

- online user list goes to everyone
- new message goes only to the receiver

This is better for private chat.

---

### 8.5 Rooms / Private Chats

#### Does this project use rooms?

No, this project does **not** use Socket.IO rooms.

#### Then how private chat is handled?

It uses a map:

```js
const userSocketMap = {};
```

When a user connects:

```js
userSocketMap[userId] = socket.id;
```

When sending a message:

```js
const receiverSocketId = getReceiverSocketId(receiverId);

if (receiverSocketId) {
  io.to(receiverSocketId).emit("newMessage", populatedMessage);
}
```

#### Simple explanation

The server remembers:

- which user
- is connected on which socket id

Then it sends message only to that user.

#### Why this is enough here

Because your app is currently **one-to-one private chat**, not group chat.

---

### 8.6 Event Flow Of Sending And Receiving Messages

Here is the exact flow in this project.

#### Step 1: User types message

In `MessageInput.jsx`, user types text or selects image.

#### Step 2: Form submit happens

`handleSendMessage()` runs.

#### Step 3: Frontend sends HTTP request

```jsx
await sendMessage({
  text: text.trim(),
  image: imagePreview,
});
```

Inside Zustand:

```jsx
await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData)
```

#### Step 4: Backend controller saves message

In `message.controller.js`:

- receive `text` and `image`
- upload image to Cloudinary if needed
- create new message in MongoDB
- populate sender and receiver data

#### Step 5: Backend finds receiver socket

```js
const receiverSocketId = getReceiverSocketId(receiverId);
```

#### Step 6: Backend emits real-time event

```js
io.to(receiverSocketId).emit("newMessage", populatedMessage);
```

#### Step 7: Receiver frontend listens

```jsx
socket.on("newMessage", (newMessage) => {
  set({
    messages: [...get().messages, newMessage],
  });
});
```

#### Step 8: React re-renders UI

Since `messages` state changed, UI updates automatically.

---

### 8.7 Real-Time Message Update Step By Step

This is the most important explanation for viva.

1. Sender writes message
2. React stores text in component state
3. Form submit triggers send logic
4. Frontend sends message to backend API
5. Backend saves message in database
6. Backend checks if receiver is online
7. If online, server emits `newMessage`
8. Receiver socket gets event instantly
9. Zustand updates `messages`
10. React re-renders chat list
11. `useEffect` scrolls to latest message
12. Receiver sees message without refreshing page

---

## 9. Backend Flow Brief Explanation

### 9.1 Express Server Setup

Backend starts from `backend/src/index.js`.

Main work done there:

- create server using Express app from socket service
- load environment variables
- connect MongoDB
- enable JSON parsing
- enable cookies
- enable CORS
- register routes
- serve frontend in production
- start listening on port

#### Important idea

The project uses:

```js
import { app, server } from './services/socket.js'
```

This means Express and Socket.IO are connected through the same HTTP server.

---

### 9.2 API Routes

#### Auth routes

- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `GET /api/auth/logout`
- `PUT /api/auth/update-profile`
- `GET /api/auth/check-auth`

#### Message routes

- `GET /api/message/users`
- `GET /api/message/:id`
- `POST /api/message/send/:id`

#### Why routes are needed

Routes define what action should happen when frontend hits a URL.

Example:

- `/api/auth/signin` -> login logic
- `/api/message/:id` -> fetch chat history

---

### 9.3 Socket Server Integration

Socket setup is inside `backend/src/services/socket.js`.

#### Main responsibilities

- create socket server
- authenticate socket user with JWT
- store connected users in `userSocketMap`
- send online users list
- send real-time message events

#### Why this is important

Because Express handles normal API requests, while Socket.IO handles live communication.

Both work together in this project.

---

## 10. Full Data Flow Explanation

### User types message -> frontend -> socket/server -> broadcast/update -> frontend

Here is the complete practical flow for this app:

1. User selects a contact from sidebar
2. React stores that person in `selectedUser`
3. Old chat history is fetched using API
4. User types in message input
5. `useState` updates `text`
6. User clicks send
7. `handleSendMessage` prevents page reload
8. Zustand `sendMessage()` sends POST request to backend
9. Backend saves message in MongoDB
10. Backend checks socket id of receiver
11. Backend emits `newMessage` to receiver
12. Receiver frontend already has `socket.on("newMessage")`
13. Zustand adds message to messages array
14. React re-renders message list
15. Chat window auto-scrolls to latest message

#### Important note

In this project, the actual message creation happens through **HTTP**, and the instant UI update for the receiver happens through **Socket.IO**.

So you can explain it like this in viva:

> HTTP is used to save the message reliably in database, and Socket.IO is used to instantly notify the receiver.

---

## 11. Authentication Flow

This is also important for understanding the project.

### Signup/Login flow

1. User enters form data
2. Frontend sends request to backend
3. Backend validates input
4. Password is hashed with bcrypt
5. Backend creates or verifies user
6. Backend returns access token
7. Refresh token is stored in HTTP-only cookie
8. Access token is stored in `sessionStorage`
9. Frontend calls `connectSocket()`
10. User enters protected chat area

### Why both cookie and sessionStorage are used

- access token is used by frontend for API and socket auth
- refresh token cookie is more secure and handled by browser

---

## 12. Important Frontend Files Explained

### `main.jsx`

- starts React app
- attaches app to DOM
- wraps app in router

### `App.jsx`

- checks auth on load
- handles routing
- protects routes
- loads navbar and toaster

### `useAuthStore.js`

- stores logged-in user
- stores socket connection
- handles signup, login, logout
- handles auth checking
- listens for online users

### `useChatStore.js`

- stores selected user
- stores message list
- fetches users
- fetches messages
- sends message
- subscribes to socket event for new message

### `Sidebar.jsx`

- fetches users
- lets user choose chat partner
- shows online/offline status

### `ChatContainer.jsx`

- loads messages of selected user
- listens for live messages
- renders message bubbles
- scrolls to latest message

### `MessageInput.jsx`

- handles text input
- handles image selection
- sends message on submit
- clears form after sending

---

## 13. Important Backend Files Explained

### `index.js`

- starts server
- adds middleware
- registers routes
- connects database

### `auth.route.js`

- defines auth-related URLs

### `message.route.js`

- defines chat-related URLs

### `auth.controller.js`

- signup
- signin
- logout
- profile update
- auth checking

### `message.controller.js`

- get users for sidebar
- get messages between two users
- send message

### `socket.js`

- creates Socket.IO server
- authenticates socket
- stores connected users
- emits online user updates

### `auth.middleware.js`

- checks JWT token
- protects private routes

---

## 14. What Is Important Vs Not Important For Viva

### Very Important

- What React component is
- What JSX is
- Difference between props and state
- Why `useState` is used
- Why `useEffect` is used
- Why `useRef` is used in chat scroll/file input
- Controlled forms in React
- Conditional rendering
- How messages are rendered using `.map()`
- How Zustand stores shared state
- Why Socket.IO is used for real-time updates
- Difference between HTTP and real-time communication
- How sender message reaches receiver
- How backend saves message in MongoDB
- How JWT authentication works in this project
- How online users are tracked

### Important But You Do Not Need Too Much Depth

- Exact DaisyUI class names
- Exact Tailwind utility names
- Exact icon package details
- Every single package version
- Deep internal details of Vite
- Deep internals of React StrictMode
- Cloudinary internal working
- Low-level JWT cryptography details

### One-line viva strategy

Focus more on:

- **flow**
- **reason**
- **how data moves**

Do not focus too much on:

- memorizing every line of code

---

## 15. Interview / Viva Questions With Answers

### React Questions

#### 1. What is React?

React is a JavaScript library used to build user interfaces using reusable components.

#### 2. What is JSX?

JSX is HTML-like syntax written inside JavaScript. React uses it to describe UI in an easier way.

#### 3. What is a component?

A component is a reusable piece of UI, such as Navbar, Sidebar, or MessageInput.

#### 4. What is the difference between props and state?

- Props are passed from parent to child
- State is managed inside a component or store and can change over time

#### 5. Why use `useState`?

To store changing values like input text, password visibility, image preview, and filter choices.

#### 6. Why use `useEffect`?

To run side effects like checking auth, fetching messages, fetching users, and subscribing to socket events.

#### 7. Why use `useRef` in this project?

To access DOM elements directly, such as hidden file input and scrolling to latest message.

#### 8. What is conditional rendering?

It means showing different UI based on a condition, like login page vs home page.

#### 9. How are messages rendered in React?

Using `.map()` on the messages array and returning JSX for each message.

#### 10. Why is Zustand used?

To manage shared state like auth user, socket, online users, selected user, and messages.

---

### Socket.IO Questions

#### 1. What is Socket.IO?

Socket.IO is a library for real-time two-way communication between client and server.

#### 2. Why use Socket.IO in a chat app?

Because messages should appear instantly without refreshing the page.

#### 3. Why not use only HTTP?

HTTP is request-response based. It is not efficient for instant continuous updates.

#### 4. How does client connect to socket server?

Using `io(SOCKET_URL, { auth: { token } })`.

#### 5. What does `socket.on()` do?

It listens for an event sent from server or client.

#### 6. What does `socket.emit()` do?

It sends an event with data.

#### 7. What does `socket.broadcast.emit()` do?

It sends an event to everyone except the current socket.

#### 8. Does this project use rooms?

No. It uses a user-to-socket map for private one-to-one messaging.

#### 9. How does receiver get message instantly?

Backend finds receiver socket id and emits `newMessage` to that specific socket.

#### 10. How are online users tracked?

When a user connects, server stores `userId -> socket.id` and emits updated online users list.

---

### Architecture Questions

#### 1. What is the frontend responsibility in this project?

Showing UI, managing user actions, calling APIs, connecting socket, and updating screen when state changes.

#### 2. What is the backend responsibility?

Handling authentication, saving messages, fetching users/messages, and managing real-time socket communication.

#### 3. How is authentication handled?

Using JWT access token, refresh token cookie, and protected routes middleware.

#### 4. How does this project support private chat?

Server sends message only to the receiver's socket id using `io.to(receiverSocketId).emit(...)`.

#### 5. Where is old chat history stored?

In MongoDB.

#### 6. Where are images stored?

In Cloudinary.

#### 7. What is the complete message flow?

Frontend form -> API request -> database save -> socket emit -> receiver state update -> React re-render.

---

## 16. Common Code Snippets To Remember

### React state

```jsx
const [text, setText] = useState("");
```

### React effect

```jsx
useEffect(() => {
  checkAuth();
}, [checkAuth]);
```

### Controlled input

```jsx
<input value={text} onChange={(e) => setText(e.target.value)} />
```

### Conditional rendering

```jsx
{!selectedUser ? <NoChatSelected /> : <ChatContainer />}
```

### List rendering

```jsx
{messages.map((message) => (
  <div key={message._id}>{message.text}</div>
))}
```

### Socket connection

```jsx
const socket = io(SOCKET_URL, {
  auth: { token },
});
```

### Listen for event

```jsx
socket.on("newMessage", (data) => {
  console.log(data);
});
```

### Backend emit

```js
io.to(receiverSocketId).emit("newMessage", populatedMessage);
```

---

## 17. Summary

This project is a very good example of a **full-stack real-time chat app**.

### On the frontend, you learn:

- React app starting flow
- JSX
- components
- props
- state
- hooks
- forms
- conditional rendering
- API handling
- UI updates

### On the backend, you learn:

- Express server setup
- routes and controllers
- middleware
- MongoDB storage
- JWT auth

### In real-time communication, you learn:

- why Socket.IO is needed
- how client connects
- how server authenticates socket
- how messages are delivered instantly
- how online users are tracked

If you can explain the **message flow clearly** and the **reason for using React + Express + Socket.IO together**, you will be in a strong position for viva and interview discussion.
