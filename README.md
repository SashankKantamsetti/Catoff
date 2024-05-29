# Catoff Backend API

Welcome to the Catoff Backend API documentation. This API provides endpoints to interact with a cloud PostgreSQL database deployed on Vercel. You can use these endpoints to perform CRUD operations on users and wallet addresses.

## Base URL

The base URL for the backend API is: https://catoff.vercel.app

## Interaction

You can interact with the backend API using tools like Postman. Make sure to include the appropriate request body and headers for each endpoint.

## Endpoints

### Users

#### Create User

- **URL**: `https://catoff.vercel.app/users`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }

#### Get all Users

- **URL**: `.../users`
- **Method**: `GET`

#### Get Users By ID

- **URL**: `.../users/:id`
- **Method**: `GET`

#### Update Users By ID

- **URL**: `.../users/:id`
- **Method**: `PUT`

#### Delete Users By ID

- **URL**: `.../users/:id`
- **Method**: `DELETE`


### Wallet Addresses

Similar to users, with endpoint /wallet-addresses

### Sample:
- **Request Body**:
  ```json
  {
    "userId": 1,
    "address": "0x1234567890abcdef1234567890abcdef12345678"
  }

- **Response Body**:
  ```json
  {
    "id": 1,
    "userId": 1,
    "address": "0x1234567890abcdef1234567890abcdef12345678",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "securepassword123"
    }
  }




