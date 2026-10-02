# Syntecxhub_Data_Analytics_API

This is my Week 3 Project 2 for the Syntecxhub Backend Development internship.

I built a Data Analytics API using Node.js, Express, and MongoDB. Posts can be created and listed, and an analytics endpoint uses the aggregation pipeline to return counts and sums.

## How it works

- `server.js` starts the server and connects to MongoDB
- `app.js` sets up Express and the routes
- `routes` maps each URL to a controller function
- `controllers/postController.js` has the create, get, update, and delete logic
- `controllers/analyticsController.js` runs the aggregation pipeline
- `models` defines a post (title, category, author, views, date)
- `middleware` handles errors and unknown routes

The analytics endpoint filters with `$match`, groups with `$group`, and shapes the result with `$project`.

## Setup

1. Run `npm install`
2. Add your values in a `.env` file:

```
PORT=3000
MONGO_URI=your_connection_string
```

3. Run `npm run seed` to load sample posts
4. Run `npm start`

## Endpoints

- `POST /api/posts` — create a post
- `GET /api/posts` — get all posts (optional `author` and `category` query filters)
- `GET /api/posts/:id` — get one post
- `PUT /api/posts/:id` — update a post
- `DELETE /api/posts/:id` — delete a post
- `GET /api/analytics` — counts and total views, grouped by category and by month

### Analytics filters

All of these are optional and can be combined:

```
GET /api/analytics?author=Fazil
GET /api/analytics?category=tech
GET /api/analytics?startDate=2026-01-01&endDate=2026-04-30
GET /api/analytics?author=Fazil&startDate=2026-01-01&endDate=2026-09-30
```

`summary` is the overall count and sum of views. `byCategory` is the number of posts and views in each category. `byMonth` is the number of posts and views in each month.

I tested everything using Postman.
