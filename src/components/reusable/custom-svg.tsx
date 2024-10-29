import React from "react";
import SVG from "react-inlinesvg";

interface CustomSVGProps {
  src: string;
  className?: string;
  customColor?: string;
}

/**
 * CustomSVG component
 * @param src - The path to the SVG file
 * @param className - The class name to apply to the SVG
 * @param customColor - The color to apply to the SVG
 * @returns A custom SVG component
 */
const CustomSVG: React.FC<CustomSVGProps> = ({
  src,
  className,
  customColor,
}) => {
  const preProcessor = (code: string) => {
    // Check if the SVG contains 'stroke' attribute
    const hasStrokeAttribute = /stroke=".*?"/g.test(code);
    const hasFillAttribute = /fill=".*?"/g.test(code);

    if (hasStrokeAttribute) {
      // If 'stroke' is present, it likely relies on 'stroke' instead of 'fill'
      return code.replace(/fill=".*?"/g, `fill="none"`);
    } else if (hasFillAttribute) {
      // If 'fill' is found, replace it with 'currentColor'
      return code.replace(
        /fill=".*?"/g,
        `fill="${customColor || "currentColor"}"`
      );
    } else {
      // If no 'fill' or 'stroke' attribute is found, use a transparent fill
      return code.replace(/<svg/g, `<svg fill="transparent"`);
    }
  };

  return <SVG src={src} className={className} preProcessor={preProcessor} />;
};

export default CustomSVG;
