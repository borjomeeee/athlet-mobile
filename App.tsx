import React from 'react';
import * as RN from 'react-native';

import {RecoilRoot} from 'recoil';

import s from '@borjomeeee/rn-styles';

import {Text} from 'src/Components/Text';
import {Config} from 'src/Config';

import {FakeApiFabric} from 'fakeapi';
import {useAuthService} from 'src/Services/Auth';
import {useAccount} from 'src/Hooks/Account';

const Content = () => {
  const {account} = useAccount();
  const {signIn} = useAuthService();

  const handlePress = React.useCallback(() => signIn(), [signIn]);

  return (
    <RN.View style={s(`fill bgc:#fff aic jcc`)}>
      {!account ? (
        <Text style={s(`bold fsz:32`)} onPress={handlePress}>
          Athlet
        </Text>
      ) : (
        <Text style={s(`bold fsz:32`)} onPress={handlePress}>
          {account.nickname}
        </Text>
      )}
    </RN.View>
  );
};

const App = () => {
  React.useEffect(() => {
    if (Config.fakeApiEnabled) {
      const server = FakeApiFabric.createFakeApi();
      return () => server?.shutdown();
    }
  }, []);

  return (
    <RecoilRoot>
      <Content />
    </RecoilRoot>
  );
};

export default App;
