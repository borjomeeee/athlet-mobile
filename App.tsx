import React from 'react';
import * as RN from 'react-native';

import s from '@borjomeeee/rn-styles';

import {Text} from 'src/Components/Text';
import {Config} from 'src/Config';

import {FakeApiFabric} from 'fakeapi';

const App = () => {
  React.useEffect(() => {
    if (Config.fakeApiEnabled) {
      const server = FakeApiFabric.createFakeApi();
      return () => server?.shutdown();
    }
  }, []);

  return (
    <RN.View style={s(`fill bgc:#fff aic jcc`)}>
      <Text style={s(`bold fsz:32`)}>Athlet</Text>
    </RN.View>
  );
};

export default App;
