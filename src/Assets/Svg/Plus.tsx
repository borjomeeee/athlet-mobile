import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      d="M12.667 8.667h-4v4H7.333v-4h-4V7.333h4v-4h1.334v4h4v1.334Z"
      fill="#007AFF"
    />
  </Svg>
);

export default SvgComponent;
