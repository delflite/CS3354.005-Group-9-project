import { createContext } from "react";
import { ID, Permission, Role, Query } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";
import { tablesDB } from "../lib/appwrite";

export const LocationContext = createContext()

const DATABASE_ID = "6903f95c0024b57749ff"
const LOCATION_TABLE_ID = "location"

export function LocationProvider({children})
{
    const {user} = useUser()

    async function saveUserLocation(lat, lng)
    {
        if (!user) return

        try{
            const existing = await tablesDB.listRows({

                databaseId: DATABASE_ID,
                tableId: LOCATION_TABLE_ID,
                queries: [Query.equal('userId', user.$id)]
            })


            if (existing.rows.length > 0)
            {
            await tablesDB.updateRow({

                databaseId: DATABASE_ID,
                tableId: LOCATION_TABLE_ID,
                rowId: existing.rows[0].$id,
                data: {latitude: lat, longitude: lng}
                
            })
            }
            else
            {
                await tablesDB.createRow({

                    databaseId: DATABASE_ID,
                    tableId: LOCATION_TABLE_ID,
                    rowId: ID.unique(),
                    data: {userId: user.$id,
                        latitude: lat,
                        longitude: lng
                    },
                    read: [Permission.read(Role.user(user.$id))],
                    write: [Permission.update(Role.user(user.$id)),
                        Permission.delete(Role.user(user.$id))]
                })
            }

        } catch (error) 
            {
            console.error(error.message)
            }

        

        
    }
    
    return (
            <LocationContext.Provider
                value = {{saveUserLocation}}
                >
                    {children}
    
            </LocationContext.Provider>
        )
}