import React from 'react';

import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';

import {Config} from 'src/Config';

import {FakeApiFabric} from 'fakeapi';
import {Navigation} from 'src/Navigation';

const App = () => {
  React.useEffect(() => {
    if (Config.fakeApiEnabled) {
      const server = FakeApiFabric.createFakeApi();
      return () => server?.shutdown();
    }
  }, []);

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
