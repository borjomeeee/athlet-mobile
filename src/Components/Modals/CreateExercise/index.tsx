import s from '@borjomeeee/rn-styles';

import React from 'react';
import {HSpacer, Text, View} from 'src/Components/Common';
import {ShowableComponentProps} from 'src/Lib/ShowablePortal/Types';
import {bottomSheet} from 'src/Lib/ShowablePortal/Variants/BottomSheet';
import {useCreateExerciseController} from './Hooks';
import {CreateExerciseProps} from './Types';
import {ExerciseNameInput} from './Views/ExerciseNameInput';
import {Submit} from './Views/Submit';

export const CreateExercise = bottomSheet<
  CreateExerciseProps & ShowableComponentProps
>(
  ({id}) => {
    const {reset} = useCreateExerciseController(id);

    React.useEffect(() => () => reset(), [reset]);

    return (
      <View style={s(`container`)}>
        <HSpacer size={10} />
        <Text style={s(`text fsz:20 medium`)}>Создайте упражнение</Text>
        <HSpacer size={20} />
        <ExerciseNameInput id={id} />
        <HSpacer size={10} />
        <Submit id={id} />
      </View>
    );
  },
  {snapPoints: ['CONTENT_HEIGHT'], dynamic: true},
);
