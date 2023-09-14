# Person API Documentation

## Endpoints

### `/api`

**POST**

- Summary: Adds a new person.
- Request Body (JSON): name (required)
- Responses:
  - 201: Success Response
  - 400: Bad Request
- Examples:
  - Request body:
    `{
    "name": "Mark Essien"
}`
  - Responses:
    - 201:
    ```
    {
        "status": "success",
        "message": "New Person added",
        "data": {
            "id":"873739hbrfnbv98e",
            "name":"Mark Essien"
        }
    }
    ```
    - 400:
    ```
    {
        "status": "error",
        "message": "name field should be a string"
    }
    ```

### `/api/user_id`

**GET**

- Summary: Fetches an existing person's details.
- Parameters: user_id (required)
- Responses:
  - 200: Success Response
  - 400: Bad Request
  - 404: Resource not found
- Examples:
  - Request Parameter:
    `GET {baseURL}/api/873739hbrfnbv98e`
  - Responses:
    - 200:
    ```
    {
        "status": "success",
        "message": "Person found.",
        "data": {
            "id":"873739hbrfnbv98e",
            "name":"Mark Essien"
        }
    }
    ```
    - 400:
    ```
    {
        "status": "error",
        "message": "A valid user_id is required as request parameter."
    }
    ```
    - 404:
    ```
    {
        "status": "error",
        "message": "Person not found."
    }
    ```

### `/api/user_id`

**PUT**

- Summary: Updates an existing person's details.
  -Parameters: user_id (required)
- Responses:
  - 200: Success Response
  - 400: Bad Request
  - 404: Resource not found
- Examples:
  - Request Parameter (required):
    `PUT {baseURL}/api/873739hbrfnbv98e`
  - Request Body {optional}:
    `{"name": "Mark Twain"}`
  - Responses:
    - 200:
    ```
    {
        "status": "success",
        "message": "Person with Id: 873739hbrfnbv98e has been updated.",
        "data": {
            "id":"873739hbrfnbv98e",
            "name":"Mark Twain"
        }
    }
    ```
    - 400:
    ```
    {
        "status": "error",
        "message": "A valid user_id is required as request parameter."
    }
    ```
    - 404:
    ```
    {
        "status": "error",
        "message": "Person not found."
    }
    ```

### `/api/user_id`

**DELETE**

- Summary: Deletes an existing person's details.
- Parameters: user_id (required)
- Responses:
  - 200: Success Response
  - 400: Bad Request
  - 404: Resource not found
- Examples:
  - Request Parameter (required):
    `DELETE {baseURL}/api/873739hbrfnbv98e`
  - Responses:
    - 200:
    ```
    {
        "status": "success",
        "message": "Person with Id: 873739hbrfnbv98e has been deleted."
    }
    ```
    - 400:
    ```
    {
        "status": "error",
        "message": "A valid user_id is required as request parameter."
    }
    ```
    - 404:
    ```
    {
        "status": "error",
        "message": "Person not found or has already been deleted."
    }
    ```
