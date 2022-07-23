import s from '@borjomeeee/rn-styles';
import GBottomSheet, {BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useModal, useModalInternal} from 'src/Lib/ModalRouter';
import {Pressable} from '../Pressable';
import {AnimatedView, View} from './View';

interface BottomSheetProps extends React.ComponentProps<typeof GBottomSheet> {
  bottomSheetRef?:
    | React.MutableRefObject<GBottomSheet>
    | React.RefObject<GBottomSheet>;
}
export const BottomSheet: React.FC<BottomSheetProps> = ({
  bottomSheetRef = React.createRef(),
  ...props
}) => {
  return (
    <GBottomSheet
      ref={bottomSheetRef}
      handleIndicatorStyle={s(`w:35 h:4 br:2 bgc:#E1E4E8`)}
      {...props}
    />
  );
};

interface BottomSheetModal extends React.ComponentProps<typeof BottomSheet> {
  id: string;
}
export const BottomSheetModal: React.FC<BottomSheetModal> = ({
  id,
  bottomSheetRef = React.createRef(),
  animatedIndex: providedAnimatedIndex,
  animatedPosition: providedAnimatedPosition,
  backgroundStyle: providedBackgroundStyle,
  onClose,
  ...props
}) => {
  const {isVisible, _onClose} = useModalInternal(id);

  const _animatedIndex = useSharedValue(-1);
  const _animatedPosition = useSharedValue(0);

  const animatedIndex = providedAnimatedIndex ?? _animatedIndex;
  const animatedPosition = providedAnimatedPosition ?? _animatedPosition;

  const {top} = useSafeAreaInsets();
  const handleClose = React.useCallback(() => {
    _onClose();
    onClose?.();
  }, [onClose, _onClose]);

  const BackdropComponent = React.useMemo(
    () => () =>
      (
        <Backdrop
          id={id}
          animatedIndex={animatedIndex}
          animatedPosition={animatedPosition}
        />
      ),
    [id, animatedIndex, animatedPosition],
  );

  React.useEffect(() => {
    if (!isVisible) {
      bottomSheetRef.current?.close();
    }
  }, [isVisible, bottomSheetRef]);

  const backgroundStyle = React.useMemo(
    () => [s(`br:0 btrr:15 btlr:15`), providedBackgroundStyle],
    [providedBackgroundStyle],
  );

  return (
    <BottomSheet
      bottomSheetRef={bottomSheetRef}
      animatedIndex={animatedIndex}
      animatedPosition={animatedPosition}
      backdropComponent={BackdropComponent}
      onClose={handleClose}
      enablePanDownToClose={true}
      backgroundStyle={backgroundStyle}
      keyboardBlurBehavior="restore"
      topInset={top}
      index={0}
      {...props}
    />
  );
};

const Backdrop: React.FC<BottomSheetBackdropProps & {id: string}> = ({
  id,
  animatedPosition,
  animatedIndex,
}) => {
  const {hide} = useModal(id);

  const animatedStyle = useAnimatedStyle(() => ({
    flex: 1,

    backgroundColor: '#000000',
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 0.5],
      Extrapolate.CLAMP,
    ),
  }));

  const backAnimatedStyle = useAnimatedStyle(() => ({
    opacity: animatedIndex.value >= 0 ? 1 : 0,
    transform: [{translateY: animatedPosition.value + 100}],
  }));

  const backStyle = React.useMemo(
    () => [s(`abs t:0 r:0 l:0 b:0 bgc:#fff`), backAnimatedStyle],
    [backAnimatedStyle],
  );

  return (
    <Pressable
      style={s(`abs t:0 b:0 r:0 l:0`)}
      onPress={hide}
      activeOpacity={1}>
      <AnimatedView style={animatedStyle} />
      <AnimatedView style={backStyle} />
    </Pressable>
  );
};
