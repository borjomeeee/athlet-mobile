import s from '@borjomeeee/rn-styles';
import GBottomSheet, {BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import React from 'react';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useModal, useModalInternal} from 'src/Lib/ModalRouter';
import {Pressable} from '../Pressable';
import {AnimatedView} from './View';

interface BottomSheetProps extends React.ComponentProps<typeof GBottomSheet> {
  bottomSheetRef?: React.MutableRefObject<GBottomSheet>;
  children: (dismiss: () => void) => React.ReactNode;
}
export const BottomSheet: React.FC<BottomSheetProps> = ({
  bottomSheetRef = React.createRef(),
  children,
  ...props
}) => {
  const dismiss = React.useCallback(() => {
    bottomSheetRef.current?.close();
  }, [bottomSheetRef]);

  return (
    <GBottomSheet
      ref={bottomSheetRef}
      handleIndicatorStyle={s(`w:35 h:4 br:2 bgc:#E1E4E8`)}
      {...props}>
      {children(dismiss)}
    </GBottomSheet>
  );
};

interface BottomSheetModal extends React.ComponentProps<typeof BottomSheet> {
  id: string;
}
export const BottomSheetModal: React.FC<BottomSheetModal> = ({
  id,
  bottomSheetRef = React.createRef() as React.MutableRefObject<GBottomSheet>,
  animatedIndex,
  animatedPosition,
  onClose,
  enablePanDownToClose = true,
  index = 0,
  ...props
}) => {
  const {isVisible, _onClose} = useModalInternal(id);

  const _animatedIndex = useSharedValue(-1);
  const _animatedPosition = useSharedValue(0);

  const handleClose = React.useCallback(() => {
    _onClose();
    onClose?.();
  }, [onClose, _onClose]);

  const BackdropComponent = React.useMemo(
    () => () =>
      (
        <Backdrop
          id={id}
          animatedIndex={animatedIndex || _animatedIndex}
          animatedPosition={animatedPosition || _animatedPosition}
        />
      ),
    [id, animatedIndex, animatedPosition, _animatedIndex, _animatedPosition],
  );

  React.useEffect(() => {
    if (!isVisible) {
      bottomSheetRef.current.close();
    }
  }, [isVisible, bottomSheetRef]);

  return (
    <BottomSheet
      bottomSheetRef={bottomSheetRef}
      animatedIndex={animatedIndex || _animatedIndex}
      animatedPosition={animatedPosition || _animatedPosition}
      backdropComponent={BackdropComponent}
      onClose={handleClose}
      enablePanDownToClose={enablePanDownToClose}
      index={index}
      {...props}
    />
  );
};

const Backdrop: React.FC<BottomSheetBackdropProps & {id: string}> = ({
  id,
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

  return (
    <Pressable
      style={s(`abs t:0 b:0 r:0 l:0`)}
      onPress={hide}
      activeOpacity={1}>
      <AnimatedView style={animatedStyle} />
    </Pressable>
  );
};
