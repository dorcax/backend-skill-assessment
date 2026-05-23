# Task 3: Basic System Thinking

## 1. Scaling

If this task API starts receiving thousands of requests per minute, some problems that might occur include:

- Increased in  response time because too many requests are hitting the server at the same time
- Database overload caused by many read and write operations happening simultaneously
- Race conditions where multiple users try to update the same task at the same time

---

## 2. Performance Improvements

To improve performance, I would use some of the following techniques:

- Add database indexes 
- Use pagination when fetching tasks instead of returning everything at once
- Optimize database queries to avoid unnecessary data fetching
- Use caching tools like Redis for frequently accessed data
- Add rate limiting to prevent too many requests from a single user


---

## 3. Production Monitoring

To ensure the API is healthy in production, I would monitor:

- Response time to know how fast the API responds
- Error rate to track failed requests and server errors
- CPU and memory usage to check server performance
- Database performance such as slow queries or connection issues

