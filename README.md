#  Task Management API

This project is a simple Task Management API built using **NestJS, Prisma, and PostgreSQL**.


---

#  Features

- Create tasks and assign them to users
- Get all tasks
- Update task details (assigner only)
- Update task status (assignee only)
- Unassign tasks (assigner only)
- Delete tasks (assigner only)
- Basic authorization using request headers

---

# 🛠️ Tech Stack

- NestJS
- Prisma ORM
- PostgreSQL
- TypeScript

---

# Setup Instructions

## 1. Clone the repository

```bash
<<<<<<< HEAD
git clone https://github.com/dorcax/backend-skill-assessment.git
=======
git clone <your-repo-url>
>>>>>>> a9fa39299a0cc920d503fb20c9b7970ead8f0050
cd backend-gt-assessment
```

## 2. Install the Dependencies
```bash
pnpm install
```

## 3. Setup environment variables
Create a .env file and add your database URL

```bash 
DATABASE_URL="postgresql://username:password@host:port/database?"
```
## 4. Run database migrations
```bash
pnpm prisma migrate dev 
```

## 5. Seed the database
```bash 
pnpm prisma  db seed
```

## 6. start the server  
```bash
pnpm run start:dev
```

---
#  API Endpoints 

## Create Task
```bash
POST /tasks
```
## Request Response  
```bash 
{
  "id": "a91c2f10-3d8e-4f2a-bb21-7a9d8c3e11f2",
  "title": "Complete assessment",
  "priority": "high",
  "status": "pending",
  "assignedToId": "c2b1f3a0-9d2e-4c8a-9b1a-7f3d9c2a1e88",
  "assignedById": "b11d9a20-8c3f-4a5d-91aa-2c9f8e7d1234",
  "createdAt": "2026-05-23T10:00:00.000Z"
}
```
---
## Get All Tasks  
```bash 
GET /tasks
```
## Resquest Response 
```bash 
[
  {
    "id": "a91c2f10-3d8e-4f2a-bb21-7a9d8c3e11f2",
    "title": "Complete assessment",
    "priority": "high",
    "status": "pending",
    "a
    ssignedToId": "c2b1f3a0-9d2e-4c8a-9b1a-7f3d9c2a1e88",
    "assignedById": "b11d9a20-8c3f-4a5d-91aa-2c9f8e7d1234",
    "createdAt": "2026-05-23T10:00:00.000Z"
  }
]
```
---

## Get Task
```bash 
GET /tasks/a91c2f10-3d8e-4f2a-bb21-7a9d8c3e11f2
```  
## Resquest Response 
```bash 

  {
    "id": "a91c2f10-3d8e-4f2a-bb21-7a9d8c3e11f2",
    "title": "Complete assessment",
    "priority": "high",
    "status": "pending",
    "a
    ssignedToId": "c2b1f3a0-9d2e-4c8a-9b1a-7f3d9c2a1e88",
    "assignedById": "b11d9a20-8c3f-4a5d-91aa-2c9f8e7d1234",
    "createdAt": "2026-05-23T10:00:00.000Z"
  }

```
---

## Update  Task
```bash 
PATCH /tasks/a91c2f10-3d8e-4f2a-bb21-7a9d8c3e11f2
```  
## Resquest Response 
```bash 

  {
    "id": "a91c2f10-3d8e-4f2a-bb21-7a9d8c3e11f2",
    "title": "Complete assessment",
    "priority": "medium",
    "status": "pending",
    "a
    ssignedToId": "c2b1f3a0-9d2e-4c8a-9b1a-7f3d9c2a1e88",
    "assignedById": "b11d9a20-8c3f-4a5d-91aa-2c9f8e7d1234",
    "createdAt": "2026-05-23T10:00:00.000Z"
  }

```
---


## update Task status
```bash 
PATCH /tasks/a91c2f10-3d8e-4f2a-bb21-7a9d8c3e11f2
```  
## Resquest Response 
```bash 

  {
    "id": "a91c2f10-3d8e-4f2a-bb21-7a9d8c3e11f2",
    "title": "Complete assessment",
    "priority": "high",
    "status": "in_progress",
    "a
    ssignedToId": "c2b1f3a0-9d2e-4c8a-9b1a-7f3d9c2a1e88",
    "assignedById": "b11d9a20-8c3f-4a5d-91aa-2c9f8e7d1234",
    "createdAt": "2026-05-23T10:00:00.000Z"
  }

```
---



## Unassign  Task
```bash 
PATCH /tasks/a91c2f10-3d8e-4f2a-bb21-7a9d8c3e11f2/unassign
```  
## Resquest Response 
```bash 

  {
  "message": "Task successfully unassigned"
}

```
---

## Delete Task
```bash 
DELETE /tasks/a91c2f10-3d8e-4f2a-bb21-7a9d8c3e11f2
```  
## Resquest Response 
```bash 

{
  "message": "Task deleted successfully"
}

```
---
