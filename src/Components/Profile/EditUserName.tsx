'use client'

import { useSession, useUser } from "@clerk/nextjs"

const EditUserName = () => {    

    const session = useSession();
    const user = session.session?.user

    console.log('current session: ' + JSON.stringify(session))
    

    const userUpdate = async () => {
        await user?.update({
            firstName: "Skeeter",
            lastName: "Cathcart"
        });
        user?.reload()
    };
    
    return(
        <>
        <button className = 'bg-blue-400 p-4' onClick = {userUpdate}>Click me to update your name</button>
        <p>user.firstName: {user?.firstName}</p>
        <p>user.lastName: {user?.lastName}</p>
        </>
    )


}

export default EditUserName