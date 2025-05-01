import React from 'react';
import {SvgProps} from 'react-native-svg';
import * as Icons from '../../../assets/images/index';

type IconProps = SvgProps & {
  name: keyof typeof Icons;
  size?: number;
  onPress?: () => void;
};

function SvgIcon({name, width, height, onPress}: IconProps) {
  const SvgIcon = Icons[name];

  const sizeProps = {
    ...(width !== undefined ? {width} : {}),
    ...(height !== undefined ? {height} : {}),
  };

  return <SvgIcon {...sizeProps} onPress={onPress} />;
}

export default SvgIcon;