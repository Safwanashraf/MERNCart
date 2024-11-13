# E-commerce Project

## Description

This is a full-stack E-commerce application built using React.js for the frontend and Node.js with Express for the backend. The application utilizes MongoDB as the database and includes features such as user authentication, product management, and a shopping cart.

## Features

- User registration and authentication
- Product listing and details
- Shopping cart functionality
- File uploads using Multer
- Responsive design

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (using Mongoose)
- **Other Libraries**: CORS, Multer, JWT, ESLint, etc.

## Installation

### Prerequisites

- Node.js(version 16.0 or higher)
- MongoDB(version 4.4 or higher)
- Git

### Clone the Repository

```bash
git clone https://github.com/Safwanashraf/MERNCart.git
cd your-repo-name# E-commerce Project
```

### 2. Install Dependencies:

```bash
cd backend
npm install

cd ../frontend
npm install  

cd ../admin
npm install
```

### 3. Set Up Environment Variables:

```bash
Backend: Create a .env file in the backend directory and add the following:
URI=your_mongodb_connection_string
SECRET=your_jwt_secret_key
```

### 4. Run the Applications:

Backend:

```bash
cd backend
node index.js
```

Frontend:

```bash
cd ../frontend
npm start
```

Admin Panel:

```bash
cd ../admin
npm run dev
```
