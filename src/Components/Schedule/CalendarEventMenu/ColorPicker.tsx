
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

const colorOptions: ColorOption[] = [
    { value: "Blue", label: "Blue" },
    { value: "Gray", label: "Gray" },
    { value: "Gold", label: "Gold" },
    { value: "Red", label: "Red" },
    { value: "Pink", label: "Pink" },
    { value: "Green", label: "Green" },
];

const announcementColorOptions: ColorOption[] = [
    { value: "Purple", label: "Purple" },
];

const ColorSelect = ({ admin, announcement, color, setColor }: ColorSelectProps) => {
    const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);

    const handleColorChange = (color: ColorOption | null) => {
        setSelectedColor(color);
        setColor(color!.value);
    };

    return (
        <>
            {admin && announcement ? (
                <>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bgColor">
                        Announcement Color
                    </label>
                    <Select
                        className="p-1 absolute  text-gray-800 font-bold py-2 px-1 rounded ml-2 right-4 bottom-3"
                        options={announcementColorOptions}
                        value={selectedColor}
                        onChange={handleColorChange}
                    />
                </>
            ) :
                <>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bgColor">
                        Background Color
                    </label>
                    <Select
                        className="p-1 absolute  text-gray-800 font-bold py-2 px-1 rounded ml-2 right-4 bottom-3"
                        options={admin ? [...colorOptions, ...announcementColorOptions] : colorOptions}
                        value={selectedColor}
                        onChange={handleColorChange}
                    />
                </>
            }
        </>
    );
};

export default ColorSelect;
