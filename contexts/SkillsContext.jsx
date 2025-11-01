import { createContext, useState } from "react";
import { databases, tablesDB } from "../lib/appwrite";
import { ID, Permission, Role } from "appwrite";
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
                    userId: user.$id,
                    imageFileId: data.imageFileId ?? null
                },
                
                read: [Permission.read(Role.user(user.$id))],
                write: [Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id))]
                
            })
            setSkills(prev => [...prev, newSkill])
            return newSkill
        }catch (error){
            console.error(error.message)
        }
    }

    async function deleteSkill()
    {
        try {
            
        } catch (error){
            console.error(error.message)
        }
    }

    return (
        <SkillsContext.Provider
            value = {{skills, fetchSkills, createSkill, deleteSkill}}
            >
                {children}

        </SkillsContext.Provider>
    )
}