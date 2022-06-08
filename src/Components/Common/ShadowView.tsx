import React from 'react';

import {Box, BoxShadow, Canvas, rect, SkRect} from '@shopify/react-native-skia';
import {View} from './View';
import s from '@borjomeeee/rn-styles';
import {ViewStyle} from 'react-native';
import {useLayout} from '@react-native-community/hooks';

interface ShadowProps extends React.ComponentProps<typeof BoxShadow> {
  box: SkRect;
}

const Shadow: React.FC<ShadowProps> = ({box, ...props}) => {
  return (
    // Bug: shadow updates when rerendered and not disappears
    <Canvas style={s(`fill`)} key={Date.now().toString()}>
      <Box box={box} color="transparent">
        <BoxShadow {...props} />
      </Box>
    </Canvas>
  );
};

interface ShadowViewProps extends React.ComponentProps<typeof BoxShadow> {
  containerStyle?: ViewStyle;
  canvasBackgroundColor?: string;
}
export const ShadowView: React.FC<ShadowViewProps> = React.memo(
  ({
    children,
    containerStyle,

    dx,
    dy,

    blur,
    ...props
  }) => {
    const {onLayout, ...layout} = useLayout();
    const style = React.useMemo(
      () => [s(`rel ofv`), containerStyle],
      [containerStyle],
    );

    const diffX = -(Math.abs(+(dx || 0)) + +blur * 10);
    const diffY = -(Math.abs(+(dy || 0)) + +blur * 10);

    const box = React.useMemo(
      () => rect(-diffX, -diffY, layout.width, layout.height),
      [diffX, diffY, layout.width, layout.height],
    );

    return (
      <View style={style} onLayout={onLayout}>
        {children}
        <View
          style={s(`abs t:${diffY} b:${diffY} r:${diffX} l:${diffX} ofv zi:-1`)}
          pointerEvents="none">
          <Shadow box={box} dx={dx} dy={dy} blur={blur} {...props} />
        </View>
      </View>
    );
  },
);
