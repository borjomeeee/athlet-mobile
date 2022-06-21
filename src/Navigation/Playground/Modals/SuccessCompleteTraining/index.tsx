import React from 'react';

import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';

import OkIcon from 'src/Assets/Svg/Ok';
import {
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useModal} from 'src/Lib/ModalRouter';
import {useSuccessCompleteTrainingController} from './Hooks';

interface SuccessCompleteTrainingProps {
  id: string;
  trainingEventId: string;
}
export const SuccessCompleteTraining: React.FC<
  SuccessCompleteTrainingProps
> = ({id}) => {
  const {hide} = useModal(id);

  const {bottom} = useSafeAreaInsets();
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(['CONTENT_HEIGHT']);

  const {handlePressShowStatistic} = useSuccessCompleteTrainingController(id);

  return (
    <UI.BottomSheetModal
      id={id}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}>
      <BottomSheetView style={s(`container`)} onLayout={handleContentLayout}>
        <UI.View style={s(`aic jcc`)}>
          <OkIcon />
          <UI.HSpacer size={20} />
          <UI.MultilineText style={s(`P5 medium`)}>
            {['Тренировка', 'успешно завершена']}
          </UI.MultilineText>
          <UI.HSpacer size={30} />
        </UI.View>
        <UI.GithubButton
          label="Посмотреть статистику"
          onPress={handlePressShowStatistic}
        />
        <UI.HSpacer size={10} />
        <UI.View style={s(`aic`)}>
          <UI.Pressable onPress={hide}>
            <UI.Text style={s(`P7 medium c:gray`)}>Закрыть</UI.Text>
          </UI.Pressable>
        </UI.View>
        <UI.HSpacer size={20 + bottom} />
      </BottomSheetView>
    </UI.BottomSheetModal>
  );
};
