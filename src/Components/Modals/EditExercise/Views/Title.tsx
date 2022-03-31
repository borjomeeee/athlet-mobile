import React from 'react';

import s from '@borjomeeee/rn-styles';
import {Text, View, VSpacer} from 'src/Components/Common';

import EditIcon from 'src/Assets/Svg/Edit';
import {Pressable} from 'react-native';
import {useEditExerciseController} from '../Hooks';
import {useRecoilValue} from 'recoil';
import {currentExerciseStoreFamily} from '../Store';

interface TitleProps {
  id: string;
}
export const Title: React.FC<TitleProps> = ({id}) => {
  const exercise = useRecoilValue(currentExerciseStoreFamily(id));
  const {handlePressEditExercise} = useEditExerciseController(id);

  return (
    <View style={s(`row aic`)}>
      <Text style={s(`P6 medium`)}>{exercise?.title || 'Undefined'}</Text>
      <VSpacer size={8} />
      <Pressable onPress={handlePressEditExercise}>
        <EditIcon />
      </Pressable>
    </View>
  );
};
