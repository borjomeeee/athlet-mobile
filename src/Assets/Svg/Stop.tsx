import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={25} height={25} fill="none" {...props}>
    <Path d="M6.5 6.5h12v12h-12v-12Z" fill="#fff" />
  </Svg>
);

export default SvgComponent;
