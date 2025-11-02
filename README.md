# Chatify

Chatify is a real-time chat application built with JavaScript, TypeScript, Express.js, and Node.js. It provides a platform for users to connect and communicate seamlessly.

> **Note:** This project is part of a learning experience from the Udemy course [*The Web Developer Bootcamp*](https://www.udemy.com/course/the-web-dev-bootcamp/).

## Key Features & Benefits

* **Real-time Messaging:** Instant message delivery for immediate communication.  
* **User Authentication:** Secure user registration and login.  
* **Sidebar User List:** Dynamically updated list of active users.  
* **Cloudinary Integration:** Image and file uploads.  
* **Scalable Architecture:** Designed for efficient handling of multiple concurrent users.  

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed:

* **Node.js:** Version 16 or higher — download from [nodejs.org](https://nodejs.org/).  
* **npm:** Node Package Manager (usually included with Node.js).  
* **TypeScript:** Installed globally or as a project dependency.  
* **Cloudinary Account:** For image and file storage (requires API keys).  
* **A database:** (implementation not specified, but required in the backend).  

## Installation & Setup Instructions

Follow these steps to get Chatify up and running:

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/ilhamuh97/chat.-app.git
    cd chat.-app
    ```

2. **Configure Environment Variables:**

    Create a `.env` file in the `backend` directory and set the following environment variables:

    ```
    CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
    CLOUDINARY_API_KEY=<your_cloudinary_api_key>
    CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
    PORT=5001 # Or any other available port
    MONGO_URI=<Your MongoDB Connection String>
    JWT_SECRET=<Your JWT Secret Key>
    SALT_ROUNDS=<Your Salt Number>
    CLIENT_URL=<Your Client URL>
    ```

    **Note:** Replace the placeholder values with your actual credentials.

3. **Setup and Build the BE and FE project:**
    ```bash
    npm install && npm run setup && npm run build
    ```
    
4. **Run the BE and FE:**
    ```bash
    npm run start
    ```
    This will start the backend server using nodemon, which automatically restarts the server on file changes.
   
## Usage Examples & API Documentation

### API Endpoints

**Authentication:**

* `POST /api/auth/signup`: Registers a new user.  
* `POST /api/auth/login`: Logs in an existing user.  
* `POST /api/auth/logout`: Logs out the current user.  

**Messages:**

* `GET /api/messages/users`: Retrieves a list of users for the sidebar.

### Example: Sending a Message

(Detailed client-side example not included, but would communicate with the WebSocket server via `socket.io`.)

## Configuration Options

* **PORT:** Backend server port (default: `5001`), configured in `.env`.  
* **CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET:** Cloudinary credentials for file storage.  
* **JWT_SECRET:** Secret key for signing JSON Web Tokens.  
* **MONGO_URI:** MongoDB connection string.  

## Contributing Guidelines

Contributions are welcome!  

1. Fork the repository.  
2. Create a new branch for your feature or fix.  
3. Make your changes and commit with a descriptive message.  
4. Push to your fork.  
5. Submit a pull request.  

## License Information

No license specified. All rights reserved.

## Acknowledgments

* [Express.js](https://expressjs.com/)  
* [Cloudinary](https://cloudinary.com/)  
* [Node.js](https://nodejs.org/)  
* [TypeScript](https://www.typescriptlang.org/)  
* [socket.io](https://socket.io/)  
* [Udemy: The Web Developer Bootcamp](https://www.udemy.com/course/the-web-dev-bootcamp/)
