'use client';

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

export default function ColorPicker({
  onChange,
}: {
  onChange: (color: string) => void;
}) {
  const [color, setColor] = useState('#aabbcc');

  const handleChange = (newColor: string) => {
    setColor(newColor);
    onChange(newColor);
  };

  return (
    <div>
      <HexColorPicker color={color} onChange={handleChange} />
      <p>Selected Color: {color}</p>
    </div>
  );
}
