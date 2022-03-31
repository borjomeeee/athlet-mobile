import s from '@borjomeeee/rn-styles';
import {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetModal, HSpacer, Text} from 'src/Components';
import {View} from 'src/Components/Common';
import {SelectTimeWheel} from 'src/Components/Custom';
import {Submit} from './Views/Submit';
import {useSelectRestController} from './Hooks';
import {SelectRestProps} from './Types';

export const SelectRest: React.FC<SelectRestProps> = ({id, defaultRest}) => {
  const {handleChangeRest, reset} = useSelectRestController(id);
  const {bottom} = useSafeAreaInsets();

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(['CONTENT_HEIGHT']);

  React.useEffect(() => () => reset(), [reset]);

  return (
    <BottomSheetModal
      id={id}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}>
      <BottomSheetView style={s(`container`)} onLayout={handleContentLayout}>
        <HSpacer size={5} />
        <Text style={s(`text fsz:20 medium`)}>Выберите время отдыха</Text>

        <HSpacer size={30} />
        <View style={s(`aic`)}>
          <SelectTimeWheel
            onChangeValue={handleChangeRest}
            selectedTime={defaultRest}
          />
        </View>
        <HSpacer size={50} />
        <Submit id={id} />

        <HSpacer size={bottom + 20} />
      </BottomSheetView>
    </BottomSheetModal>
  );
};
