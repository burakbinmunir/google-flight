import React, { useEffect, useState } from 'react';
import { Typography } from "@mui/material";
import { fetchCitiesInformation, fetchFlights } from "./NetworkRequests.js";
import {GenericHelper} from "../Helpers/GenericHelper.js";
import dayjs from "dayjs";

const FlightsDestinations = () => {
    const [selectedCity, setSelectedCity] = useState();
    const [origins, setOrigins] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [localDestinations, setLocalDestinations] = useState([]);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const originResponse = await fetchCitiesInformation(GenericHelper?.getOriginCities());
                setOrigins(originResponse?.data);
                setSelectedCity(originResponse?.data?.[0]);

                const destinationCities = ["Dubai", "New York", "Los Angeles", "Paris", "Jeddah", "Sydney"];
                const tempDest = [];

                for (let city of destinationCities) {
                    const destResponse = await fetchCitiesInformation([city]);
                    tempDest.push(destResponse?.data?.[0]);
                }

                setDestinations(tempDest);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDestinations();
    }, []);


    const handleClick = (data) => {
        setSelectedCity(data);

        const popularDest = GenericHelper?.getPopularFlights()?.find(
            (item) => item?.name?.toLowerCase() === data?.presentation?.title?.toLowerCase()
        );

        if (popularDest) {
            const filteredDestinations = destinations.filter(dest =>
                popularDest?.destinations?.includes(dest?.presentation?.title)
            );

            setLocalDestinations([]);

            filteredDestinations.forEach((dest) => {
                fetchFlights(
                    selectedCity?.skyId,
                    dest?.skyId,
                    selectedCity?.entityId,
                    dest?.entityId,
                    GenericHelper?.getDate(new Date(new Date().setDate(new Date().getDate() + 1))),
                    "economy",
                    1,
                    "best",
                    "PKR",
                    "en-US",
                    "PK"
                ).then((response) => {
                    setLocalDestinations(prevState => [...prevState, response?.data]);
                });
            });

        }
    };

    return (
        <div className="flex flex-col items-start">
            <Typography style={{ margin: "2rem", fontSize: "18px", fontWeight: "bold" }}>
                Find Cheap Flights from {selectedCity?.city} to anywhere
            </Typography>

            <div className="flex mx-6 my-6">
                {origins && origins.map((data, index) => (
                    <div
                        key={index}
                        className={`p-2 px-4 mx-1 flex items-center border border-gray-600 rounded-full ${
                            selectedCity?.entityId === data?.entityId ? "bg-gray-700" : ""
                        }`}
                        onClick={() => handleClick(data)}
                    >
                        <p style={{
                            fontSize: "12px", fontWeight: "bold",
                            ...(selectedCity?.entityId === data?.entityId && { color: "#a9c7fa" })
                        }}>
                            {data?.presentation?.title}
                        </p>
                    </div>
                ))}
            </div>

            {localDestinations.length > 0 && (
                <div className="flex my-4">
                    {localDestinations.map((data, index) => (
                        <div key={index} className="mx-8 items-center justify-center">
                            <img
                                src={data?.destinationImageUrl}
                                alt=""
                                style={{ height: 110, width: 220, borderRadius: 20 }}
                            />
                            <div className="flex flex-col items-start mt-2">
                                <div className="flex items-center justify-between w-full">
                                    <Typography style={{ fontSize: "14px", fontWeight: "bold" }}>
                                        {data?.filterStats?.airports?.[1]?.city}
                                    </Typography>
                                    <Typography style={{ fontSize: "14px", fontWeight: "bold" }}>
                                        {data?.itineraries?.[0]?.price?.formatted}
                                    </Typography>
                                </div>
                                <div className="flex flex-col items-start">
                                    <Typography style={{ fontSize: "13px", color: "darkgray" }}>
                                        {dayjs(data?.itineraries?.[0]?.legs?.[0]?.arrival).format("hh:mm A")} - {dayjs(data?.itineraries?.[0]?.legs?.[0]?.departure).format("hh:mm A")}
                                    </Typography>
                                    <Typography style={{ fontSize: "13px", color: "darkgray" }}>
                                        {GenericHelper?.getStops(data?.filterStats?.stopPrices) === 0
                                            ? "Nonstop"
                                            : GenericHelper?.getStops(data?.filterStats?.stopPrices) === 1
                                                ? `${GenericHelper?.getStops(data?.filterStats?.stopPrices)} stop`
                                                : `${GenericHelper?.getStops(data?.filterStats?.stopPrices)} stops`}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FlightsDestinations;
