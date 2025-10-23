Express-rest-api
Express.js RESTful API — Full Project

This document contains a complete Express.js RESTful API project you can drop into your GitHub Classroom repo. It includes all files, middleware, routes, error handling, and README instructions.

File tree
express-rest-api/
├─ server.js
├─ package.json
├─ .env.example
├─ README.md
├─ routes/
│  └─ products.js
├─ middleware/
│  ├─ logger.js
│  ├─ auth.js
│  ├─ validateProduct.js
│  └─ asyncHandler.js
├─ errors/
│  └─ customErrors.js
└─ data/
   └─ store.js
README.md (instructions)
# Express RESTful API — Products


## Requirements
- Node.js v18+
- npm


## Install
```bash
npm install
Environment

Create a .env file from .env.example and set API_KEY.

Run
npm start
# or for dev
npm run dev
API Endpoints

GET / — Hello World

GET /api/products — list products (supports category, q for search, page, limit)

GET /api/products/:id — get product by id

POST /api/products — create product (requires x-api-key header)

PUT /api/products/:id — update product (requires x-api-key header)

DELETE /api/products/:id — delete product (requires x-api-key header)

GET /api/products/stats — product count grouped by category

Notes

This project uses an in-memory store (data/store.js). Swap to a DB in production.

Validation errors return 400; NotFound errors return 404; Auth errors return 401.