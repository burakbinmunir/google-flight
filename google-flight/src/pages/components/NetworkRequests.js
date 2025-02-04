import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const HEADERS = {
    "x-rapidapi-key": import.meta.env.VITE_API_KEY,
    "x-rapidapi-host": import.meta.env.VITE_API_HOST
};

console.log("VITE_BASE_URL:", import.meta.env.VITE_BASE_URL);
console.log("VITE_API_KEY:", import.meta.env.VITE_API_KEY);
console.log("VITE_API_HOST:", import.meta.env.VITE_API_HOST);


export const fetchFlights = async (
                                       originSkyId,
                                       destinationSkyId,
                                       originEntityId,
                                       destinationEntityId,
                                       date,
                                       cabinClass = "economy",
                                       adults = 1,
                                       sortBy = "best",
                                       currency = "USD",
                                       market = "en-US",
                                       countryCode = "US"
                                   ) => {

    try {
        const response = await axios.get(`${BASE_URL}searchFlights`, {
            params: {
                originSkyId,
                destinationSkyId,
                originEntityId,
                destinationEntityId,
                date,
                cabinClass,
                adults,
                sortBy,
                currency,
                market,
                countryCode
            },
            headers: HEADERS
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching flights:", error);
        throw error;
    }
};


export const fetchCitiesInformation = async (cities) => {
    try {
        const response = await axios.get(`${BASE_URL}searchAirport`, {
            params: {
                query:cities.join(", "),
            },
            headers: HEADERS
        })

        return response.data;
    }
    catch (error) {
        console.error("Error fetching cities:", error);
        throw error;
    }
}
