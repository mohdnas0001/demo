# React Application with unit and end to end testing

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

- Node _v18+_
- Access to the backend API (set in the `baseUrl`).
- Valid credentials for test users (replace with actual credentials if needed).

## Installation

1. Clone the repository:
    
    ```
    git clone https://github.com/mohdnas0001/demo
    ```

2. Navigate to the project directory:
    
    ```
    cd demo/backend or cd demo/frontend
    ```

3. Install the dependencies using yarn:
   
    ```
    yarn install
    ```

4. Run Tests

## Running the Tests

The tests are written using **Jest** and **Cypress** for unit and end-to-end testing respectively. You can run the tests with the following command:

```bash
yarn test
```
This command will run all the Jest tests and output the results in the terminal.

## End-to-End Tests (Using Cypress)
Cypress is used for end-to-end testing, simulating real user interactions to test if the UI behaves as expected.

## Running Cypress Tests
To open the Cypress test runner, use:

```bash
yarn cypress open
```

This command opens a browser window with the Cypress interface, where you can run tests interactively. Alternatively, you can run the tests in headless mode:

```bash
yarn cypress run
```
## Test Coverage
The testing suite includes:

### Unit Tests
For validating the rendering and behavior of individual components, such as login forms, item management components, and buttons.

### E2E Tests
For simulating user interactions (e.g., logging in, creating items, updating items, and deleting items) to verify that the full flow works from start to finish.



