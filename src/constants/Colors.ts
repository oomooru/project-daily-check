interface ColorPalette {
  primary: string;
  secondary: string;
  background: string;
  textWhite: string;
  textBlack: string;
}

export const colors: ColorPalette = {
  primary: '#7AE2CF',
  secondary: '#077A7D',
  background: '#06202B',
  textWhite: '#F5EEDD',
  textBlack: '#06202B'
} as const;