interface ColorPalette {
  primary: string;
  secondary: string;
  background: string;

  textWhite: string;
  textBlack: string;

  delete: string;
  edit: string;

  sunday: string;
  saturday: string;
}

export const colors: ColorPalette = {
  primary: '#7AE2CF',
  secondary: '#077A7D',
  background: '#06202B',

  textWhite: '#F5EEDD',
  textBlack: '#06202B',

  delete: '#E55050',
  edit: '#FFF085',

  sunday: '#E55050',
  saturday: '#00CAFF',
} as const;