import s from '@borjomeeee/rn-styles';

import React from 'react';
import {HSpacer, View} from 'src/Components/Common';
import {ExerciseCompletionType} from 'src/Store/Models/Training';
import {useEditExerciseController} from './Hooks';
import {CompletionType} from './Views/CompletionType';

import {
  SelectGymWheel,
  SelectRepsWheel,
  SelectTimeWheel,
} from 'src/Components/Custom';
import {useRecoilValue} from 'recoil';
import {
  completionTypeStoreFamily,
  currentExerciseStoreFamily,
  gymRepsStoreFamily,
  gymWeightStoreFamily,
  repsStoreFamily,
  timeStoreFamily,
} from './Store';
import Animated, {SlideInRight, SlideOutLeft} from 'react-native-reanimated';
import {EditExerciseProps} from './Types';
import {Submit} from './Views/Submit';
import {Title} from './Views/Title';
import {bottomSheet} from 'src/Lib/ShowablePortal/Variants/BottomSheet';

export const EditExercise = bottomSheet<EditExerciseProps>(
  ({id, exercise}) => {
    const currentExercise = useRecoilValue(currentExerciseStoreFamily(id));
    const selectedCompletionType = useRecoilValue(
      completionTypeStoreFamily(id),
    );

    const {changeCurrentExercise, reset} = useEditExerciseController(id);

    React.useEffect(() => {
      changeCurrentExercise(exercise);
    }, [exercise, changeCurrentExercise]);

    React.useEffect(() => () => reset(), [reset]);
    if (!currentExercise) {
      return null;
    }

    return (
      <View style={s(`container`)}>
        <HSpacer size={10} />
        <CompletionType id={id} />

        <HSpacer size={30} />

        <View style={s(`aic`)}>
          {selectedCompletionType === ExerciseCompletionType.REPS && (
            <Animated.View
            // entering={SlideInRight} exiting={SlideOutLeft}
            >
              <SelectReps id={id} />
            </Animated.View>
          )}

          {selectedCompletionType === ExerciseCompletionType.TIME && (
            <Animated.View
            // entering={SlideInRight} exiting={SlideOutLeft}
            >
              <SelectTime id={id} />
            </Animated.View>
          )}

          {selectedCompletionType === ExerciseCompletionType.GYM && (
            <Animated.View
            // entering={SlideInRight} exiting={SlideOutLeft}
            >
              <SelectGym id={id} />
            </Animated.View>
          )}
        </View>

        <HSpacer size={30} />

        <Title id={id} />
        <HSpacer size={15} />
        <Submit id={id} />
      </View>
    );
  },
  {snapPoints: ['CONTENT_HEIGHT'], dynamic: true},
);

interface SelectProps {
  id: string;
}
function SelectTime({id}: SelectProps) {
  const selectedTime = useRecoilValue(timeStoreFamily(id));
  const {resetTime, handleChangeTime} = useEditExerciseController(id);

  React.useEffect(() => () => resetTime(), [resetTime]);
  return (
    <SelectTimeWheel
      defaultValue={selectedTime}
      onChangeValue={handleChangeTime}
    />
  );
}

function SelectReps({id}: SelectProps) {
  const selectedReps = useRecoilValue(repsStoreFamily(id));
  const {resetReps, handleChangeReps} = useEditExerciseController(id);

  React.useEffect(
    () => () => {
      resetReps();
    },
    [resetReps],
  );

  return (
    <SelectRepsWheel
      defaultValue={selectedReps}
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
