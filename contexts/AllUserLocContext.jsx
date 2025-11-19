import { createContext, useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { tablesDB } from "../lib/appwrite";

const DATABASE_ID = "6903f95c0024b57749ff"
const LOCATION_TABLE_ID = "location"

export const AllUserLocContext = createContext()

export function AllUserLocProvider({children})
{
    const {user} = useUser()
    const [locations, setLocation] = useState([])
    const [loading, setLoading] = useState(true)

    async function fetchLocation() 
    {
        if (!user)
        {
            return
        }

        try
        {
            const result = await tablesDB.listRows({

                databaseId: DATABASE_ID,
                tableId: LOCATION_TABLE_ID
            })

            const otherUsers = result.rows.filter(row => row.userId !== user.$id)
            setLocation(otherUsers)
        } catch (error)
        {
            console.log(error)
        }
        finally
        {
            setLoading(false)
        }
    }

    useEffect(() => {

        fetchLocation()

    }, [user])

    return(

        <AllUserLocContext.Provider value = {{locations, loading, fetchLocation}}>
            {children}
        </AllUserLocContext.Provider>
    )
}
