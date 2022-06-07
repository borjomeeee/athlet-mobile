import s from '@borjomeeee/rn-styles';
import {useLayout} from '@react-native-community/hooks';
import React from 'react';
import {ViewStyle} from 'react-native';
import {View} from '../Common';

interface ICenteredProps {
  LeftComponent?: React.FC;
  RightComponent?: React.FC;

  containerStyle?: ViewStyle;
}
export const Centered: React.FC<ICenteredProps> = ({
  LeftComponent,
  RightComponent,
  containerStyle,
  children,
}) => {
  const {onLayout: onLayoutLeft, ...layoutLeft} = useLayout();
  const {onLayout: onLayoutRight, ...layoutRight} = useLayout();

  const style = React.useMemo(
    () => [s(`row jcc`), containerStyle],
    [containerStyle],
  );

  const adjustmentWidth = React.useMemo(() => {
    if (LeftComponent && !layoutLeft.width) {
      return;
    }

    if (RightComponent && !layoutRight.width) {
      return;
    }

    return Math.max(layoutLeft.width, layoutRight.width);
  }, [LeftComponent, RightComponent, layoutLeft, layoutRight]);

  return (
    <View style={style}>
      <View
        style={s(adjustmentWidth ? `aife w:${adjustmentWidth}` : `abs o:0`)}>
        {LeftComponent && (
          <View onLayout={onLayoutLeft}>
            <LeftComponent />
          </View>
        )}
      </View>

      {children}
      <View
        style={s(adjustmentWidth ? `aifs w:${adjustmentWidth}` : `abs o:0`)}>
        {RightComponent && (
          <View onLayout={onLayoutRight}>
            <RightComponent />
          </View>
        )}
      </View>
    </View>
  );
};
