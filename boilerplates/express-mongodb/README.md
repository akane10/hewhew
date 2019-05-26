# EXPRESS MONGODB BOILERPLATE

This boilerplate is integrated with eslint airbnb-base and prettier and using jest for testing library. there's also some basic functional programming stuff (in helpers) like curry, pipe, compose, composePromise, pipePromise, you might need ramda library for beyond. This is not MVC approach, in fact, is referenced to [nodebestpractices](https://github.com/i0natan/nodebestpractices)

# File Structure

```
|-- api
    |-- components
        |-- articles
            |-- controller
                |-- create.js
            |-- ArticleModel.js
            |-- index.js // article routes
    |-- helpers
        |-- tests // unit test for helpers
            |-- index.test.js
        |-- fp.js
        |-- index.js
    |-- polices // middleware
        |-- verifyToken.js
    |-- index.js // all routes
|-- config
    |-- config.js
    |-- db.js
|-- tests // integration or routes tests
    |-- articles
        |-- create.test.js
    |-- data.js
|-- .env
|-- .eslintignore
|-- .eslintrc.json
|-- .gitignore
|-- .prettierrc
|-- app.js
|-- package.json
|-- server.js
```

# Command

```
yarn test // run jest test
yarn dev // run nodemon along with dotenv
yarn start // run node server
```

# Depedencies

- main
  - body-parser
  - cors
  - express
  - morgan
  - mongoose
- dev
  - dotenv
  - eslint
  - eslint-config-airbnb-base
  - eslint-config-prettier
  - eslint-plugin-import
  - eslint-plugin-prettier
  - jest
  - prettier
  - supertest
