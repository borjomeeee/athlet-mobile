import React from 'react';
import {Button} from 'src/Components/Pressable';
import {useEditExerciseSubmitController} from '../Hooks';

interface SubmitProps {
  id: string;
}
export const Submit: React.FC<SubmitProps> = ({id}) => {
  const {handleSubmit} = useEditExerciseSubmitController(id);
  return <Button onPress={handleSubmit} label="Сохранить" />;
};
