# API Response Tests and CRUD Operations

This project consists of a suite of automated tests for an API that includes authentication, item management, and basic response validation. The tests ensure that the API behaves as expected and handles edge cases effectively.

## Features Tested

### Authentication
- **Valid Login and Logout**: Tests for user authentication and logout. (Note: Log out functionality is skipped due to the lack of an endpoint.)
- **Incorrect Login Credentials**: Ensures that the system properly handles failed login attempts due to incorrect credentials.
- **Token Expiration and Refresh**: Tests to verify if the token expires and if refreshing is needed (Note: Token expiration and refresh are skipped due to the lack of endpoints.)

# Item Management Tests

This section includes both **unit** and **integration** tests for managing items via the API. The unit tests verify the behavior of individual item-related operations, while the integration tests ensure the correct functioning of authentication, authorization, and edge case handling.

## Unit Tests

### **Create, Update, and Delete Items**
These unit tests verify that the API correctly handles the creation, updating, and deletion of items when each operation is tested independently.

- **Create Item**: Verifies that the API allows creating a new item with valid data.
- **Update Item**: Verifies that the API can update an existing item with valid changes.
- **Delete Item**: Verifies that the API correctly deletes an item when requested.

### **Fetch Items**
These tests ensure that the API can correctly retrieve either a single item or a list of items, ensuring the data is returned in the expected format.

- **Fetch All Items**: Verifies that the API can retrieve all items and the data is returned as an array.
- **Fetch Single Item**: Verifies that the API can retrieve a single item by its ID and the data is returned in the correct format.

## Integration Tests

### **Access Control**
Integration tests ensure that only the owner of an item can modify or delete it. These tests verify that the proper application of authentication and authorization is in place.

- **Ownership Verification**: Verifies that only the authenticated user who owns the item can perform operations like update or delete.

### **Edge Cases**
These tests focus on verifying how the API handles invalid inputs and edge cases, such as missing required fields or attempts to add duplicate items.

- **Invalid Input Handling**: Verifies that the API responds with appropriate error messages when required fields are missing or the input is malformed.


### API Response Validation
- **Response Status Codes**: Verifies that the correct status codes are returned for various actions (e.g., 200, 201, 404, 401).
- **Required Fields**: Ensures the API responses contain the necessary fields, such as `id`, `createdAt`, `updatedAt`, etc.
- **Response Time**: Checks if the API responses are fast enough (less than 200ms).

## Prerequisites

- Node.js (version 14.x or higher)
- Access to the API (set in the `baseUrl`).
- Valid credentials for the test user (Note: Replace credentials with actual values if needed).

## Installation

1. Clone the repository:
    ```
    git clone https://github.com/mohdnas0001/demo
    ```

2. Navigate to the project directory:
    ```
    cd demo/backend
    ```

3. Install the dependencies using yarn:
    ```
    yarn install
    ```

## Running the Tests

### Unit Tests (Using Jest)
Unit tests are written for individual React components to ensure that they render correctly and behave as expected.

#### Running Jest Tests
To run unit tests for your components:

```bash
yarn test
```
