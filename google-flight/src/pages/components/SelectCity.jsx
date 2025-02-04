import React, { useState } from 'react';
import { Box, FormControl, Input, MenuItem, Select, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { fetchCitiesInformation } from "./NetworkRequests.js";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const SelectCity = (props) => {
    const [data, setData] = useState([]);
    const [debounceTimeout, setDebounceTimeout] = useState(null);
    const [open, setOpen] = useState(false); // State to control dialog visibility
    const [selectedCity, setSelectedCity] = useState('');

    const searchCity = (event, type) => {
        const query = event.target.value;

        // Clear the previous timeout to avoid multiple API calls while typing
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        // Set a new timeout to call the API after 500ms
        const timeout = setTimeout(() => {
            fetchCitiesInformation([query]).then((response) => {
                setData(response?.data);
            });
        }, 500);

        setDebounceTimeout(timeout);
    };

    const handleChange = (event) => {
        setSelectedCity(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1 }}>
                <Select
                    value={selectedCity}
                    onChange={handleChange}
                    displayEmpty
                    open={open} // Control when the dropdown should open
                    onOpen={() => setOpen(true)} // Keep the dropdown open when clicked
                    onClose={() => setOpen(false)} // Close the dropdown when clicked outside
                    sx={{ "& fieldset": { border: "none" }, color: "black" }}
                    inputProps={{ "aria-label": "Search city" }}
                >
                    <Input
                        placeholder="Search city"
                        onChange={(e) => searchCity(e)}
                        sx={{
                            width: "100%",
                            padding: "0.5rem",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            marginBottom: "1rem",
                        }}
                    />

                    {!!data && data.length > 0 && data.map((item, index) => (
                        <MenuItem key={index} value={item?.presentation?.title}>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                <PersonOutlineOutlinedIcon style={{ color: "#86898d" }} />
                                <Typography variant="body1" style={{ color: "#86898d" }}>
                                    {item?.presentation?.title}
                                </Typography>
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Optional Dialog to wrap the input */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Select a City</DialogTitle>
                <DialogContent>
                    <FormControl sx={{ m: 1 }}>
                        <Select
                            value={selectedCity}
                            onChange={handleChange}
                            displayEmpty
                            sx={{ "& fieldset": { border: "none" }, color: "black" }}
                            inputProps={{ "aria-label": "Search city" }}
                        >
                            <Input
                                placeholder="Search city"
                                onChange={(e) => searchCity(e)}
                                sx={{
                                    width: "100%",
                                    padding: "0.5rem",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    marginBottom: "1rem",
                                }}
                            />
                            {!!data && data.length > 0 && data.map((item, index) => (
                                <MenuItem key={index} value={item?.presentation?.title}>
                                    <Box sx={{ display: "flex", width: "100%" }}>
                                        <PersonOutlineOutlinedIcon style={{ color: "#86898d" }} />
                                        <Typography variant="body1" style={{ color: "#86898d" }}>
                                            {item?.presentation?.title}
                                        </Typography>
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SelectCity;
