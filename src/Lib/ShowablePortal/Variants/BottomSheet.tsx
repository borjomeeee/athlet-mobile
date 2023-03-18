import React from 'react';
import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';
import BottomSheet, {
  BottomSheetBackdrop,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ShowableComponentProps} from '../Types';
import {useShowablePortal} from '../Hooks/useShowablePortal';

interface BottomSheetProps
  extends Pick<
    React.ComponentProps<typeof BottomSheet>,
    | 'snapPoints'
    | 'index'
    | 'onClose'
    | 'enablePanDownToClose'
    | 'handleComponent'
  > {
  bottomSheetRef?: React.RefObject<BottomSheet>;
  dynamic?: boolean;
}
export const bottomSheet = <Props,>(
  Component: React.FC<ShowableComponentProps & Props>,
  defaultProps: BottomSheetProps,
): React.FC<
  Props &
    ShowableComponentProps & {bottomSheetProps?: Partial<BottomSheetProps>}
> =>
  React.memo(props => {
    const closeWaiter = React.useRef<(() => any) | null>(null);
    const isClosed = React.useRef(false);

    const {top, bottom} = useSafeAreaInsets();
    const {close} = useShowablePortal();

    const {id, componentRef, bottomSheetProps, ...otherProps} = props;
    const {
      bottomSheetRef = React.createRef(),
      onClose,
      snapPoints = ['100%'],
      enablePanDownToClose = true,
      handleComponent,
      dynamic,
      index,
    } = {...defaultProps} as BottomSheetProps;

    const {
      animatedHandleHeight,
      animatedSnapPoints,
      animatedContentHeight,
      handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(snapPoints as any);

    React.useImperativeHandle(
      componentRef,
      React.useCallback(
        () => ({
          close: () => {
            return new Promise<void>(res => {
              if (isClosed.current) {
                res();
              } else {
                closeWaiter.current = res;
                bottomSheetRef.current?.close();
              }
            });
          },
        }),
        [isClosed, closeWaiter, bottomSheetRef],
      ),
    );

    const handleClose = React.useCallback(() => {
      onClose?.();

      if (closeWaiter.current) {
        closeWaiter.current();
        return;
      }

      isClosed.current = true;
      close(id);
    }, [close, id, onClose]);

    return (
      <UI.View style={s(`abs t:0 r:0 l:0 b:0`)}>
        <BottomSheet
          ref={bottomSheetRef}
          handleIndicatorStyle={s(`w:35 h:4 br:2 bgc:#E1E4E8`)}
          backgroundStyle={s(`br:0 btrr:15 btlr:15`)}
          keyboardBlurBehavior="restore"
          snapPoints={dynamic ? animatedSnapPoints : snapPoints}
          index={index}
          topInset={20 + top}
          handleHeight={dynamic ? animatedHandleHeight : undefined}
          contentHeight={dynamic ? animatedContentHeight : undefined}
          handleComponent={handleComponent ?? HandleComponent}
          backdropComponent={renderBackdrop}
          enablePanDownToClose={enablePanDownToClose}
          onClose={handleClose}>
          <UI.View style={s(`fill`)} onLayout={handleContentLayout}>
            <Component
              id={id}
              componentRef={componentRef}
              {...(otherProps as any)}
            />
            <UI.HSpacer size={20 + bottom} />
          </UI.View>
        </BottomSheet>
      </UI.View>
    );
  });

function HandleComponent() {
  return (
    <>
      <UI.HSpacer size={16} />
      <UI.View style={s(`w:50 h:4 br:2 bgc:#C4C4C4 asc`)} />
      <UI.HSpacer size={16} />
    </>
  );
}

function renderBackdrop(props: any) {
  return (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );
}
