import s from '@borjomeeee/rn-styles';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRecoilValue} from 'recoil';
import {FlatList, Text, View} from 'src/Components/Common';
import {Exercise as ExerciseModel} from 'src/Store/Models/Training';
import {exercisesBySearchInputStoreFamily} from '../Store';
import {Exercise} from './Exercise';

interface ListProps {
  id: string;
  onSelect: (exercise: ExerciseModel) => void;
}
export const List: React.FC<ListProps> = ({id}) => {
  const {bottom} = useSafeAreaInsets();
  const exercises = useRecoilValue(exercisesBySearchInputStoreFamily(id));

  const renderItem = React.useCallback(
    ({item}: ListRenderItemInfo<ExerciseModel>) => {
      return <Exercise modalId={id} exercise={item} />;
    },
    [id],
  );

  return (
    <BottomSheetFlatList
      data={exercises}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={EmptyComponent}
      showsVerticalScrollIndicator={false}
      style={s(exercises.length === 0 && `fill`)}
      contentContainerStyle={s(
        `pb:${20 + bottom}`,
        exercises.length === 0 && `fill`,
      )}
    />
  );
};

function keyExtractor(exercise: ExerciseModel) {
  return exercise.id;
}

function EmptyComponent() {
  return (
    <View style={s(`fill aic jcc`)}>
      <Text style={s(`P7 tac c:gray`)}>Упражнений не найдено</Text>
    </View>
  );
}
