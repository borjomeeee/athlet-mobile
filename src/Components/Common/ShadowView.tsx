import React from 'react';

import {Canvas, Group, Paint, Rect, Shadow} from '@shopify/react-native-skia';
import {View} from './View';
import s from '@borjomeeee/rn-styles';
import {ViewStyle} from 'react-native';
import {useLayout} from '@react-native-community/hooks';
import {Colors} from 'src/Utils/Styles';

interface ShadowViewProps extends React.ComponentProps<typeof Shadow> {
  containerStyle?: ViewStyle;
  canvasBackgroundColor?: string;
}
export const ShadowView: React.FC<ShadowViewProps> = ({
  children,
  containerStyle,

  dx,
  dy,

  blur,
  canvasBackgroundColor = Colors.white,

  ...props
}) => {
  const {onLayout, ...layout} = useLayout();
  const style = React.useMemo(
    () => [s(`rel ofv`), containerStyle],
    [containerStyle],
  );

  const diffX = -(Math.abs(+dx) + +blur * 10);
  const diffY = -(Math.abs(+dy) + +blur * 10);

  return (
    <View style={style} onLayout={onLayout}>
      {children}
      <View
        style={s(`abs t:${diffY} b:${diffY} r:${diffX} l:${diffX} ofv zi:-1`)}
        pointerEvents="none">
        <Canvas style={s(`fill`)}>
          <Group>
            <Paint>
              <Shadow dx={dx} dy={dy} blur={blur} shadowOnly {...props} />
            </Paint>
            <Rect
              x={-diffX}
              y={-diffY}
              width={layout.width}
              height={layout.height}
              color={canvasBackgroundColor}
            />
          </Group>
        </Canvas>
      </View>
    </View>
  );
};
