# React-Based UI for Backend Interaction

This project is a **React-based UI** that interacts with a **backend API** for performing user authentication and CRUD operations. The application includes **unit tests** and **end-to-end (E2E) tests** to ensure the functionality and reliability of the UI.

## Features

### User Authentication
- **Login**: Users can log in by providing their credentials (username and password).
- **Registration**: New users can create an account by providing necessary details like username, email, and password.

### Item Management
- **View Items**: Users can view the list of items fetched from the backend.
- **Create Items**: Users can create new items by filling out a form with necessary details.
- **Update Items**: Users can edit existing items.
- **Delete Items**: Users can delete items from the list.

### User Feedback
- **Success Messages**: Appropriate success messages are displayed after actions like login, registration, and CRUD operations.
- **Error Messages**: Informative error messages are shown in case of failed actions (e.g., failed login, validation errors).
- **Validation Messages**: Validation messages are shown for input fields (e.g., required fields, invalid email format).

## Technologies Used

- **React**: For building the user interface.
- **React Router**: For navigation between different pages.
- **Axios**: For making HTTP requests to the backend API.
- **React Toastify**: For displaying success/error messages.
- **Jest**: For unit testing React components.
- **Cypress**: For end-to-end testing of user interactions.
- **Tailwind CSS**: For utility-first CSS styling, enabling a responsive and modern design.
- **SweetAlert**: For displaying customizable, stylish alerts and messages (success, error, info).
- **Phosphor Icons**: A set of lightweight and customizable icons used throughout the application.


## Prerequisites

- **Node.js**: Make sure Node.js (preferably the latest LTS version) is installed on your system.
- **Backend API**: You should have the backend API running, as this UI interacts with it for authentication and CRUD operations.

## Installation

1. Clone the repository:
    ```
    git clone https://github.com/mohdnas0001/demo
    ```

2. Navigate to the project directory:
    ```
    cd demo/frontend
    ```

3. Install the dependencies using yarn:
    ```
    yarn install
    ```


## Running the Tests

The tests are written using **Jest** and **Supertest** for HTTP request simulation. You can run the tests with the following command:


yarn test