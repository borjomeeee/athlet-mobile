import s from '@borjomeeee/rn-styles';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import React from 'react';
import {TextInput} from 'react-native';
import {useRecoilValue} from 'recoil';
import {DefaultInputWithLabel} from 'src/Components/Inputs';
import {useCreateExerciseController} from '../Hooks';
import {exerciseNameErrorStoreFamily, exerciseNameStoreFamily} from '../Store';

interface InputProps {
  id: string;
}
export const ExerciseNameInput: React.FC<InputProps> = ({id}) => {
  const ref = React.useRef<TextInput>(null);

  const exerciseName = useRecoilValue(exerciseNameStoreFamily(id));
  const exerciseNameError = useRecoilValue(exerciseNameErrorStoreFamily(id));

  const {handleChangeExerciseName} = useCreateExerciseController(id);

  React.useEffect(() => {
    setTimeout(() => {
      ref.current?.focus();
    }, 1000);
  }, []);

  return (
    <DefaultInputWithLabel
      inputRef={ref}
      Variant={BottomSheetTextInput}
      label="Название упражнения"
      value={exerciseName}
      error={exerciseNameError}
      onChangeText={handleChangeExerciseName}
      placeholder="Введите название упражнения ..."
      style={s(`text P7`)}
    />
  );
};
