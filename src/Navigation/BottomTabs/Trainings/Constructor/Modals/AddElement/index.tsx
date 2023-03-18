import React from 'react';

import {SelectableItem} from './Views/SelectableItem';

import SetIcon from 'src/Assets/Svg/Set';
import GymIcon from 'src/Assets/Svg/Gym';
import {useAddElementBottomSheetController} from './Controller';
import {bottomSheet} from 'src/Lib/ShowablePortal/Variants/BottomSheet';

export const AddElementBottomSheet = bottomSheet(
  _ => {
    const {handlePressAddExercise, handlePressAddSet} =
      useAddElementBottomSheetController();

    return (
      <>
        <SelectableItem
          LeftIcon={SetIcon}
          label="Добавить сет"
          onPress={handlePressAddSet}
        />
        <SelectableItem
          LeftIcon={GymIcon}
          label="Добавить упражнение"
          onPress={handlePressAddExercise}
        />
      </>
    );
  },
  {
    snapPoints: ['CONTENT_HEIGHT'],
    dynamic: true,
  },
);
