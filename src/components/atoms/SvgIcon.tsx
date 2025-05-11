import React from 'react';
import {SvgProps} from 'react-native-svg';
import * as Icons from '../../../assets/images/index';

type SvgIconProps = SvgProps & {
  name: keyof typeof Icons;
  size?: number;
  strokeWidth? : number;
  onPress?: () => void;
};

function SvgIcon({name, width, height, color, strokeWidth, onPress}: SvgIconProps) {
  const SvgIcon = Icons[name];

  const sizeProps = {
    ...(width !== undefined ? {width} : {}),
    ...(height !== undefined ? {height} : {}),
    ...(color !== undefined ? {color} : {}),
    ...(strokeWidth !== undefined ? {strokeWidth} : {})
  };

  return <SvgIcon {...sizeProps} onPress={onPress} />;
}

export default SvgIcon;