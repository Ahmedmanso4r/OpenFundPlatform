# OpenFundPlatform 🌍💡
A crowdfunding platform built using Django and React, designed to allow users to create, manage, and support project campaigns.
Overview
OpenFundPlatform is a web application that enables users to register, log in, and manage crowdfunding campaigns. The backend is powered by Django and Django REST Framework, with PostgreSQL as the database. The frontend is built with React.js, and JWT (JSON Web Tokens) is used for secure authentication. The platform supports RESTful JSON APIs for communication between the frontend and backend.
Features
User Authentication

Register: Users can sign up with their first name, last name, email, password, confirm password, and a valid Egyptian phone number.
Login: Users can log in using their email and password.
Authentication: Secured with JWT using django-rest-framework-simplejwt.

Project Campaigns

Create a Project: Authenticated users can create new crowdfunding projects via the POST /api/projects/ endpoint.
Update a Project: Project owners can update their projects using the PUT /api/projects/<id> endpoint.
Delete a Project: Project owners can delete their projects using the DELETE /api/projects/<id> endpoint.
Search Projects by Date: Optional feature to filter projects by date range using the GET /api/projects/search/?start=YYYY-MM-DD&end=YYYY-MM-DD endpoint (e.g., start=2025-06-01&end=2025-07-01).

Technologies Used

Backend:
Django
Django REST Framework
PostgreSQL
JWT Authentication (django-rest-framework-simplejwt)


Frontend:
React.js


API Communication:
RESTful JSON APIs



Setup Instructions
Prerequisites

Python 3.8+
Node.js 16+
PostgreSQL
Git

Installation

Clone the Repository:
git clone https://github.com/Ahmedmanso4r/OpenFundPlatform.git
cd OpenFundPlatform


Backend Setup:

Navigate to the backend directory:cd backend


Create a virtual environment and activate it:python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate


Install dependencies:pip install -r requirements.txt


Set up the PostgreSQL database and update the database configuration in settings.py.
Run migrations:python manage.py migrate


Start the Django development server:python manage.py runserver




Frontend Setup:

Navigate to the frontend directory:cd frontend


Install dependencies:npm install


Start the React development server:npm start




Environment Variables:

Create a .env file in the backend directory with the following variables:DATABASE_URL=postgres://user:password@localhost:5432/dbname
SECRET_KEY=your-django-secret-key





API Endpoints

User Authentication:

POST /api/auth/register/: Register a new user.
POST /api/auth/login/: Log in and receive a JWT token.
POST /api/auth/token/refresh/: Refresh JWT token.


Project Campaigns:

POST /api/projects/: Create a new project (authenticated).
PUT /api/projects/<id>/: Update a project (owner only).
DELETE /api/projects/<id>/: Delete a project (owner only).
GET /api/projects/search/?start=YYYY-MM-DD&end=YYYY-MM-DD: Filter projects by date range (optional).



Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.
