<p style="text-align: center;">
  <img src="https://assets.website-files.com/6282b4603c416826f6656e35/6282b4603c4168bec2656ebd_Parkdepot_Logo.png" width="450">
</p>
<p align="center">
  <a href="http://nx.dev/" target="blank">
    <img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" height="32" alt="Nx"/>
  </a>
  <span>&nbsp;</span>
  <a href="https://www.typescriptlang.org/" target="blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1920px-Typescript_logo_2020.svg.png" height="32" alt="Typescript"/>
  </a>
  <span>&nbsp;</span>
  <a href="http://react.org/" target="blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2560px-React-icon.svg.png" alt="react" height="32" />
  </a>
</p>

# @parkdepot/rockets

## Get Started

Start development server on http://localhost:4200

```
yarn start
```

Development server powered by [webpack-dev-server](https://webpack.js.org/configuration/dev-server/).

Configuration is set in `apps/rockets-browser-app/project.json#target.serve`

## Intl support:

The `RocketBrowserApp` supports language and locale choise for user
in the application runtime.

The application implements intl workflow as described [here](https://formatjs.io/docs/getting-started/application-workflow).

The commands are integrated with `yarn start` so a dictionary will be generated automatically on build.

For manual intl messages extraction/compilation please us commands:

```
yarn intl:extract
yarn intl:compile
```

<img src="https://formatjs.io/assets/images/workflow-cfcf0fe32b9a2d1097fcf2f11ed8b384.svg" />
