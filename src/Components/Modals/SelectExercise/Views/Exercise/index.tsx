import s from '@borjomeeee/rn-styles';
import React from 'react';
import {Text, View} from 'src/Components/Common';
import {OverlayAction, PressableItem} from 'src/Components/Pressable';
import {OverlayWrapper} from 'src/Lib/Overlay';
import {Exercise as ExerciseModel} from 'src/Store/Models/Training';
import {noop} from 'src/Utils/Common';
import {useExerciseController} from './Controller';
import {searchInputStoreFamily} from '../../Store';
import {useRecoilValue} from 'recoil';

interface ExerciseProps {
  modalId: string;
  exercise: ExerciseModel;
}
export const Exercise: React.FC<ExerciseProps> = ({modalId, exercise}) => {
  const searchValue = useRecoilValue(searchInputStoreFamily(modalId));
  const {overlayRef, handlePress, handleLongPress} = useExerciseController(
    modalId,
    exercise,
  );

  const res = React.useMemo(
    () =>
      splitToChain(
        exercise.title,
        searchValue.split(/\s+/).filter(v => v.length !== 0),
      ),
    [exercise, searchValue],
  );

  return (
    <OverlayWrapper
      overlayRef={overlayRef}
      onPress={noop}
      Component={OverlayComponent}>
      <PressableItem
        style={s(`container pv:10 bgc:white`)}
        onPress={handlePress}
        onLongPress={handleLongPress}>
        <Text>
          {res.map(([str, toHighlight], indx) => (
            <Text
              key={`chain-${indx}`}
              style={s(`P7`, toHighlight && `c:blue`)}>
              {str}
            </Text>
          ))}
        </Text>
      </PressableItem>
    </OverlayWrapper>
  );
};

function OverlayComponent() {
  return (
    <View style={s(`minW:150`)}>
      <OverlayAction>
        <Text style={s(`c:red`)}>Удалить</Text>
      </OverlayAction>
    </View>
  );
}

export function splitToChain(originalString: string, substrs: string[]) {
  let str = originalString;
  const res: [string, boolean][] = [];

  substrs.forEach(substr => {
    const regex = new RegExp(`${substr}`, 'ig');
    const matches = originalString.match(regex);

    if (matches === null) {
      return;
    }

    matches.forEach(match => {
      const index = str.indexOf(match);
      const beforeStr = str.substring(0, index);

      if (beforeStr.length !== 0) {
        res.push([beforeStr, false]);
      }
      res.push([match, true]);

      str = str.slice(match.length + index);
    });
  });

  if (str.length !== 0) {
    res.push([str, false]);
  }

  return res;
}
