import s from '@borjomeeee/rn-styles';
import {useLayout} from '@react-native-community/hooks';
import {useFocusEffect} from '@react-navigation/core';

import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {useRecoilValue} from 'recoil';

import * as UI from 'src/Components';
import {useAppController} from 'src/Services/App';
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
  const {defaultHandleError} = useAppController();

  const myTrainings = useRecoilValue(myTrainingsList);
  const {onLayout, ...layout} = useLayout();

  useFocusEffect(
    React.useCallback(() => {
      getMyTrainings().then(([_, err]) => {
        if (err) {
          defaultHandleError(err);
        }
      });
    }, [getMyTrainings, defaultHandleError]),
  );

  return (
    <>
      <UI.FlatList
        data={myTrainings}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={s(`fill bgc:layout`)}
        contentContainerStyle={s(
          `fill pb:${BUTTON_PADDING_BOTTOM * 2 + layout.height}`,
        )}
        ListHeaderComponent={Header}
        ItemSeparatorComponent={ItemSeparator}
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
  return <TrainingElement training={item} />;
}

function ItemSeparator() {
  return <UI.HSpacer size={15} />;
}
