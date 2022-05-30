import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path d="m27.427 19.813 1.906-1.906L27.427 16l-4.76 4.76L11.24 9.333 16 4.573l-1.907-1.906-1.906 1.906-1.907-1.906L7.427 5.52 5.52 3.613 3.613 5.52 5.52 7.427 2.667 10.28l1.906 1.907-1.907 1.906L4.574 16l4.76-4.76L20.76 22.667 16 27.427l1.907 1.906 1.906-1.906 1.907 1.906 2.853-2.853 1.907 1.907 1.907-1.907-1.907-1.907 2.853-2.853-1.906-1.907Z" />
  </Svg>
);

export default SvgComponent;
