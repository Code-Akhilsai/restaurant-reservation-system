# TableEase — Restaurant Reservation Management System

TableEase is a full-stack restaurant reservation management system. Customers can register, log in, book tables, view their reservations, and cancel bookings. Administrators have a separate dashboard to view, update, and cancel all customer reservations.

## Live Links

* Frontend: `https://tableease1.netlify.app`
* Backend: `https://restaurant-reservation-system-wq5q.onrender.com`

## Features

### Customer Features

* Register as a customer
* Login with JWT authentication
* Book a restaurant table
* Select reservation date, time, members, and optional notes
* Automatically receive an available table
* View personal reservations
* Cancel confirmed reservations
* Prevent duplicate table bookings for the same date and time

### Admin Features

* Separate admin dashboard
* View all customer reservations
* View customer name, email, table number, date, time, members, and status
* Update reservation date, time, members, and notes
* Automatically assign an available table when a reservation is updated
* Cancel any confirmed reservation

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcryptjs

### Deployment

* Frontend: Netlify
* Backend: Render
* Database: MongoDB Atlas

## Authentication

The application uses JWT authentication.

After login, the backend returns a JWT token. The frontend stores the token in localStorage and sends it in the Authorization header for protected API requests.

```text
Authorization: Bearer <token>
```

The application supports two roles:

* `customer`
* `admin`

New registrations are created as customers by default. Admin role is assigned manually in MongoDB Atlas for the demo environment.

## Reservation Logic

The restaurant has 9 fixed tables seeded programmatically in MongoDB.

Each table has a capacity of 4 members.

When a customer creates a reservation:

1. The customer selects date, time, and number of members.
2. The backend finds tables with enough capacity.
3. Already confirmed bookings for the same date and time are checked.
4. Booked tables are excluded.
5. The first available table is assigned.
6. If no table is available, the API returns a `409 Conflict` response.

The system also uses a unique compound index to prevent duplicate confirmed bookings for the same table, date, and time.

```text
table + reservationDate + timeSlot
```

Cancelled reservations do not block the table from being booked again.

## API Endpoints

### Authentication

| Method | Endpoint             | Description                 |
| ------ | -------------------- | --------------------------- |
| POST   | `/api/auth/register` | Register a customer account |
| POST   | `/api/auth/login`    | Login and receive JWT token |

### Customer Booking APIs

| Method | Endpoint                               | Description                         |
| ------ | -------------------------------------- | ----------------------------------- |
| POST   | `/api/auth/bookings`                   | Create a reservation                |
| GET    | `/api/auth/myreservations`             | Get logged-in customer reservations |
| PATCH  | `/api/auth/bookings/:bookingId/cancel` | Cancel own reservation              |

### Admin Booking APIs

| Method | Endpoint                                     | Description            |
| ------ | -------------------------------------------- | ---------------------- |
| GET    | `/api/auth/admin/bookings`                   | Get all reservations   |
| PATCH  | `/api/auth/admin/bookings/:bookingId`        | Update a reservation   |
| PATCH  | `/api/auth/admin/bookings/:bookingId/cancel` | Cancel any reservation |

## Local Setup

### Clone the Repository

```bash
git clone https://github.com/Code-Akhilsai/restaurant-reservation-system.git
cd restaurant-reservation-system
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECREATE_KEY=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

### Seed Tables

Run this once to seed 9 restaurant tables:

```bash
node seedTables.js
```

### Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_BACKEND_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

## Demo Credentials

### Customer Account

```text
Email: customerdemo@gmail.com
Password: demo12345
```

### Admin Account

```text
Email: admin@gmail.com
Password: 12345678
```

## Deployment Configuration

### Netlify

Build command:

```bash
cd restaurant-reservation-system/frontend && npm install && npm run build
```

Publish directory:

```text
restaurant-reservation-system/frontend/dist
```

Netlify environment variable:

```env
VITE_BACKEND_URL=https://restaurant-reservation-system-wq5q.onrender.com
```

For React Router deployment, this file is included:

```text
frontend/public/_redirects
```

```text
/* /index.html 200
```

### Render

Root directory:

```text
restaurant-reservation-system/backend
```

Build command:

```bash
npm install
```

Start command:

```bash
npm start
```

Render environment variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECREATE_KEY=your_jwt_secret
```

## Assumptions

* The system manages one restaurant.
* The restaurant contains 9 fixed tables.
* Each table supports up to 4 members.
* A reservation supports 1 to 4 members.
* Public registration creates customer accounts only.
* Admin accounts are assigned manually for the demo.
* Customers can only view and cancel their own reservations.
* Admins can view, update, and cancel all reservations.

## Future Improvements

* Add search and date filters to the admin dashboard
* Add pagination for reservations
* Add customer profile page
* Add password reset and email verification
* Add email or SMS reservation notifications
* Add real-time booking updates
* Add unit and integration tests
* Add admin table management
* Add Docker and CI/CD support

## Security Notes

* Passwords are hashed using bcryptjs.
* JWT is used for authentication.
* Protected APIs require a Bearer token.
* Admin APIs are protected by admin middleware.
* MongoDB URI and JWT secret are stored in environment variables.
* `.env` files should not be committed to GitHub.
