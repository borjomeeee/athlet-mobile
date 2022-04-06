import 'react-native-gesture-handler';
import React from 'react';

import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';

import {Config} from 'src/Config';

import {FakeApiFabric} from 'fakeapi';
import {Navigation} from 'src/Navigation';
import {configureStyles} from 'src/Utils/Styles';
import {ModalRouter} from 'src/Lib/ModalRouter';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {OverlayProvider} from 'src/Lib/Overlay';

configureStyles();

const App = () => {
  const [dev, setDev] = React.useState(Config.fakeApiEnabled);
  React.useEffect(() => {
    if (Config.fakeApiEnabled) {
      const server = FakeApiFabric.createFakeApi();

      setTimeout(() => setDev(false), 100);
      return () => server?.shutdown();
    }
  }, []);

  if (dev) {
    return null;
  }

  return (
    <RecoilRoot>
      <NavigationContainer>
        <SafeAreaProvider>
          <OverlayProvider>
            <Navigation />
            <ModalRouter />
          </OverlayProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
