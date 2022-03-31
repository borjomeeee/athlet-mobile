import React from 'react';
import {Button} from 'src/Components/Pressable';
import {useSelectRestSubmitController} from '../Hooks';

interface SubmitProps {
  id: string;
}
export const Submit: React.FC<SubmitProps> = ({id}) => {
  const {handlePressSubmit} = useSelectRestSubmitController(id);
  return <Button onPress={handlePressSubmit} label="Сохранить" />;
};
