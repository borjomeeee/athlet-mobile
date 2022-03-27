import s from '@borjomeeee/rn-styles';
import {useFocusEffect} from '@react-navigation/core';

import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRecoilValue} from 'recoil';

import * as UI from 'src/Components';
import {useTrainingsService} from 'src/Services/Trainings';
import {Training} from 'src/Store/Models/Training';
import {myTrainingsList} from 'src/Store/Trainings';
import {Header} from './Views/Header';
import {TrainingElement} from './Views/TrainingElement';

export const List = () => {
  const {getMyTrainings} = useTrainingsService();
  const myTrainings = useRecoilValue(myTrainingsList);

  useFocusEffect(
    React.useCallback(() => {
      getMyTrainings();
    }, [getMyTrainings]),
  );

  return (
    <>
      <UI.View style={s(`abs t:0 b:0 r:0 l:0`)}>
        <UI.View style={s(`fill bgc:white`)} />
        <UI.View style={s(`fill bgc:layout`)} />
      </UI.View>

      <UI.FlatList
        data={myTrainings}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={s(`fill`)}
        contentContainerStyle={s(`fill bgc:layout`)}
        ListHeaderComponent={ListHeaderComponent}
      />
    </>
  );
};

function keyExtractor(item: Training) {
  return item.id;
}

function renderItem({item}: ListRenderItemInfo<Training>) {
  return <TrainingElement trainining={item} />;
}

function ListHeaderComponent() {
  const {top} = useSafeAreaInsets();
  return (
    <UI.View style={s(`bgc:white`)}>
      <UI.HSpacer size={top} />
      <Header />
      <UI.HSpacer size={8} />
    </UI.View>
  );
}
