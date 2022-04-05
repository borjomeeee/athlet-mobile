import React from 'react';

import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';
import {ExerciseUtils} from 'src/Store/ModelsUtils/Exercise';
import {TimeUtils} from 'src/Store/ModelsUtils/Time';
import Animated, {
  SlideInRight,
  SlideOutLeft,
  useAnimatedRef,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Pressable} from 'src/Components';
import {useTrainingConstructorExerciseController} from '../Hooks';

import {AnimatedExercisesPositions, ConstructorExercise} from '../Types';

import DragIcon from 'src/Assets/Svg/Drag';
import {GestureDetector} from 'react-native-gesture-handler';
import {useDraggableController} from '../Hooks/Draggable';
import {LayoutChangeEvent, ScrollView} from 'react-native';

interface ExerciseViewProps {
  title: string;

  restInfo: string;
  valueInfo: string;

  handlePressRest?: () => void;
  handlePress?: () => void;
}
export const ExerciseView: React.FC<ExerciseViewProps> = React.memo(
  ({
    handlePress,
    handlePressRest,

    title,
    restInfo,
    valueInfo,
  }) => {
    return (
      <UI.PressableItem
        style={s(`container bgc:white pv:8 ofv`, `bbw:1 btw:1 bc:#DADADA`)}
        onPress={handlePress}>
        <UI.View style={s(`row aic`)}>
          <UI.View style={s(`fill`)}>
            <UI.Text>{title}</UI.Text>
            <Pressable style={s(`asfs`)} onPress={handlePressRest}>
              <UI.Text style={s(`P8 medium c:gray`)}>
                Отдых - {restInfo}
              </UI.Text>
            </Pressable>
          </UI.View>
          <UI.View>
            <UI.Text>{valueInfo}</UI.Text>
          </UI.View>
          <UI.VSpacer size={28} />
        </UI.View>
      </UI.PressableItem>
    );
  },
);

interface ExerciseProps {
  exercisesPositions: AnimatedExercisesPositions;

  exercise: ConstructorExercise;

  handlePressRest?: () => void;
  handlePress?: () => void;

  scrollViewRef: React.RefObject<Animated.ScrollView>;
  scrollY: Animated.SharedValue<number>;
}
export const Exercise: React.FC<ExerciseProps> = React.memo(
  ({
    exercise,

    handlePressRest,
    handlePress,

    exercisesPositions,
    scrollViewRef,
    scrollY,
  }) => {
    const animatedRef = useAnimatedRef<Animated.View>();

    const id = React.useMemo(() => exercise.elementId, [exercise]);
    const {
      isDragging,
      isPressed,
      initialScrollY,
      draggingGesture,
      gestureTranslateY,
      changed,
      offsetY,
      layout,
    } = useDraggableController(id, exercisesPositions, scrollViewRef, scrollY);

    const formattedRest = React.useMemo(() => {
      return (
        TimeUtils.getFormattedTimeForTraining(exercise.restAfterComplete) ||
        'Без отдыха'
      );
    }, [exercise]);

    const value = React.useMemo(() => {
      if (ExerciseUtils.isRepsExercise(exercise)) {
        return `${exercise.reps} раз.`;
      } else if (ExerciseUtils.isTimeExercise(exercise)) {
        return TimeUtils.getFormattedTimeForTraining(exercise.time) || '0 сек.';
      } else if (ExerciseUtils.isGymExercise(exercise)) {
        return `${exercise.reps} x ${exercise.kg} кг.`;
      }

      return 'Undefined';
    }, [exercise]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: isDragging.value
              ? gestureTranslateY.value + (scrollY.value - initialScrollY.value)
              : changed.value
              ? withTiming(offsetY.value)
              : offsetY.value,
          },
          {
            scale: withTiming(isPressed.value ? 1.05 : 1, {duration: 50}),
          },
        ],

        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: withTiming(isPressed.value ? 0.1 : 0, {duration: 100}),
        shadowRadius: 6.27,

        elevation: 10,
        zIndex: isPressed.value ? 100 : 1,
      };
    });

    const handleLayout = React.useCallback(
      (e: LayoutChangeEvent) => {
        layout(e.nativeEvent.layout.height);
      },
      [layout],
    );

    return (
      <Animated.View
        ref={animatedRef}
        style={animatedStyle}
        onLayout={handleLayout}
        entering={SlideInRight}
        exiting={SlideOutLeft}>
        <ExerciseView
          title={exercise.title}
          restInfo={formattedRest}
          valueInfo={value}
          {...{handlePress, handlePressRest}}
        />

        <GestureDetector gesture={draggingGesture}>
          <UI.View style={s(`abs r:20 t:0 b:0 jcc`)}>
            <DragIcon />
          </UI.View>
        </GestureDetector>
      </Animated.View>
    );
  },
);

export const TrainingExercise: React.FC<
  Pick<
    ExerciseProps,
    'exercise' | 'exercisesPositions' | 'scrollViewRef' | 'scrollY'
  >
> = ({exercise, ...props}) => {
  const {handlePress, handlePressEditRest} =
    useTrainingConstructorExerciseController(exercise.elementId);

  return (
    <Exercise
      handlePress={handlePress}
      handlePressRest={handlePressEditRest}
      exercise={exercise}
      {...props}
    />
  );
};
