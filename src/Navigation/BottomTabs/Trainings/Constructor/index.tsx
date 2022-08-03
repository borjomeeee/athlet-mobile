import s from '@borjomeeee/rn-styles';
import React from 'react';
import Animated, {
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useSharedValue,
  runOnUI,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  useAnimatedRef,
} from 'react-native-reanimated';
import {useRecoilValue} from 'recoil';

import * as UI from 'src/Components';
import {withHooks} from 'src/Utils/HOCs';
import {useTrainingConstructorController} from './Controller';
import {useTrainingConstructorCustomHeader} from './Hooks/CustomHeader';
import {useTrainingConstructorInitialTraining} from './Hooks/InitialTraining';
import {useTrainingConstructorNavigationEffect} from './Hooks/NavigationEffect';
import {constructorViewElementsSelector} from './Store';
import {AddElementButton} from './Views/AddElementButton';
import {Header} from './Views/Header';
import {Submit} from './Views/Submit';
import {AnimationsContext, useAnimationsValues} from './Store/Animations';
import {
  ConstructorElementType,
  ConstructorElementViewList,
  ConstructorElementViewListItem,
} from './Types';
import {
  FlatList,
  FlatListProps,
  LayoutChangeEvent,
  ListRenderItemInfo,
  ViewStyle,
} from 'react-native';
import {TrainingExercise} from './Views/Exercise';
import {SetHeader} from './Views/SetHeader';
import {SetFooter} from './Views/SetFooter';

const AnimatedFlatList = Animated.createAnimatedComponent<
  FlatListProps<ConstructorElementViewListItem> & {
    ref?: React.RefObject<FlatList>;
  }
>(FlatList);

export const Constructor = withHooks(
  [
    useTrainingConstructorInitialTraining,
    useTrainingConstructorNavigationEffect,
    useTrainingConstructorCustomHeader,
  ],
  () => {
    const flatListRef = useAnimatedRef<FlatList>();

    const _viewElements = useRecoilValue(constructorViewElementsSelector);
    const viewElements = React.useMemo(
      () =>
        JSON.parse(JSON.stringify(_viewElements)) as ConstructorElementViewList,
      [_viewElements],
    );

    const {
      scrollY,
      containerHeight,
      scrollViewHeight,
      activeIndex,
      guessActiveIndex,
      activeCellTranslateY,
      state,
      measurmentsStore,
    } = useAnimationsValues(viewElements);

    const handleScroll = useAnimatedScrollHandler(
      e => (scrollY.value = e.contentOffset.y),
    );

    const {reset, reorder} = useTrainingConstructorController();
    React.useEffect(() => () => reset(), [reset]);

    const value = React.useMemo(
      () => ({
        flatListRef,
        scrollY,
        containerHeight,
        scrollViewHeight,
        activeIndex,
        guessActiveIndex,
        data: viewElements,
        state,
        reorder,
        measurmentsStore,
        activeCellTranslateY,
      }),
      [
        flatListRef,
        activeIndex,
        scrollY,
        containerHeight,
        scrollViewHeight,
        guessActiveIndex,
        measurmentsStore,
        state,
        viewElements,
        activeCellTranslateY,
        reorder,
      ],
    );

    React.useEffect(() => {
      runOnUI(() => {
        'worklet';
        activeIndex.value = undefined;
      })();
    }, [activeIndex, viewElements]);

    const onLayout = React.useCallback(
      (e: LayoutChangeEvent) => {
        runOnUI(() => {
          'worklet';
          containerHeight.value = e.nativeEvent.layout.height;
        })();
      },
      [containerHeight],
    );

    const onContentSizeChanged = React.useCallback(
      (w: number, h: number) => {
        runOnUI(() => {
          'worklet';
          scrollViewHeight.value = h;
        })();
      },
      [scrollViewHeight],
    );

    return (
      <AnimationsContext.Provider value={value}>
        <UI.View style={s(`fill bgc:layout`)}>
          <AnimatedFlatList
            ref={flatListRef}
            data={viewElements}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={s(`pb:100`)}
            onLayout={onLayout}
            onContentSizeChange={onContentSizeChanged}
            scrollEventThrottle={16}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            CellRendererComponent={renderCell}
            onScroll={handleScroll}
            removeClippedSubviews={false}
            bounces={false}
          />

          <UI.View style={s(`abs r:0 l:0 b:20`)}>
            <Submit />
          </UI.View>
        </UI.View>
      </AnimationsContext.Provider>
    );
  },
);

const CellRendererComponent: React.FC<any> = React.memo(
  ({style: providedStyle, index, onLayout, ...props}) => {
    const ctx = React.useContext(AnimationsContext);
    const {
      activeIndex,
      activeCellTranslateY,
      guessActiveIndex,
      data: list,
      measurmentsStore,
    } = ctx;

    const offsetY = useDerivedValue(() => {
      const initialTranslateY = 0;

      if (
        activeIndex.value === undefined ||
        guessActiveIndex.value === undefined
      ) {
        return initialTranslateY;
      }

      if (activeIndex.value > index && guessActiveIndex.value <= index) {
        return withTiming(
          initialTranslateY +
            measurmentsStore.value[list[activeIndex.value].id] || 0,
        );
      } else if (activeIndex.value < index && guessActiveIndex.value >= index) {
        return withTiming(
          initialTranslateY -
            measurmentsStore.value[list[activeIndex.value].id] || 0,
        );
      }

      return withTiming(initialTranslateY);
    }, [list, index]);

    const translateStyle = useAnimatedStyle(() => {
      return {
        zIndex: index === activeIndex.value ? 999 : 0,
        transform: [
          {
            translateY:
              activeIndex.value === index
                ? offsetY.value + activeCellTranslateY.value
                : offsetY.value,
          },
        ],
      };
    });

    const handleLayout = React.useCallback(
      (event: LayoutChangeEvent) => {
        runOnUI(() => {
          'worklet';
          measurmentsStore.value = {
            ...measurmentsStore.value,
            [list[index].id]: event.nativeEvent.layout.height,
          };
        })();

        onLayout?.(event);
      },
      [measurmentsStore, list, index, onLayout],
    );

    const style = React.useMemo(
      () => [providedStyle, translateStyle],
      [providedStyle, translateStyle],
    );

    return <Animated.View style={style} onLayout={handleLayout} {...props} />;
  },
);
const renderCell = (props: {style: ViewStyle; index: number}) => (
  <CellRendererComponent {...props} />
);

const renderItem = ({
  item: element,
  index: indx,
}: ListRenderItemInfo<ConstructorElementViewListItem>) => {
  if (element.type === ConstructorElementType.EXERCISE) {
    return (
      <TrainingExercise
        key={element.id}
        exercise={element.element}
        order={indx}
      />
    );
  } else if (element.type === ConstructorElementType.SET_HEADER) {
    return (
      <SetHeader
        setId={element.element.elementId}
        title={element.element.title}
      />
    );
  } else if (element.type === ConstructorElementType.SET_FOOTER) {
    return (
      <SetFooter
        setId={element.element.elementId}
        restAfterComplete={element.element.restAfterComplete}
      />
    );
  }

  return null;
};
const keyExtractor = (item: ConstructorElementViewListItem) => item.id;

function ListHeaderComponent() {
  return (
    <>
      <Header />
      <UI.HSpacer size={8} />
    </>
  );
}

function ListFooterComponent() {
  return (
    <>
      <UI.HSpacer size={20} />

      <Animated.View style={s(`zi:1`)}>
        <AddElementButton />
        <UI.HSpacer size={20} />
      </Animated.View>
    </>
  );
}
