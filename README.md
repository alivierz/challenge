# Bankuish Challenge

# Start the project

You must create a .env file in the root of the project and place the following environment variables

DPOSTGRES_DB =bakuish_challenge
POSTGRES_USER =bakuish
POSTGRES_PASSWORD =bakuish
DB_PORT =5433
DB_HOST= localhost
API_KEY=AIzaSyCA-8HjW9_xJLxdzdk4gRsEIzV8sNKbAt0
PROJECTID=bankuish-29e0a

In addition to that, the json necessary for the Firebase functionalities was attached in the email

Run the npm i to install all the dependencies

In the project there is a .env file to start the project (just for practice purposes)

In the terminal, go to the docker folder and create a "bankuis" image with the command docker-compose up -d bankuish

From dbeaver or another database manager, connect with the credentials that appear in the docker-compose and run the script that is in the same docker folder which is a .sql file

End with comand npm run start:dev

## API Reference

#### Register User

```http
  POST /v1/auth/register
```

| Parameter   | container | Type     | Description    |
| :---------- | :-------- | :------- | :------------- |
| `user_name` | body      | `string` | username       |
| `password`  | body      | `string` | string base 64 |

#### Login User

```http
  POST /v1/auth/register
```

| Parameter   | container | Type     | Description    |
| :---------- | :-------- | :------- | :------------- |
| `user_name` | body      | `string` | username       |
| `password`  | body      | `string` | string base 64 |

Returns the Bearer token required for other endpoints

#### List Courses

```http
  GET /v1/list/courses
```

| Parameter      | container             | Type     | Description |
| :------------- | :-------------------- | :------- | :---------- |
| `Bearer token` | Headers authorization | `string` | Token       |

Lists all the courses

#### List User Courses

```http
  GET /v1/list/courses
```

| Parameter      | container             | Type     | Description |
| :------------- | :-------------------- | :------- | :---------- |
| `Bearer token` | Headers authorization | `string` | Token       |

Lists all the courses that the user has

#### Add Course To User

```http
  POST /v1/operation/course
```

| Parameter | container | Type    | Description               |
| :-------- | :-------- | :------ | :------------------------ |
| `courses` | body      | `array` | array with the course ids |

#### Complete Course

```http
  PUT /v1/operation/course
```

| Parameter  | container | Type     | Description                  |
| :--------- | :-------- | :------- | :--------------------------- |
| `courseId` | body      | `number` | Course ID that was completed |

#### Active Course

```http
  PUT /v1/operation/course/active
```

| Parameter  | container | Type     | Description                           |
| :--------- | :-------- | :------- | :------------------------------------ |
| `courseId` | body      | `number` | ID of the course you want to activate |

# Ends the project

To finish the docker image process we use docker-compose down bankuish

# Notes

Unit and e2e tests were not performed as they are not my strong point in development and I have not had the opportunity to manage them in NEST.js, however I am clear about how they work with jest
