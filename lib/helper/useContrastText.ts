import { useEffect, useState } from "react";

interface UseContrastTextProps {
  r: number;
  g: number;
  b: number;
}

type TextColor = "#181a18" | "white";
export const useContrastText = (props: UseContrastTextProps) => {
  const { r, g, b } = props;

  const [textColour, setTextColour] = useState<TextColor>("#181a18");

  useEffect(() => {
    const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000);
    setTextColour(brightness > 125 ? "#181a18" : "white");
  }, [r, g, b]);

  return textColour;
};

export const hexToRGB = (hex: any) => {
  console.log(hex);
  hex = "0x" + hex;
  let r = (hex >> 16) & 0xff;
  let g = (hex >> 8) & 0xff;
  let b = hex & 0xff;
  return {
    r: r,
    g: g,
    b: b,
  };
};
