import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
    <Path d="M6.5 19.5h4v-14h-4v14Zm8-14v14h4v-14h-4Z" />
  </Svg>
);

export default SvgComponent;
