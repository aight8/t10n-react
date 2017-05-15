# t10n React Application

This App access the RoR **t10n** app's API and shows the top 10 stories with the most growth rate.

## Initial position

### Specs
- [ ] Display a simple list with some basic styling
- [ ] Each entry should contain the submission title, number of points, author, number of
comments, creation date and lifetime (time since creation)
- [ ] Include a refresh button that renews the list
- [ ] Bonus points if you add an automatic refreshing list so that every time there is a new
entry the list is renewed without the user clicking on the refresh button
- [ ] Bonus points if you display somewhere a current record holder. Meaning the entry that
had the fastest growth per time unit yet (update, if necessary, with every refresh). (...)
- [ ] Tests here to?

---

## Installation

...

## Development

...

---

## Implementation

### Needs
-  [ ] The API URL (base URL without endpoint) should be configurable by environment variable

### Technological decision points

- I basically use typescript instead of flow only because of the better IDE support (I'm using Visual Studio Code)
- For web targeted applications basically I always use the webpack build tool.
    I am currently writing a webpack configuration tool (in electron) which will help a lot in almost every cases.

Because of the very simplicity of this app **I don't** use following components:
- Immutable packages (packages like: seamless-immutable, immutable)
- State management (packages like: like redux, flux)
- Project generators (packages like: yo)

### webpack Configuration Summary

- File types: typescript, sass, css
- Build output is ```build/dev``` and ```build/prod```
- One CSS file output in production (```ExtractTextWebpackPlugin``` plugin)
- Always output source-map file
- Production optimization are added trough webpack CLI's ```-p``` flag here
- Instead of webpack ```aliases``` it uses typescript ```paths``` (incl. ```TsConfigPathsPlugin``` plugin) for IDE support

### Contributing

yarn dev = runy the development server on localhost:6969 - ready to develop with hot reloading

yarn build:dev = build the development build to /build/dev
yarn build:prod = build the production build to /build/prod
