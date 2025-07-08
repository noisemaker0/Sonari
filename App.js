import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import Theme from './src/components/ui/Theme';

const App = () => (
  <Provider store={store}>
    <Theme>
      <AppNavigator />
    </Theme>
  </Provider>
);

export default App;