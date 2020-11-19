import 'react-native-gesture-handler';

import React from 'react';
import Navigation from './src/navigation/Navigation';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { FontAwesomeIconsPack } from './src/components/icons/fontAwesome-icons';

const App = () => { 
  return (
    <>
      <IconRegistry icons={FontAwesomeIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Navigation />
      </ApplicationProvider>
    </>
  );
}

export default App;