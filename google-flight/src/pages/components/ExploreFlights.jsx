import React, {useMemo, useState} from 'react';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import SelectInput from "./SelectInput.jsx";
import MultipleStopOutlinedIcon from '@mui/icons-material/MultipleStopOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import PassengerCountSelect from "./PassengerCountSelect.jsx";
import {fetchCitiesInformation, fetchFlights} from "./NetworkRequests.js";
import {Button, FormControl, InputBase, MenuItem} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "react-datepicker/dist/react-datepicker.css";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {GenericHelper} from "../Helpers/GenericHelper.js";
import FlightResults from "./FlightResults.jsx";

const ExploreFlights = () => {
    const [passengerCounts, setPassengerCounts] = useState({
        Adult: 1,
        Children: 0,
        Infants: 0,
    });
    const [cityQueryTo, setCityQueryTo] = useState("");
    const [cityQueryFrom, setCityQueryFrom] = useState("");
    const [cityResultsTo, setCityResultsTo] = useState([]);
    const [cityResultsFrom, setCityResultsFrom] = useState([]);
    const [debounceTimeout, setDebounceTimeout] = useState(null);
    const [tripType, setTripType] = useState("One Way");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);
    const [cabinClass, setCabinClass] = useState("Business");
    const [searchResults, setSearchResults] = useState()
    const handlePassengerCountChange = (updatedCounts) => {
        setPassengerCounts(updatedCounts);
    };

    const tripTypes = useMemo(() => [
        {name: "One Way", value: "One Way", icon: <ArrowRightAltOutlinedIcon/>},
        {name: "Round Trip", value: "Round Trip", icon: <CompareArrowsOutlinedIcon/>},
        {name: "Multi City", value: "Multi City", icon: <MultipleStopOutlinedIcon/>},
    ], []);

    const classTypes = useMemo(() => [
        {name: "Business", value: "Business", icon: ""},
        {name: "Economy", value: "Economy", icon: ""},
        {name: "Premium Economy", value: "Premium Economy", icon: ""},
    ], []);

    const searchCity = (event, type) => {
        const query = event.target.value;
        if (type === "to") {
            setCityQueryTo(query);
        } else {
            setCityQueryFrom(query);
        }

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const timeout = setTimeout(() => {
            fetchCitiesInformation([query]).then((response) => {
                if (type === "to") {
                    setCityResultsTo(response?.data || []);
                } else {
                    setCityResultsFrom(response?.data || []);
                }
            });
        }, 500);

        setDebounceTimeout(timeout);
    };

    const handleCitySelect = (city, type) => {
        if (type === "to") {
            setCityQueryTo(city);
            setOpenTo(false);
        } else {
            setCityQueryFrom(city);
            setOpenFrom(false);
        }
    };


    const getResults = () => {
        fetchFlights(
            cityQueryFrom?.skyId,
            cityQueryTo?.skyId,
            cityQueryFrom?.entityId,
            cityQueryTo?.entityId,
            GenericHelper?.getDate(startDate.toDate()),
            cabinClass?.toLowerCase(),
            passengerCounts?.Adult + passengerCounts?.Children + passengerCounts?.Infants,
            "best",
            "PKR",
            "en-US",
            "PK"
        ).then((response) => {
            setSearchResults(response?.data || []);
        });
    }

    return (
        <div>
            <div className=" rounded-lg shadow-lg my-8"
                 style={{backgroundColor: "#36373a", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)"}}>
                <div className={"items-start flex"}>
                    <SelectInput options={tripTypes} value={tripType} onChange={setTripType}/>
                    <PassengerCountSelect
                        total={passengerCounts?.Adult + passengerCounts?.Children + passengerCounts?.Infants}
                        value={passengerCounts}
                        onChange={handlePassengerCountChange}
                    />
                    <SelectInput options={classTypes} value={classTypes?.[0]?.value} onChange={setCabinClass}/>
                </div>

                <div className="flex space-x-4 mx-4 lg:flex-row md:flex-col sm:justify-center sm:items-center">
                    <FormControl sx={{m: 1}} variant="standard">
                        <div className={"flex items-center py-1 px-2"} style={{
                            border: "1px solid gray",
                            borderRadius: "4px",
                        }}>
                            <CircleOutlinedIcon/>
                            <InputBase
                                id="from-customized-textbox"
                                placeholder="From Where?"
                                value={cityQueryFrom?.presentation?.title}
                                onChange={(e) => searchCity(e, "from")}
                                onFocus={() => setOpenFrom(true)}
                                sx={{
                                    width: 300,
                                    padding: "0.5rem",
                                    color: "white"
                                }}
                            />
                        </div>
                        {openFrom && cityResultsFrom.length > 0 &&
                            cityResultsFrom.map((city, index) => (
                                <MenuItem key={index} onClick={() => handleCitySelect(city, "from")}
                                          className="city-results">
                                    {city?.presentation?.title}
                                </MenuItem>
                            ))}
                    </FormControl>

                    <FormControl sx={{m: 1}} variant="standard">
                        <div className={"flex items-center py-1 px-2"} style={{
                            border: "1px solid gray",
                            borderRadius: "4px",
                        }}>
                            <LocationOnIcon/>
                            <InputBase
                                id="to-customized-textbox"
                                placeholder="Where To?"
                                value={cityQueryTo?.presentation?.title}
                                onChange={(e) => searchCity(e, "to")}
                                onFocus={() => setOpenTo(true)}
                                sx={{
                                    width: 300,
                                    padding: "0.5rem",
                                    color: "white"
                                }}
                            />
                        </div>
                        {openTo && cityResultsTo.length > 0 &&
                            cityResultsTo.map((city, index) => (
                                <MenuItem key={index} onClick={() => handleCitySelect(city, "to")}
                                          className="city-results">
                                    {city?.presentation?.title}
                                </MenuItem>
                            ))}
                    </FormControl>
                    <div className="flex">

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                sx={{
                                    "& .MuiInputBase-root": {
                                        border: "0.1px solid gray",
                                        borderColor: "#86898d",
                                        color: "#86898d",
                                    },
                                    "& .MuiOutlinedInput-notchedOutline": {borderColor: "#86898d"},
                                    "& .MuiSvgIcon-root": {color: "#86898d"},
                                    "& .MuiPickersDay-root": {color: "#86898d"},
                                    "& .MuiPickersDay-root.Mui-selected": {
                                        backgroundColor: "#86898d",
                                        color: "#86898d"
                                    },
                                    "& .MuiPaper-root": {backgroundColor: "transparent"},
                                }}
                            />

                            {tripType === "Round Trip" &&
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            border: "0.1px solid gray",
                                            borderColor: "#86898d",
                                            color: "#86898d",
                                            marginLeft: "0.5rem",
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {borderColor: "#86898d"},
                                        "& .MuiSvgIcon-root": {color: "#86898d"},
                                        "& .MuiPickersDay-root": {color: "#86898d"},
                                        "& .MuiPickersDay-root.Mui-selected": {
                                            backgroundColor: "#86898d",
                                            color: "#86898d"
                                        },
                                        "& .MuiPaper-root": {backgroundColor: "transparent"},
                                    }}
                                />
                            }
                        </LocalizationProvider>
                    </div>
                </div>

                <Button startIcon={<SearchOutlinedIcon/>} style={{
                    color: "black",
                    bottom: -25,
                    backgroundColor: "#7597ce",
                    borderRadius: 30,
                    height: "3rem",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: 550,
                    fontSize: "12px"
                }} onClick={getResults}>Explore</Button>


            </div>
            <FlightResults searchResults={searchResults}/>
        </div>
    );
};

export default ExploreFlights;
