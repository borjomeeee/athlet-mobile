import React from 'react';
import {Exercise} from 'src/Store/Models/Training';
import {BottomSheetModal, HSpacer} from '../../Common';
import {useSelectExerciseController} from './Hooks';
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
    <BottomSheetModal id={id} snapPoints={['80%']}>
      <Header id={id} />
      <HSpacer size={10} />
      <List id={id} onSelect={onSelect} />
    </BottomSheetModal>
  );
};
