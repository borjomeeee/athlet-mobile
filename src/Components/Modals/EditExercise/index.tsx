import s from '@borjomeeee/rn-styles';
import {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetModal, HSpacer, Text} from 'src/Components/Common';
import {ExerciseCompletionType} from 'src/Store/Models/Training';
import {useEditExerciseController} from './Hooks';
import {CompletionType} from './Views/CompletionType';

import * as UI from 'src/Components';
import {
  SelectGymWheel,
  SelectRepsWheel,
  SelectTimeWheel,
} from 'src/Components/Custom';
import {useRecoilValue} from 'recoil';
import {
  completionTypeStoreFamily,
  gymRepsStoreFamily,
  gymWeightStoreFamily,
  repsStoreFamily,
  timeStoreFamily,
} from './Store';
import Animated, {SlideInRight, SlideOutLeft} from 'react-native-reanimated';
import {EditExerciseProps} from './Types';
import {Submit} from './Views/Submit';
import {Title} from './Views/Title';

export const EditExercise: React.FC<EditExerciseProps> = ({id, exercise}) => {
  const selectedCompletionType = useRecoilValue(completionTypeStoreFamily(id));
  const {changeCurrentExercise} = useEditExerciseController(id);

  const {bottom} = useSafeAreaInsets();

  React.useEffect(() => {
    changeCurrentExercise(exercise);
  }, [exercise, changeCurrentExercise]);

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
          {selectedCompletionType === ExerciseCompletionType.REPS && (
            <Animated.View entering={SlideInRight} exiting={SlideOutLeft}>
              <SelectReps id={id} />
            </Animated.View>
          )}

          {selectedCompletionType === ExerciseCompletionType.TIME && (
            <Animated.View entering={SlideInRight} exiting={SlideOutLeft}>
              <SelectTime id={id} />
            </Animated.View>
          )}

          {selectedCompletionType === ExerciseCompletionType.GYM && (
            <Animated.View entering={SlideInRight} exiting={SlideOutLeft}>
              <SelectGym id={id} />
            </Animated.View>
          )}
        </UI.View>

        <HSpacer size={30} />

        <Title id={id} />
        <HSpacer size={15} />
        <Submit id={id} />
        <HSpacer size={bottom + 20} />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

interface SelectProps {
  id: string;
}
function SelectTime({id}: SelectProps) {
  const selectedTime = useRecoilValue(timeStoreFamily(id));
  const {resetTime, handleChangeTime} = useEditExerciseController(id);

  React.useEffect(() => () => resetTime(), [resetTime]);
  return (
    <SelectTimeWheel
      selectedTime={selectedTime}
      onChangeValue={handleChangeTime}
    />
  );
}

function SelectReps({id}: SelectProps) {
  const selectedReps = useRecoilValue(repsStoreFamily(id));
  const {resetReps, handleChangeReps} = useEditExerciseController(id);

  React.useEffect(() => () => resetReps(), [resetReps]);
  return (
    <SelectRepsWheel
      selectedNumber={selectedReps}
      onChangeValue={handleChangeReps}
    />
  );
}

function SelectGym({id}: SelectProps) {
  const selectedReps = useRecoilValue(gymRepsStoreFamily(id));
  const selectedWeight = useRecoilValue(gymWeightStoreFamily(id));

  const {resetGym, handleChangeGymReps, handleChangeGymWeight} =
    useEditExerciseController(id);

  React.useEffect(() => () => resetGym(), [resetGym]);
  return (
    <SelectGymWheel
      onChangeReps={handleChangeGymReps}
      onChangeWeight={handleChangeGymWeight}
      reps={selectedReps}
      weight={selectedWeight}
    />
  );
}
