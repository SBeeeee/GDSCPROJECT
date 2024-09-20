import React, { useState } from 'react';

function Code() {
    const [dhobi,setDhobi]=useState("trial");
    // Crowd data for places inside VIT (Static data)
    const crowdData = {
        "Chota Dhobi": {
            latitude: 12.9693, // Example lat
            longitude: 79.1559, // Example long
            rushHours: [16, 17, 18],
            quietHours: [10, 11, 12],
            currentEstimate: "Moderate",
        }
    };

    // Helper function to calculate distance between two coordinates (Haversine formula)
    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in km
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c * 1000; // Distance in meters
    }
    // Function to get the current crowd level based on the time of day
    function getCrowdEstimate(place) {
        const currentHour = new Date().getHours();
        if (crowdData[place].rushHours.includes(currentHour)) {
            return "High";
        } else if (crowdData[place].quietHours.includes(currentHour)) {
            return "Low";
        } else {
            return "Moderate";
        }
    }

    // Success callback when location is retrieved
    function successCallback(position) {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const place = "Chota Dhobi";
        const placeLat = crowdData[place].latitude;
        const placeLng = crowdData[place].longitude;

        const distance = getDistance(userLat, userLng, placeLat, placeLng);

        if (distance < 100) {
            const crowdLevel = getCrowdEstimate(place);
           
            setDhobi(`Current crowd level at ${ place }: <span class="${crowdLevel.toLowerCase()}">${crowdLevel}</span>`);
        } else {
            setDhobi("You are not near Chota Dhobi.");
        }
    }

    // Error callback for geolocation
    function errorCallback(error) {
        setDhobi("Unable to retrieve location.");
            
    }

    // Request the user's location
    function calculate(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            successCallback,
            errorCallback
        );
    } else {
        setDhobi("Geolocation is not supported by this browser.");
            
    }
}
    return (
        <>
             <div className="w-40 h-19 border-black border-dotted border-2 text-center" onClick={()=>calculate()}>Chota Dhobi</div> 
            <h2>{dhobi}</h2>
        </>
    )

}
export default Code