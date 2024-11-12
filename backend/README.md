# API Response Tests and CRUD Operations

This project consists of a suite of automated tests for an API that includes authentication, item management, and basic response validation. The tests ensure that the API behaves as expected and handles edge cases effectively.

## Features Tested

### Authentication
- **Valid Login and Logout**: Tests for user authentication and logout. (Note: Log out functionality is skipped due to the lack of an endpoint.)
- **Incorrect Login Credentials**: Ensures that the system properly handles failed login attempts due to incorrect credentials.
- **Token Expiration and Refresh**: Tests to verify if the token expires and if refreshing is needed (Note: Token expiration and refresh are skipped due to the lack of endpoints.)

### Item Management
- **Create, Update, and Delete Items**: Ensures the API allows creation, updating, and deletion of items.
- **Fetch Items**: Validates that the API can fetch a single item or all items correctly.
- **Access Control**: Verifies that only the owner of an item can modify or delete it.
- **Edge Cases**: Tests for handling of invalid input or duplicate items.

### API Response Validation
- **Response Status Codes**: Verifies that the correct status codes are returned for various actions (e.g., 200, 201, 404, 401).
- **Required Fields**: Ensures the API responses contain the necessary fields, such as `id`, `createdAt`, `updatedAt`, etc.
- **Response Time**: Checks if the API responses are fast enough (less than 200ms).

## Prerequisites

- Node.js installed (preferably the latest stable version).
- Access to the API (set in the `baseUrl`).
- Valid credentials for the test user (Note: Replace credentials with actual values if needed).

## Installation

1. Clone the repository:
    ```
    git clone https://github.com/your-repo/api-tests.git
    ```

2. Navigate to the project directory:
    ```
    cd api-tests
    ```

3. Install the dependencies using yarn:
    ```
    yarn install
    ```

## Running the Tests

The tests are written using **Jest** and **Supertest** for HTTP request simulation. You can run the tests with the following command:

```bash
yarn test
