import s from '@borjomeeee/rn-styles';
import React from 'react';

import * as UI from 'src/Components';
import {Training} from 'src/Store/Models/Training';

import dayjs from 'dayjs';
import {useTrainingListTrainingElementController} from '../Hooks';

import PlayIcon from 'src/Assets/Svg/Play';

interface TrainingElementProps {
  training: Training;
}
export const TrainingElement: React.FC<TrainingElementProps> = ({training}) => {
  const {handlePress, handlePressStart} =
    useTrainingListTrainingElementController(training.id);

  const formattedCreationDate = React.useMemo(
    () => dayjs(training.createdAt).format('DD/MM/YYYY'),
    [training.createdAt],
  );

  return (
    <UI.View style={s(`container`)}>
      <UI.Scalable onPress={handlePress}>
        <UI.ShadowView dx={0} dy={0} color={'#E1E4E875'} blur={10}>
          <UI.View style={s(`bgc:white ph:16 pv:12 br:20 minH:92 jcsb`)}>
            <UI.Text style={s(`P7 medium`)}>{training.title}</UI.Text>
            <UI.HSpacer size={10} />
            <UI.View style={s(`row jcsb`)}>
              <UI.View style={s(`row`)}>
                <Attribute label="CREATED AT" value={formattedCreationDate} />
                <UI.VSpacer size={20} />
                {training.author && (
                  <Attribute label="AUTHOR" value={training.author.nickname} />
                )}
              </UI.View>
              <UI.Pressable onPress={handlePressStart}>
                <UI.View style={s(`w:30 h:30 bgc:green br:6 aic jcc`)}>
                  <PlayIcon />
                </UI.View>
              </UI.Pressable>
            </UI.View>
          </UI.View>
        </UI.ShadowView>
      </UI.Scalable>
    </UI.View>
  );
};

interface AttributeProps {
  label: string;
  value: string;
}
const Attribute: React.FC<AttributeProps> = ({label, value}) => {
  return (
    <UI.View>
      <UI.Text style={s(`P10 bold c:#ACACAC`)}>{label}</UI.Text>
      <UI.HSpacer size={3} />
      <UI.Text style={s(`P9 medium`)}>{value}</UI.Text>
    </UI.View>
  );
};
