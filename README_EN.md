## 🌐 [English Version of README](README_EN.md)

# Online Course Platform API

This project is a backend API built with NestJS to manage an online course platform. It provides authentication, user management, courses, sections, lessons, purchases, reviews, and a dashboard with statistics, as well as support for file uploads and automatic documentation via Swagger.

## 🔨 Project Features

* User registration and login with JWT and refresh tokens
* CRUD operations for users (including avatar upload)
* CRUD operations for courses, sections, and lessons
* Course purchase endpoint and purchase history
* Course reviews (ratings)
* Dashboard for instructors and administrators
* API documentation via Swagger at `/api/docs`
* Serving static files (avatars, thumbnails, etc.)

### Visual Example of the Project

![Swagger UI](https://github.com/user-attachments/assets/c89e57cc-ca23-423f-9090-2db58f562e9e)

## ✔️ Technologies and Techniques Used

* **Language:** TypeScript
* **Framework:** NestJS
* **Database:** PostgreSQL
* **ORM:** TypeORM
* **Authentication:** JWT, Passport.js
* **Validation:** class-validator, class-transformer
* **File Upload:** Multer
* **Documentation:** Swagger (OpenAPI)
* **Testing:** Jest (E2E)

## 📁 Project Structure

* **src/**

  * **auth/**: Authentication (register, login, refresh, JWT)
  * **users/**: User CRUD operations, avatar upload
  * **courses/**: Course CRUD operations
  * **sections/**: Section CRUD operations
  * **lessons/**: Lesson CRUD operations
  * **purchases/**: Course purchases
  * **reviews/**: Course reviews
  * **dashboard/**: Instructor and admin statistics
  * **config/**: Database module (TypeORM)
  * **app.module.ts**: Root application module
  * **main.ts**: Application bootstrap and Swagger setup
* **uploads/**

  * **avatars/**: User avatar storage
* **test/**

  * **app.e2e-spec.ts**: E2E tests with Jest
* **package.json**: Dependencies and scripts
* **tsconfig.json**: TypeScript configuration
* **.env.example**: Example environment variables file

## 🛠️ How to Run the Project Locally

To get the project up and running locally, follow these steps:

1. **Ensure Node.js is installed**:

   * [Node.js](https://nodejs.org/) is required. Check with:

     ```bash
     node -v
     ```
   * If not installed, download the recommended version from the official site.

2. **Clone the Repository**:

   ```bash
   git clone <REPOSITORY_URL>
   cd <REPOSITORY_NAME>
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**:

   * Copy `.env.example` to `.env` and fill in your database credentials.

5. **Run in Development Mode**:

   ```bash
   npm run start:dev
   ```

6. **Access the Documentation**:

   * Open in your browser: `http://localhost:3000/api/docs`

## 🌐 Deployment

* **Build the application**:

  ```bash
  npm run build
  ```
* **Run in production**:

  ```bash
  npm run start:prod
  ```
* **Docker (optional)**:

  ```bash
  docker build -t online-course-api .
  docker run -d -p 3000:3000 --env-file .env online-course-api
  ```
