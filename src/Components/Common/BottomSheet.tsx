import GBottomSheet, {BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import React from 'react';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useModalRouter} from 'src/Lib/ModalRouter';
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
    <GBottomSheet ref={bottomSheetRef} {...props}>
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
  const _animatedIndex = useSharedValue(0);
  const _animatedPosition = useSharedValue(0);

  const {dismissModal} = useModalRouter();

  const BackdropComponent = React.useMemo(
    () => () =>
      (
        <Backdrop
          animatedIndex={animatedIndex || _animatedIndex}
          animatedPosition={animatedPosition || _animatedPosition}
        />
      ),
    [animatedIndex, animatedPosition, _animatedIndex, _animatedPosition],
  );

  const handleClose = React.useCallback(() => {
    dismissModal(id);
    onClose?.();
  }, [id, onClose, dismissModal]);

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

const Backdrop: React.FC<BottomSheetBackdropProps> = ({animatedIndex}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,

      backgroundColor: '#000000',
      opacity: interpolate(
        animatedIndex.value,
        [-1, 0],
        [0, 0.5],
        Extrapolate.CLAMP,
      ),
    };
  });

  return <AnimatedView style={animatedStyle} />;
};
