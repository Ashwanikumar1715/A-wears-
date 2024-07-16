# A-wears- E-commerce Mern application

## Overview

#problem statment
Create a robust e-commerce platform with Redux for state management, integrated payments, advanced pagination, search and filter capabilities, responsive cart management, and a secure admin dashboard with authentication and account management



#Challenges
-Implementing Redux for complex state management across various components and pages.
-Integrating secure and reliable payment gateways that support multiple transaction methods.
-Developing efficient pagination logic to handle large datasets and optimize page load times.
-Implementing advanced search and filter functionalities to ensure accurate and fast product discovery.
-Designing and optimizing responsive cart management to handle user interactions seamlessly.
-Creating a robust admin dashboard with secure authentication and comprehensive account management features.
-Ensuring scalability and performance optimization to handle high traffic and concurrent user sessions effectively.
-Maintaining data integrity and security throughout the application, especially with user-sensitive information and financial transactions

## Features

#Redux Integration: 
Centralized state management for enhanced scalability and performance.

#Payment Integration:
Seamless integration of secure payment gateways for smooth transactions.

#Pagination:
Efficient handling of large datasets with paginated results for improved user experience.

#Search and Filtering: 
Advanced search and filtering options for precise product discovery.

#Cart Management:
Responsive and intuitive cart management system for seamless user interactions.

#Admin Dashboard:
Feature-rich dashboard with secure authentication and comprehensive account management.

#Scalability:
Architecture designed for scalability to handle high traffic and user growth.

#Security:
Ensuring data integrity and secure transactions throughout the platform.

## Technologies Used

- **Frontend:** React.js, Axios, Redux
- **Backend:** Express.js(Node.js)
- **Database:** MongoDB
- **Authentication:** JSON Web Token (JWT)
-  **Payment integration:** Razorpay
-   **Storage:** Cloudinary



## Demo

<a href='https://a-wears.onrender.com'> GO TO SITE ---> </a>

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB Atlas account for database access.
- React Developer Tools extension for an enhanced development experience (optional but recommended).
- Coudinary and Payment integration(RazorPay)

### Installation

1. **Clone the repository.**
   ```bash
   git clone git@github.com:Ashwanikumar1715/A-wears.git
   git clone git@github.com:Ashwanikumar1715/A-wears-api.git
   ```
2. **Navigate to the project directory.**

```
  cd A-wears-
```

3. **Install dependencies for the frontend and backend..**

```
  cd frontend
npm install

cd ../backend
npm install
```

4. **Set up environment variables.**
   Create a .env file in the server directory.
   Add the following variables:

```
#  ---  Config.env  ---

ACTIVATION_SECRET=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_NAME=
COOKIE_EXPIRE=
JWT_EXPIRE=
JWT_SECRET=
MONGO_URI =
PORT=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
# Nodemailer

SMTP_HOST =smtp.gmail.com
SMTP_PORT =587
EMAIL_USERNAME = 
EMAIL_PASS = 
```

5. **Run the development servers.**

```
 cd frontend
npm run dev

cd ../backend
npm run dev
```

6. **Access the application in your browser at http://localhost:3000.**

## Contributing

We welcome contributions and ideas! Feel free to submit issues, feature requests, or even pull requests. For major changes, please open an issue first to discuss potential improvements.

## Future Development

intergration with AI to auto suggest based on users interest and recent history
