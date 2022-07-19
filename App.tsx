import 'react-native-gesture-handler';
import 'react-native-get-random-values';

import {configureStyles} from 'src/Utils/Styles';
configureStyles();

import dayjs from 'dayjs';

import React from 'react';
import {LogBox} from 'react-native';

import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';

import {Config} from 'src/Config';

import {FakeApiFabric} from 'fakeapi';
import {Navigation} from 'src/Navigation';

import {ModalRouter} from 'src/Lib/ModalRouter';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {OverlayProvider} from 'src/Lib/Overlay';
import {DebugObserver} from 'src/Utils/Recoil';

import notifee, {AndroidImportance} from '@notifee/react-native';
import localeRu from 'dayjs/locale/ru';
import duration from 'dayjs/plugin/duration';
import {TopMessageProvider} from 'src/Lib/TopMessage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';

import s from '@borjomeeee/rn-styles';
dayjs.locale(localeRu);
dayjs.extend(duration);

LogBox.ignoreLogs([
  `[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!`,
]);

const AppContent = React.memo(() => {
  return (
    <GestureHandlerRootView style={s(`fill`)}>
      <TopMessageProvider>
        <OverlayProvider>
          <Navigation />
          <ModalRouter />
        </OverlayProvider>
      </TopMessageProvider>
    </GestureHandlerRootView>
  );
});

notifee.createChannel({
  id: 'training',
  name: 'Show training progress',
  lights: false,
  vibration: false,
  importance: AndroidImportance.HIGH,
});

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
      <NavigationContainer onReady={() => SplashScreen.hide()}>
        <SafeAreaProvider>
          <AppContent />
        </SafeAreaProvider>
      </NavigationContainer>

      {Config.stateObserver && <DebugObserver />}
    </RecoilRoot>
  );
};

export default App;
