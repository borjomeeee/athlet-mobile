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
          <UI.View style={s(`rel`)}>
            <SelectWheel start={0} end={100} defaultValue={1} />
            <UI.View style={s(`abs t:0 b:0 l:60 aic jcc zi:-1`)}>
              <UI.Text style={s(`P6 medium`)}>раз</UI.Text>
            </UI.View>
          </UI.View>
        </UI.View>

        <HSpacer size={30} />

        <Text>{exercise.title}</Text>
        <HSpacer size={bottom + 20} />
      </BottomSheetView>
    </BottomSheetModal>
  );
};
