# Phone Book app & Node as server side

A simple app using node & express for managing phone books

## Main links

 - [Express Nodejs](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website)
 - [Read & Write json files](http://stackabuse.com/reading-and-writing-json-files-with-node-js/)

## Steps to configure

```
npm install express-generator -g
```

```
express --view=hbs node-agenda-app
```

```
cd node-agenda-app
```

```
npm install --save-dev nodemon
```

```
npm install
```

### Enable nodemon
Edit **package.json** and add next lines:
```
"scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon ./bin/www"
}
```

## Running the app

simple run (no auto refresh when server files are changed)
```
npm start
```
or dev mode (useful when working on server side)
```
SET DEBUG=node-agenda-app:* & npm run devstart
```
or simple (also on dev mode)
```
nodemon
```
