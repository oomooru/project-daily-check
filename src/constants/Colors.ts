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

export function interpolateColor(
  color1: string,
  color2: string,
  ratio: number
): string {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);

  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * ratio);
  const g = Math.round(g1 + (g2 - g1) * ratio);
  const b = Math.round(b1 + (b2 - b1) * ratio);

  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}