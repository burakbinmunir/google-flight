import React from 'react'
import {FormControl, MenuItem, Select} from "@mui/material";


const SelectInput = props => {
    const {options} = props;
    const [value, setValue] = React?.useState(props?.value)

    const handleChange = (event) => {
        setValue(event?.target?.value)
        props?.onChange?.(event?.target?.value)
    }

    return (
        <FormControl sx={{m: 1, minWidth: 120}}>
            <Select
                value={value}
                onChange={handleChange}
                displayEmpty
                style={{color: "#86898d",}}
                sx={{
                    "& fieldset": {border: "none"},
                }}
                inputProps={{'aria-label': 'Without label'}}
            >
                {!!options && options.length > 0 && options.map((option, index) => (
                    <MenuItem value={option?.value} key={index}>
                        {option?.icon}
                        {option?.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

    )
}

export default SelectInput
