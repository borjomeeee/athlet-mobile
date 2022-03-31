import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      d="M2.25 12.938v2.812h2.813l8.294-8.295-2.812-2.812-8.295 8.294ZM15.533 5.28a.747.747 0 0 0 0-1.057l-1.755-1.755a.747.747 0 0 0-1.058 0L11.347 3.84l2.813 2.813 1.373-1.373Z"
      fill="#DCDCDC"
    />
  </Svg>
);

export default SvgComponent;
