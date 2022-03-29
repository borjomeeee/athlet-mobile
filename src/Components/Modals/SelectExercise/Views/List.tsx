import s from '@borjomeeee/rn-styles';
import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRecoilValue} from 'recoil';
import {FlatList, Text, View} from 'src/Components/Common';
import {PressableItem} from 'src/Components/Pressable';
import {useModal} from 'src/Lib/ModalRouter';
import {Exercise} from 'src/Store/Models/Training';
import {
  exercisesBySearchInputStoreFamily,
  searchInputStoreFamily,
} from '../Store';

interface ListProps {
  id: string;
  onSelect: (exercise: Exercise) => void;
}
export const List: React.FC<ListProps> = ({id, onSelect}) => {
  const {hide} = useModal(id);
  const {bottom} = useSafeAreaInsets();

  const searchValue = useRecoilValue(searchInputStoreFamily(id));
  const exercises = useRecoilValue(exercisesBySearchInputStoreFamily(id));

  const handlePressExercise = React.useCallback(
    (exercise: Exercise) => {
      onSelect(exercise);
      hide();
    },
    [onSelect, hide],
  );

  const renderItem = React.useCallback(
    ({item}: ListRenderItemInfo<Exercise>) => {
      const res = splitToChain(
        item.title,
        searchValue.split(/\s+/).filter(v => v.length !== 0),
      );

      return (
        <PressableItem
          style={s(`container pv:10 bgc:white`)}
          underlayColor="#D0D7DE32"
          onPress={() => handlePressExercise(item)}>
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
      );
    },
    [handlePressExercise, searchValue],
  );

  return (
    <FlatList
      data={exercises}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={EmptyComponent}
      style={s(`fill pb:${20 + bottom}`)}
      contentContainerStyle={s(`fill`)}
    />
  );
};

function keyExtractor(exercise: Exercise) {
  return exercise.id;
}

function splitToChain(originalString: string, substrs: string[]) {
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

function EmptyComponent() {
  return (
    <View style={s(`fill aic jcc`)}>
      <Text style={s(`P7 tac c:gray`)}>Упражнений не найдено</Text>
    </View>
  );
}
