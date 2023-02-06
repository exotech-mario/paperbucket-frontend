import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/login/store';
import { FirebaseProvider } from './contexts/FirebaseContext';
//import { JWTProvider } from "./contexts/JWTContext";
//import { Auth0Provider } from "./contexts/Auth0Context";

import routes, { renderRoutes } from './routes';
import { BASENAME } from './config/constant';

const App = () => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Router basename={BASENAME}>
          <FirebaseProvider>{renderRoutes(routes)}</FirebaseProvider>
        </Router>
      </Provider>
    </React.Fragment>
  );
};

export default App;
