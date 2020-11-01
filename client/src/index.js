import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import App from './App';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import Spanish from './languages/es-MX.json';
import English from './languages/en-US.json';
import Wrapper from './components/Wrapper';

import './index.css';

const history = createBrowserHistory();
const store = configureStore(history);
const local = navigator.language;

let lang;
if (local === 'en-US') {
  lang = English;
} else {
  lang = Spanish;
}
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Wrapper>
        <App />
      </Wrapper>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
