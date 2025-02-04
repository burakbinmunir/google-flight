import React from 'react'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import {Typography} from "@mui/material";

const Footer = () => {
    const list = [
        {
            key: "Language",
            value: "English (United States)",
            icon: <LanguageOutlinedIcon style={{color: "#7597ce", height: 17, width: 17}}/>
        }, {
            key: "Location",
            value: "Pakistan",
            icon: <LocationOnOutlinedIcon style={{color: "#7597ce", height: 17, width: 17}}/>
        }, {
            key: "Currency",
            value: "PKR",
            icon: <PaymentsOutlinedIcon style={{color: "#7597ce", height: 17, width: 17}}/>
        },
    ]

    const links = [
        {
            key: "About",
            value: "https://about.google/?hl=en-US",
        }, {
            key: "Privacy",
            value: "https://policies.google.com/privacy?hl=en-US",
        }, {
            key: "Terms",
            value: "https://policies.google.com/terms?hl=en-US",
        }, {
            key: "Help Center",
            value: "https://support.google.com/travel/?hl=en#topic=2475360",
        },
    ]

    return (
        <footer className={'my-10 py-6 justify-center'}
                style={{borderWidth: 1, borderRightWidth: 0, borderLeftWidth: 0}}>
            <div className={'justify-center flex'}>
                {!!list &&
                    list?.map((item, index) => (
                        <div
                            key={index}
                            className={`py-1 px-4 mx-1 flex items-center border border-gray-600 rounded-full ${
                                item?.selected ? "bg-gray-700" : ""
                            }`}
                        >
                            {item?.icon}
                            <p className="px-2" style={{color: "#7597ce", fontSize: "14px",}}>{item?.key}</p>
                            <div style={{backgroundColor: "#7597ce", height: "2px", width: "2px",}}
                                 className="rounded-full"/>
                            <p style={{color: "#7597ce", fontSize: "14px"}} className="px-2">{item?.value}</p>
                        </div>
                    ))}
            </div>
            <div style={{marginTop: "1rem"}}>
                <Typography style={{fontSize: "14px", color: "#9aa0a7"}}>

                    Current language and currency options
                    applied: {list?.[0]?.value} - {list?.[1]?.value} - {list?.[2]?.value}
                </Typography>
                <Typography style={{fontSize: "14px", color: "#9aa0a7"}}>

                    Displayed currencies may differ from the currencies used to purchase flights.
                    <a style={{color: "#7597ce"}}
                       href={"https://www.google.com/googlefinance/disclaimer/?hl=en-US&gl=PK"}> Learn more </a>
                </Typography>
                <Typography style={{fontSize: "14px", marginTop: "1rem", color: "#9aa0a7"}}>
                    Prices are final prices and include all taxes and fees, including payment fees for the cheapest
                    common payment method (which may differ depending on the provider). Additional charges may apply for
                    other types of payment, luggage, meals, WLAN or other additional services. Prices, availability and
                    travel details are provided based on the latest information received from our partners. This
                    information is reflected in the results within a period of less than 24 hours. Additional conditions
                    may also be applied by our partners. You should then check prices and conditions with the services
                    providers before booking.
                </Typography>
            </div>
            <div className={'justify-center flex mt-8'}>
                {!!links &&
                    links?.map((item, index) => (
                        <a href={item?.value} key={index}>
                            <p className="px-2" style={{color: "#7597ce", fontSize: "14px",}}>{item?.key}</p>
                        </a>

                    ))}
            </div>
        </footer>
    )
}

export default Footer
