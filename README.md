
# Event Management System

## Project Description

This project is a React-based Event Management System.

The application allows users to explore real events, search and filter events, view event details, register for events, and manage their registrations.

Event information is fetched from the Ticketmaster Discovery API.

## Technologies Used

- React.js
- JavaScript
- HTML and CSS
- Redux Toolkit
- React Redux
- React Router
- Ticketmaster Discovery API
- Local Storage
- Vite
- Git and GitHub

## Features

### 1. User Authentication
- User registration with name, email, and password
- Login and logout
- Form validation
- Duplicate email prevention
- Login persistence using Local Storage
- Frontend-only authentication simulation

### 2. Event Exploration
- Display real events using the Ticketmaster API
- Search events by keyword
- Filter events by category
- Explore today's remaining and upcoming events
- Display events in chronological order
- Responsive event cards

### 3. Event Details
- Event name and image
- Date and time
- Venue and location
- Event category
- Additional available event information
- Event details accessible without login

### 4. Event Registration
- Logged-in users can register for events
- Duplicate registration prevention
- Registration confirmation
- Cancel event registration
- User-specific registrations

### 5. My Events
- View registered events
- Separate upcoming and completed events
- Cancel upcoming registrations
- Save registration data using Local Storage

### 6. Responsive Design
- Responsive navigation
- Event cards using CSS Flexbox
- Mobile-friendly forms and layouts
- CSS media queries

## Project Structure

```text
src/
├── app/
│   └── store.js
├── features/
│   ├── auth/
│   │   └── authSlice.js
│   ├── events/
│   │   └── eventsSlice.js
│   └── registrations/
│       └── registrationsSlice.js
├── pages/
│   ├── Register.jsx
│   ├── Login.jsx
│   ├── Events.jsx
│   ├── EventDetails.jsx
│   └── MyEvents.jsx
├── services/
│   └── ticketmasterApi.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## State Management

Redux Toolkit manages the application's shared state.

The application uses three slices:

- **authSlice:** User authentication and login state
- **eventsSlice:** Event data, loading status, and errors
- **registrationsSlice:** User-specific event registrations and cancellations

The application demonstrates the use of `configureStore`, `createSlice`, actions, reducers, `useSelector`, and `useDispatch`.


## How to Run the Project

1. Clone or download the GitHub repository.
2. Open the project folder in VS Code.
3. Open the terminal and install dependencies:

   npm install

4. Create a .env file in the project folder and add:

   VITE_TICKETMASTER_API_KEY=YOUR_API_KEY

5. Start the application:

   npm run dev

6. Open http://localhost:5173/ in the browser.

Note: A Ticketmaster API key is required to fetch events.
Do not upload the .env file to GitHub.

