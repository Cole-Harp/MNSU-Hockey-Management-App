import Select from 'react-select';

interface DayPickerProps {
    selectedDays: string[];
    onChange: (selectedDays: string[]) => void;
}

const DayPicker = ({ selectedDays, onChange }: DayPickerProps) => {
    const options = [
        { value: '1', label: 'Monday' },
        { value: '2', label: 'Tuesday' },
        { value: '3', label: 'Wednesday' },
        { value: '4', label: 'Thursday' },
        { value: '5', label: 'Friday' },
        { value: '6', label: 'Saturday' },
        { value: '0', label: 'Sunday' },
    ];

    const handleChange = (selectedOptions: any) => {
        const selectedValues = selectedOptions.map((option: any) => option.value);
        onChange(selectedValues);
    };

    return (
        <Select
            options={options}
            isMulti
            value={options.filter((option) => selectedDays.includes(option.value))}
            onChange={handleChange}
        />
    );
};

export default DayPicker;
