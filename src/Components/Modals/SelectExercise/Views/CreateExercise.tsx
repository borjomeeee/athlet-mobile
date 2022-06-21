import s from '@borjomeeee/rn-styles';
import React from 'react';

import PlusIcon from 'src/Assets/Svg/Plus';
import {Text, VSpacer} from 'src/Components/Common';
import {Pressable} from 'src/Components/Pressable';
import {useSelectExerciseController} from '../Hooks';

interface CreateExerciseProps {
  id: string;
}
export const CreateExercise: React.FC<CreateExerciseProps> = ({id}) => {
  const {handlePressCreateExercise} = useSelectExerciseController(id);
  return (
    <Pressable
      style={s(`row aic container`)}
      onPress={handlePressCreateExercise}>
      <PlusIcon />
      <VSpacer size={5} />
      <Text style={s(`P9 medium c:blue`)}>Создать упражнение</Text>
    </Pressable>
  );
};
