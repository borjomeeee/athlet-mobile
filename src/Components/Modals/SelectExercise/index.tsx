import s from '@borjomeeee/rn-styles';
import React from 'react';
import {Exercise} from 'src/Store/Models/Training';
import {BottomSheetModal, HSpacer, View} from '../../Common';
import {useSelectExerciseController} from './Hooks';
import {CreateExercise} from './Views/CreateExercise';
import {Header} from './Views/Header';
import {List} from './Views/List';

interface SelectExerciseProps {
  id: string;
  onSelect: (exercise: Exercise) => void;
}
export const SelectExercise: React.FC<SelectExerciseProps> = ({
  id,
  onSelect,
}) => {
  const {reset} = useSelectExerciseController(id);
  React.useEffect(() => () => reset(), [reset]);

  return (
    <BottomSheetModal id={id} snapPoints={['80%']} keyboardBehavior={undefined}>
      <Header id={id} />
      <HSpacer size={10} />
      <CreateExercise id={id} />
      <HSpacer size={25} />
      <List id={id} onSelect={onSelect} />
    </BottomSheetModal>
  );
};
