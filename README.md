# React Application with unit and end to emd testing

This project consists of a **React-based frontend**  and a **Node.js project** The project includes automated tests for both the API and frontend UI to ensure the application behaves as expected and handles edge cases.

## Features

### Frontend (React UI)
- **User Authentication**: Users can register and log in.
- **Item Management**: Users can view, create, update, and delete items.
- **Success/Error Messages**: Appropriate success, error, and validation messages are displayed for different actions.
- **Responsive Layout**: The UI is responsive and works well on mobile and desktop screens.

### API Test
- **Authentication**
- **CRUD Operations**
- **Response Validation**

### Testing

#### Frontend Tests
- **Jest**: For unit tests of individual React components.
- **Cypress**: For end-to-end testing of user interactions with the frontend.

#### API Tests
- **Jest** and **Supertest**: For API tests (authentication, CRUD operations, and response validation).

## Prerequisites

- Node.js installed (preferably the latest stable version).
- Access to the backend API (set in the `baseUrl`).
- Valid credentials for test users (replace with actual credentials if needed).

## Installation

1. Clone the Repository
To get started, clone the repository to your local machine:

git clone https://github.com/mohdnas0001/demo

2. Navigate to the Project Directory
Change to the project directory:

cd demo

3. Install Dependencies for Frontend and Backend
Install dependencies for both the frontend and backend parts of the project.

For the frontend:


cd frontend
yarn install

cd ../backend
yarn install


4. Run Tests

Frontend Tests

To run unit tests for the React components:
cd frontend
yarn test


To run end-to-end (E2E) tests with Cypress:
yarn cypress open
This will open the Cypress test runner, allowing you to execute tests in your browser.


API Tests

To run API tests for authentication, CRUD operations, and response validation:
cd backend
yarn test
