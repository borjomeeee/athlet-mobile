import s from '@borjomeeee/rn-styles';
import {useLayout} from '@react-native-community/hooks';

import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {useRecoilValue} from 'recoil';

import * as UI from 'src/Components';
import {Training} from 'src/Store/Models/Training';
import {myTrainingsList} from 'src/Store/Trainings';
import {useTrainingListController} from './Hooks/Controller';
import {Header} from './Views/Header';
import {TrainingElement} from './Views/TrainingElement';

import GymIcon from 'src/Assets/Svg/Gym';

const BUTTON_PADDING_BOTTOM = 15;
export const List = () => {
  const {handlePressCreateTraining} = useTrainingListController();
  const myTrainings = useRecoilValue(myTrainingsList);
  const {onLayout, ...layout} = useLayout();

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
        ListEmptyComponent={EmptyComponent}
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

function EmptyComponent() {
  return (
    <UI.View style={s(`fill jcc aic container`)}>
      <GymIcon width={100} height={100} fill={'#CCCCCC'} />
      <UI.HSpacer size={20} />
      <UI.MultilineText style={s(`P5 semibold c:#CCCCCC`)}>
        {['Создайте первую', 'тренировку']}
      </UI.MultilineText>
      <UI.HSpacer size={40} />
    </UI.View>
  );
}
