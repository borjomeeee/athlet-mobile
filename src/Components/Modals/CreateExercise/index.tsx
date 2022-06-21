import s from '@borjomeeee/rn-styles';
import {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetModal, HSpacer, Text} from 'src/Components/Common';
import {useCreateExerciseController} from './Hooks';
import {ExerciseNameInput} from './Views/ExerciseNameInput';
import {Submit} from './Views/Submit';

interface CreateExerciseProps {
  id: string;
  onCreate?: (title: string) => void;
}
export const CreateExercise: React.FC<CreateExerciseProps> = ({id}) => {
  const {bottom} = useSafeAreaInsets();
  const {reset} = useCreateExerciseController(id);

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
        <HSpacer size={10} />
        <Text style={s(`text fsz:20 medium`)}>Выберите упражнение</Text>
        <HSpacer size={20} />
        <ExerciseNameInput id={id} />
        <HSpacer size={10} />
        <Submit id={id} />
        <HSpacer size={bottom + 20} />
      </BottomSheetView>
    </BottomSheetModal>
  );
};
