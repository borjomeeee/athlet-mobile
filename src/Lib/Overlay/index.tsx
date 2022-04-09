import s from '@borjomeeee/rn-styles';
import {useLayout} from '@react-native-community/hooks';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import Animated, {
  FadeOut,
  useAnimatedRef,
  ZoomInEasyUp,
} from 'react-native-reanimated';
import {
  atom,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {Pressable, View} from 'src/Components';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';
import {OverlayRef} from './Types';

const createKey = getKeyFabricForDomain('overlay');
const overlayStore = atom<React.ReactNode | undefined>({
  key: createKey('self'),
  default: undefined,
});

export const useOverlayStore = () => {
  const overlay = useRecoilValue(overlayStore);
  return {overlay};
};

export const useOverlay = () => {
  const resetOverlay = useResetRecoilState(overlayStore);
  const setOverlay = useSetRecoilState(overlayStore);

  const close = React.useCallback(() => resetOverlay(), [resetOverlay]);
  const show = React.useCallback(
    (node: React.ReactNode) => setOverlay(node),
    [setOverlay],
  );

  return {show, close};
};

interface OverlayWrapperProps {
  overlayRef?: React.RefObject<OverlayRef>;
  Component: React.FC;

  disabled?: boolean;
}
export const OverlayWrapper: React.FC<OverlayWrapperProps> = ({
  children,

  overlayRef = React.createRef(),
  Component,

  disabled,
}) => {
  const animatedRef = useAnimatedRef<Animated.View>();
  const {show: showOverlay} = useOverlay();

  React.useImperativeHandle(
    overlayRef,
    React.useCallback(
      () => ({
        show: () => {
          if (animatedRef && animatedRef.current) {
            animatedRef.current.measure((x, y, width, height, pageX, pageY) => {
              showOverlay(
                <OverlayInstance
                  pageX={pageX}
                  pageY={pageY}
                  width={width}
                  height={height}
                  Component={Component}
                />,
              );
            });
          }
        },
      }),
      [Component, showOverlay, animatedRef],
    ),
  );

  const handlePress = React.useCallback(() => {
    overlayRef.current?.show();
  }, [overlayRef]);

  return (
    <Animated.View ref={animatedRef}>
      <Pressable onPress={handlePress} disabled={disabled}>
        {children}
      </Pressable>
    </Animated.View>
  );
};

interface OverlayInstanceProps {
  pageX: number;
  pageY: number;
  height: number;
  width: number;

  Component: React.FC;
}

export const OverlayInstance: React.FC<OverlayInstanceProps> = ({
  pageX,
  pageY,

  height: parentHeight,

  Component,
}) => {
  const {onLayout, ...contentLayout} = useLayout();
  const {width} = useWindowDimensions();

  const MAX_X = width - 20;

  const absoluteLeft = pageX + contentLayout.width;
  const left = absoluteLeft > MAX_X ? MAX_X - contentLayout.width : pageX;

  return (
    <Animated.View
      style={s(
        `abs bgc:#fff br:12 p:8 shadow`,
        `t:${pageY + parentHeight} l:${left} o:${+(contentLayout.height > 0)}`,
      )}
      entering={ZoomInEasyUp.duration(200)}
      exiting={FadeOut.duration(200)}>
      <View onLayout={onLayout}>
        <Component />
      </View>
    </Animated.View>
  );
};

export const Overlay = () => {
  const {overlay} = useOverlayStore();
  return <Animated.View style={s(`abs zi:100`)}>{overlay}</Animated.View>;
};

export const OverlayProvider: React.FC = ({children}) => {
  const {close} = useOverlay();

  return (
    <View style={s(`fill`)}>
      <View style={s(`fill`)} onTouchStart={close}>
        {children}
      </View>
      <Overlay />
    </View>
  );
};