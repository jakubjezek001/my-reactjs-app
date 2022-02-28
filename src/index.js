import React from 'react';
import { Session } from '@ftrack/api'; // ftrack session
import ftrackWidget from 'ftrack-web-widget'; // helper library for custom widgets
import ReactDOM from 'react-dom';
import './index.css';
import { SessionProvider } from './session_context';
import App from './App.js';

function onWidgetLoad() {
  const credentials = ftrackWidget.getCredentials();
  const session = new Session(
    credentials.serverUrl,
    credentials.apiUser,
    credentials.apiKey
  );

  session.initializing.then(() => {
    ReactDOM.render(
      <SessionProvider value={session}>
        <App />
      </SessionProvider>,
      document.getElementById('root')
    );
  });
}

/** Initialize widget once DOM has loaded. */
function onDomContentLoaded() {
  ftrackWidget.initialize({
    onWidgetLoad,
  });
}

window.addEventListener('DOMContentLoaded', onDomContentLoaded);