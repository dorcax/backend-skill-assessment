## How I approached the project
I started by reading through all the requirements  to understand what was expected.

The main thing I focused on was the  rules around tasks which include the following:

-who can create a task
-who can update or delete it
-who can change the task status

After understanding that, I decided to build the API step by step:

1. First I set up the NestJS project and Prisma
2. Then I designed the database schema
3. I built the task endpoints one by one
4. Finally I added validation and authorization rules

---

## Why i structured the code the way i did

I organized the project using the NestJS modules.

- controller is used to handles incoming requests
- service contains the main or bussiness  logic
- prisma service handles database queries
- dto folder is used for input validation
- decorator folder 
I kept this structure because it makes the code easier to read and maintain. It also separates responsibilities properly so everything is not mixed together.

## Database design

I used PostgreSQL with Prisma.

For the Task model, I included:

- id (UUID)
- title
- priority
- status (defaults to pending)
- assignedToId
- assignedById
- createdAt

## Authentication and authorization

There is no full login system in this project.

Instead, I used a simple approach where the current user is passed in the request header

From there, I use it to check what the user is allowed to do.

What I implemented:
- Only the person who created the task (assigner) can:
- update the task
- delete the task
- unassign the task
- Only the assigned user (assignee) can:
- update the task status

I handled these checks inside the service layer before doing any database updates.

---

## Assumptions I made
Users already exist in the system (I seeded few user in the system )
There is no login or signup required



## What I would improve if I had more time

If I had more time, I would:

- add the advanced authentication and authorization using jwt 
- Implement a notification feature for task updates 
- Add pagination , filtering for better performance
- Add Full Text Search 



## Tools I used
- NestJS
- Prisma ORM
- PostgreSQL
- TypeScript
- class-validator

