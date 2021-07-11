# Brownie - another movie search made by svelte app

## Get started

Install the dependencies...

```bash
yarn install
```

...then start [Rollup](https://rollupjs.org):

```bash
yarn dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


## How backend works?

Project used [TMDB](https://www.themoviedb.org/). In order to project API key, the project proxy the API call using [Netlify function](https://www.netlify.com/products/functions/). Frontend used [moviedb-promise](https://www.npmjs.com/package/moviedb-promise) for generate API path with dummy api_key. The path fired to serverless backend and replace API key query string. Then proxy the path to TMDB server. It kind of lazy because I don't want to create another set of API routes. 
