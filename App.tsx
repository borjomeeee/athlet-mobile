import 'react-native-get-random-values';
import dayjs from 'dayjs';

import 'react-native-gesture-handler';
import React from 'react';
import {LogBox} from 'react-native';

import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';

import {Config} from 'src/Config';

import {FakeApiFabric} from 'fakeapi';
import {Navigation} from 'src/Navigation';
import {configureStyles} from 'src/Utils/Styles';
import {ModalRouter} from 'src/Lib/ModalRouter';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {OverlayProvider} from 'src/Lib/Overlay';
import {DebugObserver} from 'src/Utils/Recoil';

import localeRu from 'dayjs/locale/ru';
import {withHooks} from 'src/Utils/HOCs';
import {useSyncLocalStorage} from 'src/Lib/Hooks/Sync';
dayjs.locale(localeRu);

configureStyles();

LogBox.ignoreLogs([
  `[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!`,
]);

const AppContent = withHooks(
  [useSyncLocalStorage],
  React.memo(() => {
    return (
      <OverlayProvider>
        <Navigation />
        <ModalRouter />
      </OverlayProvider>
    );
  }),
);

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
          <AppContent />
        </SafeAreaProvider>
      </NavigationContainer>

      {Config.stateObserver && <DebugObserver />}
    </RecoilRoot>
  );
};

export default App;
