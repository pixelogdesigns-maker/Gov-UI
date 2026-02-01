# Government Data Entry Portal

A complete web application for district and village level data entry, featuring role-based authentication, master data management, and Excel export capabilities.

## Tech Stack
- **Frontend**: React, Vite, Material UI, Axios, React Hook Form
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT

## Project Structure
- `backend/`: Node.js API server
- `frontend/`: React Client application

## Prerequisites
- Node.js installed
- MongoDB installed and running locally on port 27017 (or update `backend/.env`)

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
# Seed the database with Admin user and demo data
node seed.js
# Start the server
node server.js
```
Server runs on: `http://localhost:5000`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Client runs on: `http://localhost:5173`

## Login Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@gov.in | password123 |
| **Operator** | operator@gov.in | password123 |

## Features
- **Admin**: Can manage Masters (Districts/Villages), View Dashboard Stats, Export Data.
- **Operator**: Can enter population/household data, View Records.
- **Viewer**: Read-only access to records.

## Notes
- Ensure MongoDB is running before starting the backend.
- The default API URL is configured to `http://localhost:5000/api` in `frontend/src/api/axios.js`.
