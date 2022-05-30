import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path d="M13.333 18.167h-.5v8H7.166V15.5H3.97L16 4.673 28.03 15.5h-3.197v10.667h-5.666v-8h-5.834Z" />
  </Svg>
);

export default SvgComponent;
