import React from 'react';

import s from '@borjomeeee/rn-styles';
import {BottomSheetModal, HSpacer, MultilineText, Text, View} from '../Common';

import NetworkIcon from 'src/Assets/Svg/NetworkBig';
import {
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../Pressable';
import {useModal} from 'src/Lib/ModalRouter';

interface BadNetworkConnectionProps {
  id: string;
}
export const BadNetworkConnection: React.FC<BadNetworkConnectionProps> = ({
  id,
}) => {
  const {hide} = useModal(id);
  const {bottom} = useSafeAreaInsets();
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(['CONTENT_HEIGHT']);

  return (
    <BottomSheetModal
      id={id}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}>
      <BottomSheetView style={s(`container`)} onLayout={handleContentLayout}>
        <View style={s(`aic jcc`)}>
          <NetworkIcon />
          <HSpacer size={20} />
          <MultilineText style={s(`P5 medium`)}>
            {['Плохое интернет', 'соединение']}
          </MultilineText>
          <HSpacer size={30} />
          <Text style={s(`P7 tac maxW:294`)}>
            Пожалуйста, проверьте свое подключение к интернету и попробуйте
            снова
          </Text>
          <HSpacer size={20} />
        </View>
        <Button label="Хорошо" onPress={hide} />
        <HSpacer size={20 + bottom} />
      </BottomSheetView>
    </BottomSheetModal>
  );
};
