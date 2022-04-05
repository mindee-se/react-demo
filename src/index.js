import React from 'react';
import ReactDOM from 'react-dom';
import configurator from "./config/config";
import App from './App';

let renderApp = async () => {
    let config = await configurator.getConfig();
    ReactDOM.render(
      <React.StrictMode>
        <App config={config} />
      </React.StrictMode>,
      document.getElementById('root')
    );
}
renderApp();
