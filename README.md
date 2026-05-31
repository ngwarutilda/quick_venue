# QuickVenue Backend API
Smart Venue Finder for the University of Buea

## Setup

1. Clone the repo and install dependencies:
```bash
npm install
```

2. Create your `.env` file:
```bash
cp .env.example .env
```

3. Seed the database with sample data:
```bash
npm run seed
```

4. Start the development server:
```bash
npm run dev
```

Server runs on: `http://localhost:5000`

---

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login | No |
| GET | /api/auth/me | Get current user | Yes |

### Rooms
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/rooms | Get all rooms | No |
| GET | /api/rooms/available?day=Monday&startTime=08:00&endTime=10:00&capacity=50 | Get available rooms | No |
| GET | /api/rooms/:id | Get room + schedule | No |
| POST | /api/rooms | Add a room | Admin |
| PUT | /api/rooms/:id | Update a room | Admin |
| DELETE | /api/rooms/:id | Delete a room | Admin |

### Timetable
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/timetable | Get all entries | No |
| POST | /api/timetable | Add entry | Admin |
| PUT | /api/timetable/:id | Update entry | Admin |
| DELETE | /api/timetable/:id | Delete entry | Admin |

### Recommendation
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/recommend?day=Monday&startTime=08:00&endTime=10:00&capacity=50 | Get best room | No |

---

## Default Admin Login
- Email: `admin@quickvenue.ub.cm`
- Password: `admin123`

## Docker
```bash
docker-compose up --build
```
