/// <reference path="./global.d.ts" />

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import { AppContainer } from 'react-hot-loader'

const render = (appComponentClass: typeof App) => {
    ReactDOM.render(
        <AppContainer>
            {React.createElement(appComponentClass)}
        </AppContainer>,
        document.getElementById('root')
    )
}

window.addEventListener('DOMContentLoaded', () => {
    render(App)
})

if (module.hot) {
    module.hot.accept('./App', () => {
        render(require('App'))
    })
}
