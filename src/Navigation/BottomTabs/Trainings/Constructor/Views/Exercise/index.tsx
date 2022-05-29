import React from 'react';

import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';
import {ExerciseUtils} from 'src/Store/ModelsUtils/Exercise';
import {TimeUtils} from 'src/Store/ModelsUtils/Time';
import Animated, {
  interpolateColor,
  Layout,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {Pressable} from 'src/Components';

import {AnimatedExercisesPositions} from '../../Types';

import DragIcon from 'src/Assets/Svg/Drag';
import {GestureDetector} from 'react-native-gesture-handler';
import {useDraggableController} from '../../Hooks/Draggable';
import {LayoutChangeEvent} from 'react-native';

import RemoveIcon from 'src/Assets/Svg/Remove';
import {useRecoilValue} from 'recoil';
import {isEditingSelector} from '../../Store';
import {useTrainingExerciseController} from './Controller';
import {ExerciseWithId} from '../../Store/Types';
import {
  useValue as useSkiaValue,
  useDerivedValue as useSkiaDerivedValue,
  useSharedValueEffect,
} from '@shopify/react-native-skia';

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
          <Animated.View style={s(`fill`)} layout={Layout}>
            <UI.Text>{title}</UI.Text>
            <Pressable
              style={s(`asfs`)}
              onPress={handlePressRest}
              disabled={!isEditing}>
              <UI.Text style={s(`P8 medium c:gray`)}>{restInfo}</UI.Text>
            </Pressable>
          </Animated.View>
          <Animated.View layout={Layout}>
            <UI.Text>{valueInfo}</UI.Text>
          </Animated.View>

          {isEditing && <UI.VSpacer size={28} />}
        </UI.View>
      </UI.PressableItem>
    );
  },
);

interface ExerciseProps {
  exercisesPositions: AnimatedExercisesPositions;

  exercise: ExerciseWithId;

  handlePressRest?: () => void;
  handlePress?: () => void;
  handlePressRemove?: () => void;

  scrollViewRef: React.RefObject<Animated.ScrollView>;
  scrollY: Animated.SharedValue<number>;
}
export const Exercise: React.FC<ExerciseProps> = React.memo(
  ({
    exercise,

    handlePressRest,
    handlePress,
    handlePressRemove,

    exercisesPositions,
    scrollViewRef,
    scrollY,
  }) => {
    const isEditing = useRecoilValue(isEditingSelector);
    const animatedRef = useAnimatedRef<Animated.View>();

    const id = React.useMemo(() => exercise.elementId, [exercise]);
    const {
      isDragging,
      isPressed,
      initialScrollY,
      draggingGesture,
      gestureTranslateY,
      offsetY,
      layout,
    } = useDraggableController(id, exercisesPositions, scrollViewRef, scrollY);

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
              : withTiming(offsetY.value),
          },
          {
            scale: withTiming(isPressed.value ? 1.05 : 1, {duration: 50}),
          },
        ],

        zIndex: isPressed.value ? 100 : 1,
      };
    });

    const animatedIsPressed = useDerivedValue(() =>
      withTiming(+isPressed.value),
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
        // TODO: animation not working
        // entering={isNew.value ? SlideInRight : undefined}
        // exiting={isNew.value ? SlideOutLeft : undefined}
        layout={Layout}>
        <UI.ShadowView dx={10} dy={10} blur={10} color={color}>
          <ExerciseView
            title={exercise.baseExercise.title}
            restInfo={formattedRest}
            valueInfo={value}
            {...{handlePress, handlePressRest, handlePressRemove}}
          />
        </UI.ShadowView>

        {isEditing && (
          <GestureDetector gesture={draggingGesture}>
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
  },
);

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
