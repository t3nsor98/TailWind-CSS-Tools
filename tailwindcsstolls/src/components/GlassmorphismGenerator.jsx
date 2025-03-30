import React, { useState, useEffect } from "react";

const GlassmorphismGenerator = () => {
  const [blur, setBlur] = useState(4);
  const [opacity, setOpacity] = useState(25);
  const [color, setColor] = useState("255, 255, 255");
  const [colorHex, setColorHex] = useState("#ffffff");
  const [outline, setOutline] = useState(false);
  const [borderRadius, setBorderRadius] = useState(10);
  const [shadowIntensity, setShadowIntensity] = useState(8);
  const [copied, setCopied] = useState(false);

  // Generate CSS styles for both Tailwind and custom CSS
  const generateStyles = () => {
    // The backdrop-filter needs to be applied as inline style since
    // backdrop-blur-md is fixed in Tailwind
    const inlineStyles = {
      backdropFilter: `blur(${blur}px)`,
      backgroundColor: `rgba(${color}, ${opacity / 100})`,
      borderRadius: `${borderRadius}px`,
      boxShadow: `0 ${shadowIntensity}px ${
        shadowIntensity * 2
      }px rgba(0, 0, 0, 0.2)`,
    };

    // Tailwind classes to be copied
    const tailwindClass = `bg-opacity-${Math.round(opacity)} rounded-lg p-6 ${
      outline ? "border border-white/30" : ""
    } shadow-lg`;

    // CSS styles for non-Tailwind properties
    const cssStyles = `
  background-color: rgba(${color}, ${opacity / 100});
  backdrop-filter: blur(${blur}px);
  border-radius: ${borderRadius}px;
  box-shadow: 0 ${shadowIntensity}px ${
      shadowIntensity * 2
    }px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  ${outline ? "border: 1px solid rgba(255, 255, 255, 0.3);" : ""}
`;

    return { inlineStyles, tailwindClass, cssStyles };
  };

  const { inlineStyles, tailwindClass, cssStyles } = generateStyles();

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(false), 2000);
  };

  // Convert RGB to HEX for the color picker
  useEffect(() => {
    const rgbArray = color.split(",").map((num) => parseInt(num.trim()));
    if (rgbArray.length === 3) {
      const hex = rgbArray
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("");
      setColorHex(`#${hex}`);
    }
  }, []);

  // Convert HEX to RGB when color picker changes
  const handleColorChange = (e) => {
    const hex = e.target.value;
    setColorHex(hex);

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    setColor(`${r}, ${g}, ${b}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-100 text-gray-800 p-4">
      <h1 className="text-3xl font-bold mb-6">Glassmorphism Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Controls</h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Blur: {blur}px</label>
              <input
                type="range"
                min="0"
                max="20"
                value={blur}
                onChange={(e) => setBlur(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Transparency: {opacity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Color:</label>
              <input
                type="color"
                value={colorHex}
                onChange={handleColorChange}
                className="w-full h-10 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Border Radius: {borderRadius}px
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={borderRadius}
                onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Shadow Intensity: {shadowIntensity}px
              </label>
              <input
                type="range"
                min="0"
                max="20"
                value={shadowIntensity}
                onChange={(e) => setShadowIntensity(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={outline}
                  onChange={() => setOutline(!outline)}
                  className="mr-2 h-4 w-4"
                />
                <span className="font-medium">Show Outline</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative w-full h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-8">
            <div
              className="w-full h-full flex items-center justify-center"
              style={inlineStyles}
            >
              <span className="text-lg">Glassmorphism Preview</span>
            </div>
          </div>

          <div className="w-full space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Tailwind Classes</h3>
              <div className="group relative">
                <pre className="p-3 bg-gray-800 text-gray-200 rounded overflow-x-auto text-sm">
                  <code>{tailwindClass}</code>
                </pre>
                <button
                  onClick={() => handleCopy(tailwindClass, "tailwind")}
                  className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs"
                >
                  {copied === "tailwind" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">CSS Styles</h3>
              <div className="group relative">
                <pre className="p-3 bg-gray-800 text-gray-200 rounded overflow-x-auto text-sm">
                  <code>{cssStyles}</code>
                </pre>
                <button
                  onClick={() => handleCopy(cssStyles, "css")}
                  className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs"
                >
                  {copied === "css" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassmorphismGenerator;
