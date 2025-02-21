
# Time Table Manager

The **Time Table Manager** is a web application designed to help users manage their schedules and events efficiently. This repository contains the frontend and backend code for the application.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Frontend](#frontend)
- [Backend](#backend)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure login and registration system.
- **Schedule Management**: Create, update, and delete schedules.
- **Event Management**: Add, modify, and remove events.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **RESTful APIs**: Backend APIs for frontend integration.
- **Database Integration**: Persistent storage for schedules and user data.

## Technologies Used

### Frontend
- **React.js**: A JavaScript library for building user interfaces.
- **Redux**: State management for React applications.
- **Axios**: HTTP client for making API requests.
- **Tailwind CSS**: A utility-first CSS framework for styling.

### Backend
- **Node.js**: Runtime environment for the backend.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT**: JSON Web Tokens for user authentication.

## Setup and Installation

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB installed or a connection string to a remote MongoDB instance.

### Steps to Run the Project

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KabiraEttalbi/Time-Table-Manager.git
   cd Time-Table-Manager
   ```

2. **Install dependencies for both frontend and backend**:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the `backend` directory and add the following variables:
     ```
     PORT=3000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```
   - Create a `.env` file in the `frontend` directory and add the following variable:
     ```
     REACT_APP_API_URL=http://localhost:3000
     ```

4. **Run the backend server**:
   ```bash
   cd backend
   npm start
   ```

5. **Run the frontend application**:
   ```bash
   cd frontend
   npm start
   ```

6. **Access the application**:
   - The backend will be running at `http://localhost:3000`.
   - The frontend will be running at `http://localhost:3001`.

## Frontend

The frontend is built using **React.js** and **Tailwind CSS**. It provides a user-friendly interface for managing schedules and events.

### Key Features
- **Responsive Design**: Works on all screen sizes.
- **State Management**: Uses Redux for managing application state.
- **API Integration**: Communicates with the backend using Axios.

## Backend

The backend is built using **Node.js** and **Express.js**. It provides RESTful APIs for the frontend to interact with.

### Key Features
- **User Authentication**: Uses JWT for secure user authentication.
- **Database Integration**: Uses MongoDB for storing data.
- **API Endpoints**: Well-structured APIs for CRUD operations.
- 
### Example Endpoints

- **User Registration**:
  ```
  POST /auth/register
  ```

- **User Login**:
  ```
  POST /auth/login
  ```

- **Create Schedule**:
  ```
  POST /emploi-du-temps
  ```

- **Get All Schedules**:
  ```
  GET /emploi-du-temps
  ```

For more details, refer to the Swagger documentation.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push your branch and submit a pull request.

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
