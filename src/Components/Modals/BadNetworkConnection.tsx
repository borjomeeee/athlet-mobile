import React from 'react';

import s from '@borjomeeee/rn-styles';
import {BottomSheetModal, Text, View} from '../Common';

interface BadNetworkConnectionProps {
  id: string;
}
export const BadNetworkConnection: React.FC<BadNetworkConnectionProps> = ({
  id,
}) => {
  return (
    <BottomSheetModal id={id} snapPoints={[200]}>
      {_ => (
        <View style={s(`fill aic jcc`)}>
          <Text style={s(`P5 medium`)}>Hello, world!</Text>
        </View>
      )}
    </BottomSheetModal>
  );
};
