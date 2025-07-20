# CrowdFundPlatform 🌍💡

A crowdfunding web application built with Django (backend) and React (frontend), allowing users to create, manage, and contribute to fundraising campaigns.

## Features

### User Authentication
- **Registration**: Users can sign up with their first name, last name, email, password, and an Egyptian phone number (validated format).
- **Login**: Users can log in using their email and password to receive a JWT token for accessing protected endpoints.
- **JWT Authentication**: Secure access to protected routes using `djangorestframework-simplejwt`.

### Project Campaigns
- **Create Campaigns**: Authenticated users can create campaigns with a title, description, target amount, start date, and end date.
- **Manage Campaigns**: Only the campaign owner can edit or delete their campaigns.
- **Browse Campaigns**: All users can view all campaigns.
- **Search by Date (Bonus)**: Filter campaigns by date range.

## Technologies Used

### Backend
- **Django**: A high-level Python web framework.
- **Django REST Framework**: For building RESTful APIs.
- **PostgreSQL**: A powerful relational database.
- **JWT Authentication**: Implemented using `djangorestframework-simplejwt`.

### Frontend
- **React.js**: A JavaScript library for building user interfaces.

## API Endpoints

### Authentication
- `POST /api/register/`: Register a new user.
- `POST /api/login/`: Log in and receive a JWT token.

### Projects
- `GET /api/projects/`: List all projects.
- `POST /api/projects/`: Create a new project (authenticated).
- `PUT /api/projects/<id>/`: Update a project (owner only).
- `DELETE /api/projects/<id>/`: Delete a project (owner only).
- `GET /api/projects/search/?start=<date>&end=<date>`: Filter projects by date range (optional bonus).

## Setup Instructions

### Prerequisites
- Python 3.x
- Node.js
- PostgreSQL

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Ahmedmanso4r/CrowdFundPlatform.git
   cd CrowdFundPlatform/backend
