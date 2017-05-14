# t10n React Application

## Contributing

yarn dev = runy the development server on localhost:6969 - ready to develop with hot reloading

yarn build:dev = build the development build to /build/dev
yarn build:prod = build the production build to /build/prod


## Decision points

I use typescript instead of flow only because of the better IDE support (I'm using Visual Studio Code)

Because of the very simplicity of this app I don't use:
- immutables (seamless-immutable or immutable package)
- redux

I intentionally don't use any webpack starter packs/yo etc. because they come themselve with a bigger overhead which
requires that the dev team must be familiar with.
However I am currently writing a webpack configuration tool (in electron) which will help a lot.


