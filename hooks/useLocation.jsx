import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'

const useLocation = () => {

    const [errorMsg, setErrorMsg] = useState("")
    const [longitude, setLongitude] = useState("")
    const [latitude, setLatitude] = useState("")

    const getUserLocation = async () => {

        let {status} = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted')
        {
            setErrorMsg('Permission to location was not granted');
            return;
        }

        let {coords} = await Location.getCurrentPositionAsync()

        if (coords)
        {
            const { latitude, longitude } = coords;
            console.log("lat and long is", latitude, longitude)
            setLatitude(latitude)
            setLongitude(longitude)

            let response = await Location.reverseGeocodeAsync({

                latitude,
                longitude
            })

            
        }
    }

    useEffect(() => {

        getUserLocation();
    }, [])



  return {latitude, longitude, errorMsg}
}

export default useLocation

const styles = StyleSheet.create({})
