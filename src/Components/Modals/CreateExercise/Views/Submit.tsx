import React from 'react';
import {Button} from 'src/Components/Pressable';
import {useCreateExerciseController} from '../Hooks';

interface SubmitProps {
  id: string;
}
export const Submit: React.FC<SubmitProps> = ({id}) => {
  const {handlePressSubmit} = useCreateExerciseController(id);
  return <Button label="Создать" onPress={handlePressSubmit} />;
};
