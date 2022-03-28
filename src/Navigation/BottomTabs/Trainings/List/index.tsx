import s from '@borjomeeee/rn-styles';
import {useLayout} from '@react-native-community/hooks';
import {useFocusEffect} from '@react-navigation/core';

import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRecoilValue} from 'recoil';

import * as UI from 'src/Components';
import {useTrainingsService} from 'src/Services/Trainings';
import {Training} from 'src/Store/Models/Training';
import {myTrainingsList} from 'src/Store/Trainings';
import {useTrainingListController} from './Hooks';
import {Header} from './Views/Header';
import {TrainingElement} from './Views/TrainingElement';

const BUTTON_PADDING_BOTTOM = 15;
export const List = () => {
  const {getMyTrainings} = useTrainingsService();
  const {handlePressCreateTraining} = useTrainingListController();
  const myTrainings = useRecoilValue(myTrainingsList);

  const {onLayout, ...layout} = useLayout();

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
        contentContainerStyle={s(
          `fill bgc:layout`,
          `pb:${BUTTON_PADDING_BOTTOM * 2 + layout.height}`,
        )}
        ListHeaderComponent={ListHeaderComponent}
      />

      <UI.View
        style={s(`abs l:0 b:${BUTTON_PADDING_BOTTOM} r:0 container`)}
        onLayout={onLayout}>
        <UI.Button
          onPress={handlePressCreateTraining}
          style={s(`bgc:green`)}
          label="Создать тренировку"
        />
      </UI.View>
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
