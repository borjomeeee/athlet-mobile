import s from '@borjomeeee/rn-styles';
import {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  BottomSheetModal,
  HSpacer,
  SelectWheel,
  Text,
} from 'src/Components/Common';
import {Exercise} from 'src/Store/Models/Training';
import {useEditExerciseController} from './Hooks';
import {CompletionType} from './Views/CompletionType';

import * as UI from 'src/Components';
import {
  SelectGymWheel,
  SelectRepsWheel,
  SelectTimeWheel,
} from 'src/Components/Custom';

interface EditExerciseProps {
  id: string;
  exercise: Exercise;

  onEdit: (exercise: Exercise) => void;
}
export const EditExercise: React.FC<EditExerciseProps> = ({
  id,
  exercise,
  onEdit,
}) => {
  const {changeCompletionType} = useEditExerciseController(id);
  const {bottom} = useSafeAreaInsets();

  React.useEffect(() => {
    changeCompletionType(exercise.completionType);
  }, [exercise, changeCompletionType]);

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
        <HSpacer size={10} />
        <CompletionType id={id} />

        <HSpacer size={30} />

        <UI.View style={s(`aic`)}>
          <SelectRepsWheel />

          {/* <SelectTimeWheel />
          <SelectGymWheel /> */}
        </UI.View>

        <HSpacer size={30} />

        <Text>{exercise.title}</Text>
        <HSpacer size={bottom + 20} />
      </BottomSheetView>
    </BottomSheetModal>
  );
};
