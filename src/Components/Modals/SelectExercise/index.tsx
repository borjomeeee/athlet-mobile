import React from 'react';
import {bottomSheet} from 'src/Lib/ShowablePortal/Variants/BottomSheet';
import {HSpacer} from '../../Common';
import {useSelectExerciseController} from './Hooks';
import {SelectExerciseProps} from './Types';
import {CreateExercise} from './Views/CreateExercise';
import {Header} from './Views/Header';
import {List} from './Views/List';

export const SelectExercise = bottomSheet<SelectExerciseProps>(
  ({id, onSelect}) => {
    const {reset} = useSelectExerciseController(id);
    React.useEffect(() => () => reset(), [reset]);

    return (
      <>
        <Header id={id} />
        <HSpacer size={10} />
        <CreateExercise id={id} />
        <HSpacer size={25} />
        <List id={id} onSelect={onSelect} />
      </>
    );
  },
  {snapPoints: ['100%']},
);
