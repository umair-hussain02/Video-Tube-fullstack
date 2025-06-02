# Video Content Platform - Prototype Phase

### Team Members:

Umair Hussain (BC230203492), Noman Ashraf (BC230213588)

Supervisor:
Umair Mujahid

Group ID:
F24PRB0A71

Date:
13/ 03/ 2025

## Project Overview

This project aims to develop a user-friendly video content-based platform where users can easily interact with multimedia content. The platform offers functionalities such as watching videos, liking videos, creating playlists, subscribing to creator channels, and posting tweets or text-based posts. These features are accessible only to logged-in users, while guest users can watch videos without logging in.

## Development Approach

Our approach for this project is **backend-first**. This means we have prioritized building a robust and scalable backend system to handle the core functionalities of the platform. As a result, the frontend code is minimal and may contain some bad practices, as it is primarily for prototyping purposes. We have spent significant time ensuring the backend is well-structured, follows good coding practices, and is ready for future scalability.

### Why Backend-First?

- **Focus on Core Functionality:** We wanted to ensure that the backend APIs are fully functional and reliable before diving deep into frontend development.
- **Time Constraints:** Completing both frontend and backend in the prototype phase is challenging. We prioritized backend development to ensure the core features are working as expected.
- **Future-Proofing:** A well-structured backend will allow us to easily integrate a polished frontend in the future.

## Current Status

- **Backend:** The backend APIs are functional, and we have implemented key features such as user registration, login, profile management.
- **Frontend:** Minimal implementation for prototyping. The frontend is not fully polished, and some bad practices may exist due to time constraints.

## API Endpoints

Here are some of the key API endpoints currently available:

- **User Registration:**  
  `POST http://localhost:8080/api/v1/users/register`  
  Request Body:

  ```json
  {
    "userName": "exampleUser",
    "email": "user@example.com",
    "fullName": "Example User",
    "Avatar": "image.jpg",
    "password": "password123"
  }
  ```

- **User Login:**  
  `POST http://localhost:8080/api/v1/users/login`  
  Request Body:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

## Remaining ToDo's

Toggle Publish Video
Delete OwnComment
Remove Video to Playlist
