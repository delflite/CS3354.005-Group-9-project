import { useRouter } from "expo-router"
import { Text } from "react-native"
import { useUser } from "../../hooks/useUser"
import { useEffect } from "react"
import ThemedLoader from "../ThemedLoader"

const UserOnly = ({children}) => 
{
    const {user, authChecked} = useUser()
    const router = useRouter()

    useEffect(() => {

        if(authChecked && user === null)
        {
            router.replace('/login')
        }

    }, [user, authChecked])

    if(!authChecked || !user)
    {
        return(
            <ThemedLoader>Loading</ThemedLoader>
        )
    }

    return children
}

export default UserOnly