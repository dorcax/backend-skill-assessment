# Task 1: API Reasoning and Validation

## Validation

Before creating an order, I would first use a DTO to validate the incoming request data.

For example:

- userId should not be empty and must be valid
- items should not be empty

- productId should be provided for each item

This help to ensure that invalid data does not reach the database.

---

## Service Logic Validation 

After confirming the request data is valid, I would then handle the business logic validation inside the service layer.
The checks which i will perform include

- Check if the user making the order exists in the database
- Check if each product in the items list exists
- Make sure the products are available and not disabled
- Check if there is enough stock for the requested quantity
- Prevent duplicate products in the same order request

These validations are important because even if the request format is correct, the order should not be processed if business rules are violated.

---

## Possible Errors

Some possible errors that could happen during the process include:

- User not found or invalid 
- Request body is missing required fields
- Product does not exist
- Product is out of stock
- Invalid quantity value
- Duplicate products in the order list
- Server or database error while saving the order

---

## HTTP Responses

### Successful order creation

**201 Created**

This status code is used because a new order has been successfully created.

---

### Invalid request body

**400 Bad Request**

This is returned when the request body is invalid or required fields are missing.

---

### Product not found

**404 Not Found**

This is returned when a product or item requested does not exist in the database.

---

### Server error

**500 Internal Server Error**

This is returned when an unexpected server or database error occurs while processing the request.