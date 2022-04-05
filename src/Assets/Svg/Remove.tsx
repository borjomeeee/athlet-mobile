import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9c0 4.14 3.36 7.5 7.5 7.5 4.14 0 7.5-3.36 7.5-7.5 0-4.14-3.36-7.5-7.5-7.5Zm3.75 8.25h-7.5v-1.5h7.5v1.5Z"
      fill="#FF5353"
    />
  </Svg>
);

export default SvgComponent;
