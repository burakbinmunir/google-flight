import React, {useMemo} from "react";
import {Box, FormControl, IconButton, MenuItem, Select, Typography} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const PassengerCountSelect = ({value, onChange}) => {
    const passengerTypes = useMemo(() => [
        {name: "Adult", subName: "", minCount: 1, maxCount: 10},
        {name: "Children", subName: "Aged 2 - 11", minCount: 0, maxCount: 10},
        {name: "Infants", subName: "In seat", minCount: 0, maxCount: 10},
        {name: "Infants", subName: "On lap", minCount: 0, maxCount: 10},
    ], []);

    const handleCountChange = (type, delta) => {
        onChange((prev) => {
            const newCount = prev[type] + delta;
            return {...prev, [type]: newCount};
        });
    };

    const total = Object.values(value).reduce((sum, count) => sum + count, 0);

    return (
        <FormControl sx={{m: 1,}}>
            <Select
                value={total?.toString()}
                onChange={() => {
                }}
                displayEmpty
                sx={{"& fieldset": {border: "none"}, color: "black"}}
                inputProps={{"aria-label": "Passenger count"}}
            >

                <MenuItem value={total?.toString()}>
                    <Box sx={{display: "flex", width: "100%"}}>
                        <PersonOutlineOutlinedIcon style={{color: "#86898d"}}/>
                        <Typography variant="body1" style={{color: "#86898d"}}>{total}</Typography>
                    </Box>
                </MenuItem>

                {!!passengerTypes && passengerTypes?.map((passenger, index) => (
                    <MenuItem key={index} value={passenger?.name}>
                        <Box sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                            <Box>
                                <Typography variant="body1">{passenger?.name}</Typography>
                                {passenger.subName && (
                                    <Typography variant="body2" color="gray">
                                        {passenger?.subName}
                                    </Typography>
                                )}
                            </Box>

                            <Box sx={{display: "flex", alignItems: "center"}}>
                                <IconButton
                                    size="small"
                                    onClick={() => handleCountChange(passenger?.name, -1)}
                                    disabled={value[passenger?.name] <= passenger?.minCount}
                                >
                                    <RemoveIcon/>
                                </IconButton>
                                <Typography sx={{mx: 1}}>{value[passenger?.name]}</Typography>
                                <IconButton
                                    size="small"
                                    onClick={() => handleCountChange(passenger?.name, 1)}
                                    disabled={value[passenger?.name] >= passenger?.maxCount}
                                >
                                    <AddIcon/>
                                </IconButton>
                            </Box>
                        </Box>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default PassengerCountSelect;
