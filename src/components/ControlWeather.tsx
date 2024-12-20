import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ControlWeatherProps {
    onSelectVariable: (variable: string) => void;
}

export default function ControlWeather({ onSelectVariable }: ControlWeatherProps) {
    const [selected, setSelected] = useState<number>(-1);

    const items = [
        { name: 'Precipitación', key: 'precipitation' },
        { name: 'Humedad', key: 'humidity' },
        { name: 'Nubosidad', key: 'clouds' },
    ];

    const handleChange = (event: SelectChangeEvent) => {
    const idx = parseInt(event.target.value);
    setSelected(idx);

    if (idx >= 0) {
        onSelectVariable(items[idx].key);
    }
    };

    return (
    <Paper
        sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        }}
    >
        <Typography mb={2} component="h3" variant="h6" color="primary">
        Variables Meteorológicas
        </Typography>
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
            <InputLabel id="variable-select-label">Variables</InputLabel>
            <Select
            labelId="variable-select-label"
            value={selected.toString()}
            onChange={handleChange}
            >
            <MenuItem value="-1" disabled>
                Seleccione una variable
            </MenuItem>
            {items.map((item, idx) => (
                <MenuItem key={idx} value={idx.toString()}>
                {item.name}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        </Box>
        {selected >= 0 && (
        <Typography mt={2} component="p" color="text.secondary">
            {`Variable seleccionada: ${items[selected].name}`}
        </Typography>
        )}
    </Paper>
    );
}
