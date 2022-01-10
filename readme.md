# React Native & Apollo usecase

`client/` contains the React Native code.

`server/` contains the NodeJS server.

Connection between both is made using [Apollo](https://www.apollographql.com/docs/).

## Get started
### Client
- Install deps: `yarn`
- Run metro bundler: `yarn start`
- Run code on Android or iOS

### Server
- Install deps: `yarn`
- Compile and hot-reload: `yarn build:dev`
- Run server: `yarn dev`

## Issues
### Cant connect to GraphQL API 
Replace `localhost` by your local IP in `client/app.tsx:49`


## Built with
- [Apollo Boilerplate](https://github.com/CocoaWebStudio/apollo-server-boilerplate)
- [Ignite Boilerplate](https://github.com/infinitered/ignite)