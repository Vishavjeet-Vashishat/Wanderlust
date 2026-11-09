🌍 Wanderlust — Tour Management REST API

A RESTful backend application for managing tours, built using Node.js, Express.js and MongoDB. Wanderlust demonstrates backend development concepts, RESTful API design, database integration and modular application architecture.

🚀 Tech Stack

- Runtime: Node.js
- Backend Framework: Express.js
- Database: MongoDB
- ODM: Mongoose
- Language: JavaScript (ES6+)
- Environment Variables: dotenv
- HTTP Request Logging: Morgan
- Development Tool: Nodemon

✨ Features

- RESTful API architecture using Express.js.
- Modular application structure with separate routes, controllers and models.
- Tour and user resource management.
- MongoDB integration using Mongoose.
- Advanced API filtering and sorting.
- Field limiting for optimized API responses.
- Pagination for efficient data retrieval.
- Centralized error-handling middleware.
- Custom error handling and asynchronous error management.
- Environment-based configuration.

📁 Project Structure
Wanderlust/

│

├── controllers/

├── models/

├── routes/

├── utils/

├── public/

│

├── postman/

│ └── Wanderlust.postman_collection.json

│

├── app.js

├── server.js

├── package.json

├── package-lock.json

├── .env.example

├── .gitignore

└── README.md

⚙️ Installation & Setup

Prerequisites

- Node.js
- npm
- MongoDB Atlas account or local MongoDB installation
- Git

1. Clone the Repository

git clone YOUR_GITHUB_REPOSITORY_URL

2. Navigate to the Project Directory

cd Wanderlust

3. Install Dependencies

npm install

4. Configure Environment Variables

Create a .env file in the root directory.

Replace the placeholder database connection string with your MongoDB connection URI.

5. Start the Development Server

npm run dev

The application should be available at:

http://localhost:3000

📡 API Documentation & Testing

The API endpoints can be explored and tested using the Postman collection included in this repository.

Postman Collection: postman/Wanderlust.postman_collection.json

The collection contains API requests organized by resource, including request methods, parameters and example payloads.

Running API Requests

1. Clone the repository and install the dependencies.
2. Configure the required environment variables.
3. Start the local Express server.
4. Import the Postman collection into Postman.
5. Configure the base URL.
6. Execute the API requests.

Local API Base URL:
http://localhost:3000/api/v1

🧠 Concepts Demonstrated

- Node.js runtime and asynchronous programming.
- Express.js middleware architecture.
- RESTful API design principles.
- MVC (Model-View-Controller) architecture.
- MongoDB and Mongoose.
- Database querying and filtering.
- Sorting, field limiting and pagination.
- Centralized error handling.
- Environment variable management.
- JavaScript ES Modules (ESM).

🔐 Security & Configuration

- Environment variables for sensitive configuration.
- Database connection through Mongoose.
- Centralized error handling.
- Separation of application configuration and server initialization.

👨‍💻 Author

Vishavjeet Vashisht
