import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import {BrowserRouter} from "react-router-dom";
import "./index.css";
import { Auth0Provider } from '@auth0/auth0-react';



ReactDOM.render(
  <Auth0Provider
  domain="neistow.eu.auth0.com"
  clientId="d6L4cb4NlNmSmnjCIM5VheCVEM1SX2v0"
  redirectUri={window.location.origin}
  audience="https://twopizzaproject.com"
  >
      <BrowserRouter>
         <App />
      </BrowserRouter>
  </Auth0Provider>,
  document.getElementById('root')!
);


