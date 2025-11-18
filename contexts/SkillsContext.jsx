import { createContext, useEffect, useState } from "react";
import { databases, tablesDB, client } from "../lib/appwrite";
import { ID, Permission, Query, Role } from 'react-native-appwrite';
import { useUser } from "../hooks/useUser";

const DATABASE_ID = "6903f95c0024b57749ff"
const COLLECTION_ID = "skills"

export const SkillsContext = createContext()

export function SkillsProvider({children})
{
    const [skills, setSkills] = useState([])
    const {user} = useUser()

    async function fetchSkills()
    {
        try {

            const response = await tablesDB.listRows({

                databaseId: DATABASE_ID,
                tableId: COLLECTION_ID,
                queries: [Query.equal('userId', user.$id)]

            })

            setSkills(response.rows)

        } catch (error){
            console.error(error.message)
        }
    }

    async function createSkill(data)
    {
        if (!user) return

        try {
            const newSkill = await tablesDB.createRow({
                databaseId: DATABASE_ID,
                tableId: COLLECTION_ID,
                rowId: ID.unique(),
                data: {
                    ...data,
                    userId: user.$id
                    
                },
                
                read: [Permission.read(Role.user(user.$id))],
                write: [Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id))]
                
            })
            
        }catch (error){
            console.error(error.message)
        }
    }

    async function fetchSkillById(id)
    {
        try
        {
            const response = await tablesDB.getRow({

                databaseId: DATABASE_ID,
                tableId: COLLECTION_ID,
                rowId: id
                
            })

            return response

        } catch (error){
            console.error(error.message)
        }
    }

    async function deleteSkill(id)
    {
        try {
            await tablesDB.deleteRow({

                databaseId: DATABASE_ID,
                tableId: COLLECTION_ID,
                rowId: id

            })
        } catch (error){
            console.error(error.message)
        }
    }

    useEffect(() => {

        let unsubscribe
        const channel = `databases.${DATABASE_ID}.tables.${COLLECTION_ID}.rows`
        
        if (user)
        {
            fetchSkills()
            
            unsubscribe = client.subscribe(channel, (response) => {
                const {payload, events} = response

                if (events[0].includes('create'))
                {
                    setSkills((prevSkills) => [...prevSkills, payload])
                }

                if (events[0].includes('delete'))
                {
                    setSkills((prevSkills) => prevSkills.filter((skill) => skill.$id !== payload.$id))
                }
            })

            
        }
        else
        {
            setSkills([])
        }

        return () => {

            if (unsubscribe) unsubscribe()
        }

    }, [user])

    return (
        <SkillsContext.Provider
            value = {{skills, fetchSkills, createSkill, deleteSkill, fetchSkillById}}
            >
                {children}

        </SkillsContext.Provider>
    )
}
