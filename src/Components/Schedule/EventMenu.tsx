import { useState, MouseEventHandler, SetStateAction } from 'react';
import { UilTrash } from '@iconscout/react-unicons/'


interface EventMenuProps {
    onDelete: () => void;
    onSave: (newTitle: string) => void;
    onCreate: (event: any) => void;
    onClose: () => void;
    event: any
    isNewEvent?: boolean;
};

export default function EventMenu({ onDelete, onSave, onClose, onCreate, event, isNewEvent = false }: EventMenuProps) {
    
    const [newTitle, setNewTitle] = useState<string>(event && event.title ? event.title : "");
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [selectedRole, setSelectedRole] = useState('All');
    const [newEvent, setNewEvent] = useState(isNewEvent)

    const handleSave = () => {
        newEvent ? (onCreate(newTitle), setNewEvent(false)) : (onSave(newTitle));
    };

    const handleDeleteClick = () => {
        onDelete();
        onClose();
    };

    const handleClose = () => {
        onClose()
    }

    const handleTitleDoubleClick = () => {
        setIsEditing(true);
        setNewEvent(false)
    }

    const handleTitleBlur = () => {
        setIsEditing(false);
        handleSave();
    }

    const handleKeyDown = (e: { key: string; preventDefault: () => void; }) => {
        if (e.key === 'Enter') {
            setIsEditing(false);
            handleSave();

        }
    };

    //TODO ADD RECURRING EVENTS
    //TODO ADD Location


    return (
        <div className="flex-inline">
            <div className="relative bg-gray-100 border-8 rounded">
            <div className="relative ">
                <button
                    className="absolute top-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ml-2 right-1"
                    onClick={() => {
                        handleClose();
                    }}
                >
                    <div className="flex items-center justify-center">x</div>
                </button>
                <select className="absolute top-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-1 rounded ml-2 right-14">
                    <option>Coaches</option>
                    <option>Faculty</option>
                    <option>Player</option>
                    <option>All</option>
                </select>
            </div>
                <div className="flex p-4 text-2xl font-bold">
                    {isEditing || isNewEvent ? (
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onBlur={handleTitleBlur}
                            className="flex shadow appearance-none rounded w-4/6 py-1 px-3 text-gray-700 leading-tight"
                            autoFocus
                        />
                    ) : (
                        <span onDoubleClick={handleTitleDoubleClick}>{newTitle} </span>

                    )}
                </div>
                <div className="bg-gray-100 rounded-lg shadow-lg p-4 w-full grid grid-cols-3 gap-4">
                    <div className="text-sm font-medium text-gray-500">When</div>
                    <div className="col-span-2">{event && event.start ? event.start.toLocaleString() : "All Day"}</div>

                    <div className="text-sm font-medium text-gray-500">Where</div>
                    <div className="col-span-2">{"The Rink"}</div>
                    <div className="text-sm font-medium text-gray-500">Agenda</div>
                    <div className="col-span-2">{"We will start off in meeting, 30 min walk through, then warm up and practice"}</div>

                    <div className="flex justify-left">
                        <button
                            className=" hover:bg-red-700 text-white font-bold py-2 px-2 rounded mx-1"
                            onClick={handleDeleteClick}
                        >
                            <div className="flex items-center justify-center"><UilTrash></UilTrash></div>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}