import React from 'react'
import dayjs from "dayjs";
import {GenericHelper} from "../Helpers/GenericHelper.js";

const FlightResults = ({searchResults}) => {
    return (
        <>
            {!!searchResults && searchResults?.itineraries?.length > 0 && (
                <div className="border border-gray-300 rounded-lg">
                    {searchResults?.itineraries?.map((flight, index) => (
                        <div
                            key={index}
                            className="flex flex-wrap items-center justify-between px-4 py-3 border-t border-gray-300"
                        >

                            <div className="w-1/3 md:w-auto flex items-center">
                                <img
                                    src={flight?.legs?.[0]?.carriers?.marketing?.[0]?.logoUrl}
                                    className="rounded-2xl"
                                    height={30}
                                    width={30}
                                />
                            </div>

                            <div className="w-1/3 md:w-auto flex flex-col items-start">
                                <p className="font-bold">
                                    {dayjs(flight?.legs?.[0]?.arrival)?.format("hh:mm A")} -{" "}
                                    {dayjs(flight?.legs?.[0]?.departure)?.format("hh:mm A")}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {flight?.legs?.[0]?.carriers?.marketing?.[0]?.name}
                                </p>
                            </div>

                            <div className="w-1/3 md:w-auto text-right font-bold">
                                {flight?.price?.formatted}
                            </div>

                            <div className="hidden md:flex flex-col items-start">
                                <p className="font-bold">{GenericHelper?.formatDuration(flight?.legs?.[0]?.durationInMinutes)}</p>
                                <p className="text-sm text-gray-500">
                                    {searchResults?.filterStats?.airports?.[0]?.airports?.[0]?.id} -{" "}
                                    {searchResults?.filterStats?.airports?.[1]?.airports?.[0]?.id}
                                </p>
                            </div>

                            <div className="hidden md:flex flex-col items-start">
                                <p className="font-bold">
                                    {flight?.legs?.[0]?.stopCount === 0
                                        ? "Nonstop"
                                        : flight?.legs?.[0]?.stopCount === 1
                                            ? `${flight?.legs?.[0]?.stopCount} Stop`
                                            : `${flight?.legs?.[0]?.stopCount} Stops`}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            )}
        </>
    )
}

export default FlightResults
