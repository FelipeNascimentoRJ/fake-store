import React from 'react';
import {useColorScheme, StatusBar} from 'react-native';

import {Theme, themes} from './presentation/theme';
import Navigation from './presentation/navigation';

const App: React.FC = () => {
  const deviceColorSchema = useColorScheme();
  const theme = deviceColorSchema ? themes[deviceColorSchema] : themes.light;

  return (
    <Theme theme={theme}>
      <StatusBar barStyle={theme.colors.statusBar} />
      <Navigation />
    </Theme>
  );
};

export default App;
