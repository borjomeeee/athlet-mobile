import React from 'react';
import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';
import {useRecoilValue} from 'recoil';
import {isEditingSelector} from '../../../Store';
import Animated from 'react-native-reanimated';
import RemoveIcon from 'src/Assets/Svg/Remove';

interface ExerciseViewProps {
  title: string;

  restInfo: string;
  valueInfo: string;

  handlePressRest?: () => void;
  handlePress?: () => void;
  handlePressRemove?: () => void;
}
export const ExerciseView: React.FC<ExerciseViewProps> = React.memo(
  ({
    handlePress,
    handlePressRest,
    handlePressRemove,

    title,
    restInfo,
    valueInfo,
  }) => {
    const isEditing = useRecoilValue(isEditingSelector);

    return (
      <UI.PressableItem
        style={s(`bgc:white pv:8 ofv pr:20 pl:12`, `bbw:1 btw:1 bc:#DADADA`)}
        onPress={handlePress}
        disabled={!isEditing}>
        <UI.View style={s(`row aic`)}>
          {isEditing && (
            <Animated.View
            // entering={ZoomIn} exiting={ZoomOut}
            >
              <UI.Pressable onPress={handlePressRemove}>
                <RemoveIcon />
              </UI.Pressable>
            </Animated.View>
          )}

          <UI.VSpacer size={8} />
          <Animated.View style={s(`fill`)}>
            <UI.Text>{title}</UI.Text>
            <UI.Pressable
              style={s(`asfs`)}
              onPress={handlePressRest}
              disabled={!isEditing}>
              <UI.Text style={s(`P8 medium c:gray`)}>{restInfo}</UI.Text>
            </UI.Pressable>
          </Animated.View>
          <Animated.View>
            <UI.Text>{valueInfo}</UI.Text>
          </Animated.View>

          {isEditing && <UI.VSpacer size={28} />}
        </UI.View>
      </UI.PressableItem>
    );
  },
);
