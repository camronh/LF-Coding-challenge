# LF Coding Challenge

A Dockerized API written in NodeJS. Uses [Axios](https://www.npmjs.com/package/axios) to make fetch the manager data from the URL provided in the instructions.

## Setup (optional)

#### Install dependencies

```bash
yarn
```

#### Run Unit Tests

```bash
yarn test
```

## Instructions

> We will be running the server in Docker. Please be sure Docker is installed and running before moving on.

#### 1. Build the Docker image

```bash
yarn build
```

#### 2. Run the Docker image

```bash
yarn start
```

Your API should be running on port 9000 as well as a Swagger UI for your convenience at http://localhost:9000/api-docs

#### 3. Call API

Open a new terminal to use for making API requests. An example of using the `GET /api/supervisors` endpoint is below:

```bash
curl -X GET "http://localhost:9000/api/supervisors"
```

Example of using the `POST /api/submit` endpoint is below:

```bash
curl -X POST "http://localhost:9000/api/submit" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"firstName\": \"string\", \"supervisor\": \"string\", \"email\": \"string\", \"phoneNumber\": \"string\"}"
```


## Removal

Run to remove the container:

```bash
yarn stop
```