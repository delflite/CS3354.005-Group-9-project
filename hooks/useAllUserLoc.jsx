import { useContext } from "react";
import { AllUserLocContext } from "../contexts/AllUserLocContext";

export function useAllUserLoc()
{
    const context = useContext(AllUserLocContext)

    if (!context)
    {
        throw new Error("useAllUserLoc must be used within a AllUserLocProvider")
    }

    return context
}