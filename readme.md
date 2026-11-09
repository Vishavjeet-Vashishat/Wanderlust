🌍 Wanderlust — Tour Management REST API

A RESTful backend application for managing tours, built using Node.js, Express.js and MongoDB. Wanderlust demonstrates backend development concepts, RESTful API design, database integration and modular application architecture usig MVC architecture.

🚀 Tech Stack

- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB, Mongoose
- Authentication: JSON Web Tokens (JWT), bcryptjs
- Payments: Razorpay
- Email: Nodemailer
- File Handling: Multer, Sharp
- Security: Helmet, express-rate-limit, express-mongo-sanitize
- Code Quality: ESLint, Prettier

📁 Project Structure
Wanderlust/

│

├── controllers/

├── dev-data/

├── models/

├── postman/

├── public/

├── routes/

├── utils/

├── .env.example/

├── .eslintrc.json

├── .gitignore

├── .prettierrc

├── app.js

├── package-lock.json

├── package.json

└── readme.md

├── server.js

⚙️ Installation & Setup

Prerequisites

- Node.js
- npm
- MongoDB Atlas account or local MongoDB installation
- Git

1. Clone the Repository

git clone https://github.com/Vishavjeet-Vashishat/Wanderlust.git

2. Navigate to the Project Directory

cd Wanderlust

3. Install Dependencies

npm install

4. Configure Environment Variables

Create a .env file in the root directory of the project.

Use .env.example as a reference and configure the variables:

5. Start the Development Server

npm start

The application should be available at:

http://localhost:3000

📡 API Testing

API endpoints can be tested using Postman⁠.

A Postman collection JSON file will be provided in the repository to test API.

How to use:

1. Download the collection JSON file.
2. Open Postman and click Import.
3. Select the downloaded JSON file.
4. Start the backend server and configure the base URL (http://localhost:3000/api/v1).
5. Import and test the available API requests.

👨‍💻 Author

Vishavjeet Vashisht
