const axios = require('axios');

const API_KEY = 'AtbYo0_VxrvTPr9uKIIKlpkdSykBCfu-vdrz-jsTVMW8ZrpGWcDgUirbyIpl-1AU'; // Replace with your own API key

async function getDistance(start, destination) {
    try {
        const response = await axios.get('http://dev.virtualearth.net/REST/V1/Routes/DistanceMatrix', {
            params: {
                origins: start,
                destinations: destination,
                key: API_KEY
            }
        });

        const { resourceSets } = response.data;

        if (resourceSets.length > 0 && resourceSets[0].resources.length > 0) {
            const { travelDistance, travelDistanceUnit } = resourceSets[0].resources[0];
            console.log(`The distance between ${start} and ${destination} is ${travelDistance} ${travelDistanceUnit}.`);
        } else {
            console.log('Distance information not available.');
        }
    } catch (error) {
        console.log('An error occurred:', error.message);
    }
}

// Usage example
const start = 'New York City';
const destination = 'Los Angeles';

getDistance(start, destination);
