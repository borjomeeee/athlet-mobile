import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path d="M12 14.667H9.333v2.667H12v-2.667Zm5.333 0h-2.666v2.667h2.666v-2.667Zm5.334 0H20v2.667h2.667v-2.667Zm2.666-9.333H24V2.667h-2.667v2.667H10.667V2.667H8v2.667H6.667c-1.48 0-2.654 1.2-2.654 2.666L4 26.667a2.666 2.666 0 0 0 2.667 2.667h18.666c1.467 0 2.667-1.2 2.667-2.667V8c0-1.466-1.2-2.666-2.667-2.666Zm0 21.333H6.667V12h18.666v14.667Z" />
  </Svg>
);

export default SvgComponent;
