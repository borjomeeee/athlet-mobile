import React from 'react';

import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';
import {ExerciseUtils} from 'src/Store/ModelsUtils/Exercise';
import {TimeUtils} from 'src/Store/ModelsUtils/Time';
import Animated, {
  interpolateColor,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {Pressable} from 'src/Components';

import DragIcon from 'src/Assets/Svg/Drag';
import {GestureDetector} from 'react-native-gesture-handler';
import {useDraggableGesture} from '../../Hooks/Draggable';

import RemoveIcon from 'src/Assets/Svg/Remove';
import {useRecoilValue} from 'recoil';
import {isEditingSelector} from '../../Store';
import {useTrainingExerciseController} from './Controller';
import {ExerciseWithId} from '../../Store/Types';
import {
  useValue as useSkiaValue,
  useSharedValueEffect,
} from '@shopify/react-native-skia';
import {AnimationsContext} from '../../Store/Animations';
import {DraggableListState} from '../../Types';

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
            <Pressable
              style={s(`asfs`)}
              onPress={handlePressRest}
              disabled={!isEditing}>
              <UI.Text style={s(`P8 medium c:gray`)}>{restInfo}</UI.Text>
            </Pressable>
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

interface ExerciseProps {
  exercise: ExerciseWithId;

  handlePressRest?: () => void;
  handlePress?: () => void;
  handlePressRemove?: () => void;

  order: number;
}
export const Exercise: React.FC<ExerciseProps> = ({
  exercise,

  handlePressRest,
  handlePress,
  handlePressRemove,

  order,
}) => {
  const {activeIndex, state} = React.useContext(AnimationsContext);

  const isEditing = useRecoilValue(isEditingSelector);
  const gesture = useDraggableGesture(order);

  const formattedRest = React.useMemo(() => {
    const restStr = TimeUtils.getFormattedTimeForTraining(
      exercise.restAfterComplete,
    );

    return restStr ? `Отдых - ${restStr}` : 'Без отдыха';
  }, [exercise]);

  const value = React.useMemo(() => {
    if (ExerciseUtils.isRepsExercise(exercise)) {
      return `${exercise.reps} раз.`;
    } else if (ExerciseUtils.isTimeExercise(exercise)) {
      return TimeUtils.getFormattedTimeForTraining(exercise.time);
    } else if (ExerciseUtils.isGymExercise(exercise)) {
      return `${exercise.reps} x ${exercise.kg} кг.`;
    }

    return 'Undefined';
  }, [exercise]);

  const animatedIsPressed = useDerivedValue(() =>
    withTiming(
      +(
        activeIndex.value === order &&
        state.value === DraggableListState.DRAGGING
      ),
    ),
  );
  const color = useSkiaValue('#00000000');

  useSharedValueEffect(() => {
    const newColor = interpolateColor(
      animatedIsPressed.value,
      [0, 1],
      ['#00000000', '#00000030'],
    );

    if (typeof newColor === 'string') {
      color.current = newColor;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  }, [animatedIsPressed]);

  return (
    <Animated.View

    // TODO: animation not working
    // entering={isNew.value ? SlideInRight : undefined}
    // exiting={isNew.value ? SlideOutLeft : undefined}
    >
      <UI.ShadowView dx={10} dy={10} blur={10} color={color}>
        <ExerciseView
          title={exercise.baseExercise.title}
          restInfo={formattedRest}
          valueInfo={value}
          {...{handlePress, handlePressRest, handlePressRemove}}
        />
      </UI.ShadowView>

      {isEditing && (
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={s(`abs r:20 t:0 b:0 jcc`)}
            //  entering={ZoomIn}
            //  exiting={ZoomOut}
          >
            <DragIcon />
          </Animated.View>
        </GestureDetector>
      )}
    </Animated.View>
  );
};

export const TrainingExercise: React.FC<ExerciseProps> = ({
  exercise,
  ...props
}) => {
  const {handlePress, handlePressEditRest, handlePressRemove} =
    useTrainingExerciseController(exercise.elementId);

  return (
    <Exercise
      handlePress={handlePress}
      handlePressRest={handlePressEditRest}
      handlePressRemove={handlePressRemove}
      exercise={exercise}
      {...props}
    />
  );
};
