import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import HouseIcon from '@mui/icons-material/House';
import LuggageIcon from '@mui/icons-material/Luggage';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Header = () => {
    const list = [
        {icon: <LuggageIcon style={{color: "#a9c7fa"}}/>, name: "Travel", category: "Explore"},
        {icon: <TravelExploreIcon style={{color: "#a9c7fa"}}/>, name: "Explore", category: "Explore"},
        {icon: <FlightIcon style={{color: "#a9c7fa"}}/>, name: "Flights", category: "Travel", selected: true},
        {icon: <HotelIcon style={{color: "#a9c7fa"}}/>, name: "Hotels", category: "Travel"},
        {icon: <HouseIcon style={{color: "#a9c7fa"}}/>, name: "Vacation Rentals", category: "Travel"}
    ];

    return (
        <header
            className="fixed top-0 left-0 right-0 w-full flex items-center justify-between text-white p-4 border-b border-gray-700"
            style={{backgroundColor: "#202124"}}
        >
            <div className="flex items-center space-x-4">
                <MenuIcon style={{color: "white", fontSize: "2rem"}}/>
                <p className="text-2xl">Google</p>

                <div className="hidden md:flex space-x-2">
                    {list.map((item, index) => (
                        <div
                            key={index}
                            className={`p-2 px-4 flex items-center border border-gray-600 rounded-full ${
                                item?.selected ? "bg-gray-700" : ""
                            }`}
                        >
                            {item?.icon}
                            <p className="px-2">{item?.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <LightModeOutlinedIcon/>
                <AppsOutlinedIcon/>
                <AccountCircleOutlinedIcon/>
            </div>
        </header>
    );
}

export default Header;
