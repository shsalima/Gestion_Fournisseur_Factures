# Authentication Flows - Sequence Diagrams

## Register Flow Diagram

```mermaid
sequenceDiagram
    participant Client
    participant Server as Server/Middleware
    participant Database

    Client->>Server: POST /register with credentials
    Server->>Server: Validate input & check email exists

    alt Invalid Input or Email Exists
        Server->>Client: Return 400 Error
    else Valid & Email Available
        Server->>Server: Hash password
        Server->>Database: Create user
        Server->>Server: Generate JWT token
        Server->>Client: Return 201 + token
    end
```

## Login Flow Diagram

```mermaid
sequenceDiagram
    participant Client
    participant Server as Server/Middleware
    participant Database

    Client->>Server: POST /login with email & password
    Server->>Server: Validate input
    Server->>Database: Find user by email

    alt User Not Found or Password Wrong
        Server->>Client: Return 400/404 Error
    else User Found & Password Valid
        Server->>Server: Generate JWT token
        Server->>Client: Return 200 + token
    end
```

## Summary

### Register Flow

- Validates input (name, email, password confirmation, role)
- Checks if email already exists
- Hashes password using bcrypt
- Creates new user document in database
- Generates JWT token (valid for 7 days)
- Returns user data and token

### Login Flow

- Validates email and password presence
- Queries database for user by email
- Compares provided password with stored hash using bcrypt
- Generates JWT token (valid for 7 days)
- Returns user ID, role, and token
