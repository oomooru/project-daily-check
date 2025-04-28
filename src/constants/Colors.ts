interface ColorPalette {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

export const colors: ColorPalette = {
  primary: '7AE2CF',
  secondary: '077A7D',
  background: '06202B',
  text: 'F5EEDD'
} as const;