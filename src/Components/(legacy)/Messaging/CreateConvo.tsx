
import { getAllUsers } from "@/lib/db_actions/Auth";
import { useEffect, useState } from "react";
import Select  from "react-select";


interface CreateConvoProps{
    onCreateConvo: (convoName: string, selectedUsers: any) => void;
}

function CreateConvo({ onCreateConvo }: CreateConvoProps) {
    const [users, setUsers] = useState<any[]>([]);
    const [convoName, setConvoName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchConvos = async () => {
            const users = await getAllUsers();
            setUsers(users.map(user => ({ value: user.id, label: user.name })));
        };
        fetchConvos();
    }, []);

    const handleSubmit = () => {

        onCreateConvo(convoName, selectedUsers);
        setConvoName('');
        setSelectedUsers([]);
    };
    

    
    return (
        <form onSubmit={handleSubmit} className=''>
            <input value={convoName} onChange={(e) => setConvoName(e.target.value)} className='rounded p-2 mb-2 text-black' />
            <Select
                isMulti
                name="users"
                options={users}

                classNamePrefix="select"
                onChange={(selectedOptions) => {
                    setSelectedUsers(selectedOptions.map(option => option.value));
                }}
            />
            <button type="submit" className='bg-green-500 rounded px-4 py-2'>Create Convo</button>
        </form>
    );
}

export default CreateConvo;
