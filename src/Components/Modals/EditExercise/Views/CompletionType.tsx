import s from '@borjomeeee/rn-styles';
import {useDimensions} from '@react-native-community/hooks';
import React from 'react';
import {Pressable} from 'react-native';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {useRecoilValue} from 'recoil';
import {Text, View} from 'src/Components/Common';
import {ExerciseCompletionType} from 'src/Store/Models/Training';
import {useEditExerciseController} from '../Hooks';
import {completionTypeStoreFamily} from '../Store';

interface CompletionTypeProps {
  id: string;
}

const itemIndex = {
  [ExerciseCompletionType.REPS]: 0,
  [ExerciseCompletionType.TIME]: 1,
  [ExerciseCompletionType.GYM]: 2,
};
export const CompletionType: React.FC<CompletionTypeProps> = ({id}) => {
  const {screen} = useDimensions();
  const itemWidth = (screen.width - 40 - 6 - 2) / 3;

  const {changeCompletionType} = useEditExerciseController(id);
  const selectedCompletionType = useRecoilValue(completionTypeStoreFamily(id));

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: 2,
    bottom: 2,
    left: 2,

    backgroundColor: '#fff',
    borderRadius: 7,

    width: itemWidth,
    transform: [
      {
        translateX: withSpring(itemIndex[selectedCompletionType] * itemWidth, {
          mass: 0.5,
        }),
      },
    ],
  }));

  return (
    <View style={s(`rel h:32 p:2 bgc:#76768012 br:9`)}>
      <View style={s(`rel fill row aic`)}>
        <SelectableItem
          label="повторения"
          value={ExerciseCompletionType.REPS}
          isSelected={selectedCompletionType === ExerciseCompletionType.REPS}
          onSelect={changeCompletionType}
        />
        <Separator />
        <SelectableItem
          label="время"
          value={ExerciseCompletionType.TIME}
          isSelected={selectedCompletionType === ExerciseCompletionType.TIME}
          onSelect={changeCompletionType}
        />
        <Separator />
        <SelectableItem
          label="gym"
          value={ExerciseCompletionType.GYM}
          isSelected={selectedCompletionType === ExerciseCompletionType.GYM}
          onSelect={changeCompletionType}
        />

        <Animated.View style={animatedStyle} />
      </View>
    </View>
  );
};

interface SelectableItemProps {
  label: string;
  value: ExerciseCompletionType;

  isSelected?: boolean;
  onSelect: (value: ExerciseCompletionType) => void;
}
const SelectableItem: React.FC<SelectableItemProps> = ({
  label,
  value,
  onSelect,
  isSelected,
}) => {
  const handlePress = React.useCallback(
    () => onSelect(value),
    [onSelect, value],
  );

  return (
    <Pressable style={s(`fill zi:100`)} onPress={handlePress}>
      <View style={s(`fill aic jcc`)}>
        <Text style={s(`P8`, isSelected && `medium`)}>{label}</Text>
      </View>
    </Pressable>
  );
};

const Separator = () => {
  return <View style={s(`h:16 w:1 br:2 bgc:#8E8E9330`)} />;
};
