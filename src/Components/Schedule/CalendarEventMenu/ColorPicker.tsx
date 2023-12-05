
import React, { useState } from "react";
import Select from "react-select";

type ColorOption = {
    value: string;
    label: string;
};

interface ColorSelectProps {
    admin: boolean,
    announcement: boolean,
    color?: string,
    setColor: (color: string) => void,

};

// Can be RGB Values
const colorOptions: ColorOption[] = [
    { value: "Blue", label: "Blue" },
    { value: "Gray", label: "Gray" },
    { value: "Red", label: "Red" },
    { value: "Pink", label: "Pink" },
    { value: "Green", label: "Green" },
];

const announcementColorOptions: ColorOption[] = [
    { value: "Purple", label: "Purple" },
    { value: "Gold", label: "Gold" },
];

const ColorSelect = ({ admin, announcement, color, setColor }: ColorSelectProps) => {
    const [selectedColor, setSelectedColor] = useState<ColorOption | null>(color ? { value: color, label: color } : null);

    const handleColorChange = (color: ColorOption | null) => {
        setSelectedColor(color);
        setColor(color!.value);
    };

    return (
        <>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bgColor">
                Background Color
            </label>
            <Select
                className="p-1 absolute  text-gray-800 font-bold py-2 px-1 rounded ml-2 right-4 bottom-3"
                options={admin && announcement ? [...announcementColorOptions] : colorOptions}
                value={selectedColor}
                placeholder="Default"
                onChange={handleColorChange}
            />
        </>
    );
};

export default ColorSelect;
