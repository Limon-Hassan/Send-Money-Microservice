# User Management System — Microservice Architecture

## Overview

A secure user management system built with NestJS microservices.
Handles user registration, OTP verification, and login with device detection.

---

## Services

### 1. API Gateway (Port 3000)
- Single entry point for all client requests
- Routes requests to correct service
- Sets JWT cookies after login
- Technologies: NestJS, Axios, Cookie-Parser

### 2. User Service (Port 3001)
- Handles user registration
- Generates and verifies OTP
- Stores user data in PostgreSQL
- Technologies: NestJS, Prisma, BullMQ, Redis, bcrypt

### 3. Auth Service (Port 3002)
- Handles user login
- Detects new device or new IP
- Generates JWT access and refresh tokens
- Technologies: NestJS, Passport, JWT, BullMQ, Redis

### 4. Notification Service (Port 3003)
- Listens to BullMQ queue
- Sends OTP via Email (Gmail SMTP)
- Sends OTP via SMS (Twilio)
- Technologies: NestJS, Nodemailer, Twilio, BullMQ

---

## Infrastructure

### PostgreSQL
- Stores permanent data
- Tables: users, sessions, devices, audit_logs

### Redis (Upstash)
- Stores temporary data
- OTP → TTL 5 minutes
- Device fingerprint → TTL 30 days
- Refresh token → TTL 7 days
- BullMQ job queue

---

## Registration Flow

User Input:

=>Full Name
=>Email
=>Phone
=>Password (min 8 characters)
=>Currency (BDT, USD etc.)

Step 1: User submits registration form
Step 2: API Gateway receives request → forwards to User Service
Step 3: User Service checks if email already exists
Step 4: Password is hashed with bcrypt (10 rounds)
Step 5: User is saved to PostgreSQL (isVerified = false)
Step 6: System returns OTP channel options (email or phone)
Step 7: User selects channel (email or phone)
Step 8: OTP generated (6 digit, crypto-safe)
Step 9: OTP stored in Redis (TTL 5 minutes)
Step 10: OTP job added to BullMQ queue
Step 11: Notification Service picks up job
Step 12: OTP sent to user via selected channel
Step 13: User submits OTP
Step 14: System verifies OTP from Redis
Step 15: User marked as verified (isVerified = true)
Step 16: Redirect to login

## Login Flow
User Input:

=>Email or Phone
=>Password

Step 1: User submits login form
Step 2: API Gateway receives request → forwards to Auth Service
Step 3: Auth Service calls User Service to get user data
Step 4: Password verified with bcrypt
Step 5: Check if user is verified (isVerified = true)
Step 6: Device fingerprint created (SHA256 of IP + User Agent)
Step 7: Check Redis for known device
If new device or new IP:
Step 8a: OTP generated and stored in Redis (TTL 5 min)
Step 9a: OTP job added to BullMQ queue
Step 10a: Notification Service sends OTP
Step 11a: User submits OTP
Step 12a: OTP verified from Redis
Step 13a: Device fingerprint saved in Redis (TTL 30 days)
Step 14a: JWT tokens generated
If same device and same IP:
Step 8b: JWT tokens generated directly
Step 15: Access token set in HTTP-only cookie (15 min)
Step 16: Refresh token stored in Redis (7 days)
Step 17: Redirect to dashboard

---

## Security

| Feature | Implementation |
|---|---|
| Password hashing | bcrypt (10 rounds) |
| Token | JWT (RS256) |
| OTP | 6 digit crypto-safe random |
| OTP expiry | 5 minutes |
| Device detection | SHA256 fingerprint |
| Cookie | HTTP-only, Secure |
| Refresh token | Redis (7 days) |

---

## Port Map

| Service | Port |
|---|---|
| API Gateway | 3000 |
| User Service | 3001 |
| Auth Service | 3002 |
| Notification Service | 3003 |
| PostgreSQL | 5432 |
| Redis (Upstash) | 6379 |