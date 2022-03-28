import React from 'react';

import * as UI from 'src/Components';
import {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SelectableItem} from './Views/SelectableItem';

import SetIcon from 'src/Assets/Svg/Set';
import GymIcon from 'src/Assets/Svg/Gym';
import {useTrainingConstructorController} from '../../Hooks';

interface AddElementBottomSheetProps {
  id: string;
}
export const AddElementBottomSheet: React.FC<AddElementBottomSheetProps> = ({
  id,
}) => {
  const {handlePressAddExercise, handlePressAddSet} =
    useTrainingConstructorController();
  const {bottom} = useSafeAreaInsets();
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(['CONTENT_HEIGHT']);

  return (
    <UI.BottomSheetModal
      id={id}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}>
      <BottomSheetView onLayout={handleContentLayout}>
        <SelectableItem
          LeftIcon={SetIcon}
          label="Добавить сет"
          onPress={handlePressAddSet}
        />
        <SelectableItem
          LeftIcon={GymIcon}
          label="Добавить упражнение"
          onPress={handlePressAddExercise}
        />

        <UI.HSpacer size={20 + bottom} />
      </BottomSheetView>
    </UI.BottomSheetModal>
  );
};
