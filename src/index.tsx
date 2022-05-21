import React from 'react';
import {Provider} from 'react-redux';
import {useColorScheme, StatusBar} from 'react-native';

import store from './presentation/store';
import {Theme, themes} from './presentation/theme';
import Navigation from './presentation/navigation';

const App: React.FC = () => {
  const deviceColorSchema = useColorScheme();
  const theme = deviceColorSchema ? themes[deviceColorSchema] : themes.light;

  return (
    <Provider store={store}>
      <Theme theme={theme}>
        <StatusBar barStyle={theme.colors.statusBar} />
        <Navigation />
      </Theme>
    </Provider>
  );
};

export default App;
