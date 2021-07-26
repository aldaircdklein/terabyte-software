import React from 'react';
import ReactDOM from 'react-dom';
import {
  ProviderHome
} from './app/pages/index';
import GlobalStyles from './styles/global.style';

ReactDOM.render(
  <React.StrictMode>
    <ProviderHome />
    <GlobalStyles/>
  </React.StrictMode>,
  document.getElementById('root')
);
