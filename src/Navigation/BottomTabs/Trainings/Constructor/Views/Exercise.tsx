import React from 'react';

import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';
import {ExerciseUtils} from 'src/Store/ModelsUtils/Exercise';
import {TimeUtils} from 'src/Store/ModelsUtils/Time';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Pressable} from 'src/Components';
import {
  useTrainingConstructorController,
  useTrainingConstructorElementController,
  useTrainingConstructorExerciseController,
  useTrainingConstructorSetExerciseController,
} from '../Hooks';

import {
  AnimatedExercisesPositions,
  ConstructorExercise,
  ConstructorSetExercise,
} from '../Types';

import DragIcon from 'src/Assets/Svg/Drag';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useDraggableController} from '../Hooks/Draggable';
import {LayoutChangeEvent} from 'react-native';

interface ExerciseProps {
  exercisesPositions: AnimatedExercisesPositions;

  exercise: ConstructorExercise;

  handlePressRest?: () => void;
  handlePress?: () => void;
}
export const Exercise: React.FC<ExerciseProps> = React.memo(
  ({
    exercise,

    handlePressRest,
    handlePress,

    exercisesPositions,
  }) => {
    const {replaceExercises} = useTrainingConstructorController();
    const animatedRef = useAnimatedRef<Animated.View>();

    const id = React.useMemo(() => exercise.elementId, [exercise]);
    const {layout, swap} = useDraggableController(exercisesPositions);

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

    const isDragging = useSharedValue(false);

    const translateY = useSharedValue(0);

    const changed = useSharedValue(false);
    const offsetY = useSharedValue(0);

    useAnimatedReaction(
      () => exercisesPositions.value,
      positions => {
        if (positions[id]) {
          offsetY.value = positions[id].tempOffsetY || 0;
          changed.value = !!positions[id].changed;

          if (isDragging.value) {
            return;
          }

          translateY.value = changed.value
            ? withTiming(offsetY.value)
            : offsetY.value;
        }
      },
    );

    const gesture = Gesture.Pan()
      .onTouchesDown(() => {
        isDragging.value = true;
      })
      .onUpdate(e => {
        translateY.value = e.translationY;
      })
      .onEnd(() => {
        translateY.value = withTiming(offsetY.value, {}, isFinished => {
          if (isFinished) {
            const orderedPositionsIds = Object.values(exercisesPositions.value)
              .sort((pos1, pos2) => pos1.order - pos2.order)
              .map(pos => pos.id);

            runOnJS(replaceExercises)(orderedPositionsIds);
          }
        });
      })
      .onTouchesUp(() => {
        isDragging.value = false;
      });

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: translateY.value,
          },
          {
            scale: withTiming(isDragging.value ? 1.05 : 1, {duration: 50}),
          },
        ],

        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: withTiming(isDragging.value ? 0.1 : 0, {duration: 100}),
        shadowRadius: 6.27,

        elevation: 10,
        zIndex: isDragging.value ? 100 : 1,
      };
    });

    useAnimatedReaction(
      () => {
        if (!isDragging.value) {
          return id;
        }

        const currentPosition = exercisesPositions.value[id];
        if (!currentPosition) {
          return id;
        }

        for (const key in exercisesPositions.value) {
          const position = exercisesPositions.value[key];
          if (!position) {
            continue;
          }

          if (currentPosition.order > position.order) {
            if (
              currentPosition.offsetY + translateY.value <
              position.offsetY + position.tempOffsetY
            ) {
              return position.id;
            }
          } else if (currentPosition.order < position.order) {
            if (
              currentPosition.offsetY + translateY.value >
              position.offsetY + position.tempOffsetY
            ) {
              return position.id;
            }
          }
        }

        return id;
      },
      newId => {
        if (newId === id) {
          return;
        }

        runOnJS(swap)(id, newId);
      },
    );

    const handleLayout = React.useCallback(
      (e: LayoutChangeEvent) => {
        layout(id, e.nativeEvent.layout.height);
      },
      [layout, id],
    );

    return (
      <Animated.View
        ref={animatedRef}
        style={animatedStyle}
        onLayout={handleLayout}>
        <UI.PressableItem
          style={s(`container bgc:white pv:8 ofv`, `bbw:1 btw:1 bc:#DADADA`)}
          onPress={handlePress}>
          <UI.View style={s(`row aic`)}>
            <UI.View style={s(`fill`)}>
              <UI.Text>{exercise.title}</UI.Text>
              <Pressable style={s(`asfs`)} onPress={handlePressRest}>
                <UI.Text style={s(`P8 medium c:gray`)}>
                  Отдых - {formattedRest}
                </UI.Text>
              </Pressable>
            </UI.View>
            <UI.View>
              <UI.Text>{value}</UI.Text>
            </UI.View>
            <UI.VSpacer size={28} />
          </UI.View>
        </UI.PressableItem>

        <GestureDetector gesture={gesture}>
          <UI.View style={s(`abs r:20 t:0 b:0 jcc`)}>
            <DragIcon />
          </UI.View>
        </GestureDetector>

        {/* <UI.View style={s(`abs h:1 bgc:#DADADA r:0 l:0 t:-1 zi:10`)} />
      <UI.View style={s(`abs h:1 bgc:#DADADA r:0 l:0 b:-2 zi:10`)} /> */}
      </Animated.View>
    );
  },
);

export const TrainingExercise: React.FC<ExerciseProps> = ({
  exercise,
  ...props
}) => {
  const {handlePressEditRest} = useTrainingConstructorElementController(
    exercise.elementId,
  );
  const {handlePress} = useTrainingConstructorExerciseController(
    exercise.elementId,
  );

  return (
    <Exercise
      handlePress={handlePress}
      handlePressRest={handlePressEditRest}
      exercise={exercise}
      {...props}
    />
  );
};

// TODO: fix problem with sets

interface SetExerciseProps extends Omit<ExerciseProps, 'exercise'> {
  setId: string;
  exercise: ConstructorSetExercise;
}
export const SetExercise: React.FC<SetExerciseProps> = ({
  setId,
  exercise,
  ...props
}) => {
  const {handlePressEditRest, handlePress} =
    useTrainingConstructorSetExerciseController(setId, exercise.order);

  return (
    <Exercise
      handlePress={handlePress}
      handlePressRest={handlePressEditRest}
      exercise={exercise}
      {...props}
    />
  );
};
