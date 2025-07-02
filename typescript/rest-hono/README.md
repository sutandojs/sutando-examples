# REST API Example

This example shows how to implement a **REST API with TypeScript** using [Hono](https://hono.dev/) and [Sutando](https://sutando.org). It uses a SQLite database file with some initial dummy data which you can find at [`./example.db`](./example.db).

## Getting started

### 1. Download example and install dependencies

Clone this repository:

```
git clone git@github.com:sutandojs/sutando-examples.git --depth=1
```

Install npm dependencies:

```
cd sutando-examples/typescript/rest-hono
npm install
```

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `users` and `posts` tables that are defined in [`migrations`](./migrations):

```
npm run migrate
npm run seed
```

### 3. Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can send the API requests implemented in `index.js`, e.g. [`http://localhost:3000/posts`](http://localhost:3000/posts).

## Using the REST API

You can access the REST API of the server using the following endpoints:

### `GET`

- `/posts/:id`: Fetch a single post by its `id`
- `/posts?searchString={searchString}&page={page}&perPage={perPage}&orderBy={orderBy}`: Fetch all _published_ posts
  - Query Parameters
    - `searchString` (optional): This filters posts by `title` or `content`
    - `page` (optional): This specifies which page should be returned to
    - `perPage` (optional): This specifies how many objects should be returned per page
    - `orderBy` (optional): The sort order for posts in either ascending or descending order. The value can either `asc` or `desc`
- `/users/:id/drafts`: Fetch user's drafts by their `id`
- `/users`: Fetch all users
### `POST`

- `/posts`: Create a new post
  - Body:
    - `title: String` (required): The title of the post
    - `content: String` (optional): The content of the post
    - `authorEmail: String` (required): The email of the user that creates the post
- `/users`: Create a new user
  - Body:
    - `email: String` (required): The email address of the user
    - `name: String` (optional): The name of the user

### `PUT`

- `/publish/:id`: Toggle the publish value of a post by its `id`
- `/posts/:id/views`: Increases the `views_count` of a `Post` by one `id`

### `DELETE`

- `/posts/:id`: Delete a post by its `id`

## Next steps

- Check out the [Sutando docs](https://sutando.org/)
- Create issues and ask questions on [GitHub](https://github.com/sutandojs/sutando/)