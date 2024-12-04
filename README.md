# S3 File Upload and Listing with Next.js

### Nextjs + clerk auth + AWS S3 (upload files to s3 in simple steps)

This project provides a straightforward way to upload and manage files in an AWS S3 bucket using a Next.js backend API and frontend components. It integrates user authentication with [Clerk](https://clerk.dev/) to ensure secure file management.

## Features

- **File Upload:** Upload files securely to S3.
- **File Listing:** List uploaded files per user.
- **Authentication:** Use Clerk to handle secure file operations.

## Prerequisites

To use this project, you’ll need:

1. An AWS S3 bucket.
2. Clerk setup for user authentication.
3. A configured Next.js project.

## Setup

### 1. Clone the Repository

```
git clone https://github.com/Shubhainder/upload-to-s3.git
cd your-repo
```

### 2. Install Dependencies
```
npm install
```
### 3. Configure Environment Variables
Create a .env.local file in the root directory and add the following:

```# AWS Configuration
AWS_S3_REGION=<your-region>
AWS_S3_BUCKET_NAME=<your-bucket-name>
AWS_ACCESS_KEY_ID=<your-access-key-id>
AWS_SECRET_ACCESS_KEY=<your-secret-access-key>

# Public AWS Configuration for Frontend
NEXT_PUBLIC_S3_ACCESS_KEY_ID=<your-access-key-id>
NEXT_PUBLIC_S3_SECRET_ACCESS_KEY=<your-secret-access-key>
NEXT_PUBLIC_S3_BUCKET_NAME=<your-bucket-name>

# Clerk Configuration
CLERK_API_KEY=<your-clerk-api-key>
CLERK_FRONTEND_API=<your-clerk-frontend-api>
```

### 4. Run the Development Server
```
npm run dev
```
  
Contributing
Contributions are welcome! Follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.



License
This project is licensed under the MIT License.
