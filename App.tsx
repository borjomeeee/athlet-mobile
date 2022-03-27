import React from 'react';

import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';

import {Config} from 'src/Config';

import {FakeApiFabric} from 'fakeapi';
import {Navigation} from 'src/Navigation';
import {configureStyles} from 'src/Utils/Styles';

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
        <Navigation />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
