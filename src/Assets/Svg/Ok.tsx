import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={124} height={124} fill="none" {...props}>
    <Path
      d="M46.5 83.545 24.955 62l-7.337 7.285L46.5 98.167l62-62-7.285-7.285L46.5 83.545Z"
      fill="#2DA44E"
    />
  </Svg>
);

export default SvgComponent;
