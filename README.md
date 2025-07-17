
# Natixis Challenge - Product Catalog

This is a full-stack project developed as part of a technical challenge. The application consists of a RESTful API built with Java (Spring Boot) and a Single-Page Application (SPA) built with React, which communicate with each other. The entire environment is orchestrated with Docker for easy execution.

## Key Features

### Backend (Java)
- **RESTful API:** Implementation of endpoints for CRUD (Create, Read, Update, Delete) operations on products.
- **Security:** JWT (JSON Web Token) based user authentication using Spring Security.
- **Data Validation:** Validation of input data at the API level.
- **Database:** Use of an in-memory database (H2) for data persistence during runtime.

### Frontend (React)
- **Single-Page Application:** A reactive user interface built with React and TypeScript.
- **API Consumption:** Communication with the backend to fetch, create, edit, and delete products.
- **User Authentication:** A login form that obtains a JWT and uses it to access protected routes.
- **Routing:** Client-side navigation between pages (Login, Catalog, Product Form) with React Router.
- **Unit Tests:** Tests for individual components using Vitest and React Testing Library.

## Tech Stack

| Layer     | Technology/Library                                                                          |
| :-------- | :------------------------------------------------------------------------------------------ |
| **Backend** | Java 17, Spring Boot, Spring Security, Spring Data JPA, Hibernate, JJWT, H2 Database, Maven, Lombok. |
| **Frontend**| React 19, Vite, TypeScript, Axios, React Router, Vitest, React Testing Library.             |
| **Environment**| Docker, Docker Compose.                                                                     |

## Prerequisites

To run this project, you will need the following tools installed on your machine:
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/products/docker-desktop/) & Docker Compose (Docker Desktop for Mac/Windows includes Compose)

## Getting Started (Recommended Method)

The easiest way to get the entire application running is by using Docker Compose, which will build the images and start the backend and frontend containers automatically.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/NicholasNeto/natixis-challenge.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd natixis-challenge
    ```

3.  **Run Docker Compose:**
    This command will build the images (if they don't already exist) and start the services.
    ```bash
    docker-compose up --build
    ```
    Wait for the process to complete. You will see the logs from both the backend and frontend services in your terminal.

4.  **Access the application:**
    * **Frontend:** Open your browser and go to **`http://localhost:5173`**
    * **Backend:** The API will be available at **`http://localhost:8080`**

### Login Credentials

To test the application, you can use the following credentials:
-   **Username:** `userTest`
-   **Password:** `1313`

## Project Structure

The project is organized into two main folders:
-   **`/backend`**: Contains the Spring Boot application.
-   **`/frontend`**: Contains the React application.

The `docker-compose.yml` file in the root directory orchestrates both services.

## Running Tests

You can run the unit tests for each part of the application separately.

### Backend Tests
Navigate to the backend directory and run the Maven command:
```bash
cd backend
./mvnw test
```

### Frontend Tests
Navigate to the frontend directory and run the npm command:
```bash
cd frontend
npm test
```

---
*Developed by Nicholas Neto*

