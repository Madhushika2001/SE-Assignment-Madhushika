# Book Review Application

This is a Book Review web application where users can submit, edit, view, and delete book reviews. It consists of a Spring Boot backend and a React frontend. Users can rate books, write reviews, and edit their previous submissions.

## Features

- **Add Review**: Users can add new book reviews with the title, author, rating (1-5), and review text.
- **Edit Review**: Users can edit an existing review based on its ID.
- **Delete Review**: Users can delete a review by its ID.
- **View Reviews**: Users can view all reviews stored in the database.
- **Responsive UI**: The frontend is styled using Tailwind CSS, ensuring the app is responsive and looks good on all screen sizes.

## Technology Stack

- **Frontend**: React, Tailwind CSS, Axios for HTTP requests
- **Backend**: Spring Boot, RESTful API
- **Database**: H2 (configured for development), can be replaced with any relational database
- **CORS**: Configured to allow requests from `http://localhost:3000` (frontend)

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- [Java 17 or higher](https://adoptopenjdk.net/) (for the backend)
- [Node.js](https://nodejs.org/en/) (for the frontend)
- [Maven](https://maven.apache.org/install.html) (for the backend)

### Backend Setup (Spring Boot)

1. Clone the backend repository:

    ```bash
    git clone https://github.com/your-username/book-review-backend.git
    cd book-review-backend
    ```

2. Build and run the Spring Boot application:

    ```bash
    ./mvnw spring-boot:run
    ```

    Or you can run it using your IDE.

3. The backend will run on `http://localhost:8080` by default. Make sure the backend is running before starting the frontend.

4. The backend is set up to allow cross-origin requests from `http://localhost:3000`, but if you deploy it elsewhere, update the CORS settings in the backend.

### Frontend Setup (React)

1. Clone the frontend repository:

    ```bash
    git clone https://github.com/your-username/book-review-frontend.git
    cd book-review-frontend
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Start the React application:

    ```bash
    npm start
    ```

    This will run the frontend at `http://localhost:3000`.

### Database Setup

- The application uses MySQL as database for development. You can change the database configuration in the `application.properties` file of the backend if you need a different database.

## API Endpoints

- **GET `/reviews`**: Fetch all reviews.
- **GET `/reviews/{id}`**: Fetch a review by its ID.
- **POST `/reviews`**: Create a new review.
- **PUT `/reviews/{id}`**: Update an existing review by its ID.
- **DELETE `/reviews/{id}`**: Delete a review by its ID.
