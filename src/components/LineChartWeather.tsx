import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';

interface Item {
    dateStart: string;
    dateEnd: string;
    precipitation: string;
    humidity: string;
    clouds: string;
}

interface LineChartWeatherProps {
    items: Item[];
    selectedVariable: string;
}

export default function LineChartWeather({ items, selectedVariable }: LineChartWeatherProps) {
    const data = items.map((item) => ({
    date: item.dateStart,
    value: parseFloat(item[selectedVariable as keyof Item] || "0"),
    }));

    return (
    <Paper
        sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        }}
    >
        <Typography variant="h6" color="primary" gutterBottom>
            {selectedVariable
            ? `Gráfico de ${selectedVariable.charAt(0).toUpperCase() + selectedVariable.slice(1)}`
            : "Seleccione una variable para visualizar"}
        </Typography>
        {selectedVariable ? (
        <LineChart
            width={600}
            height={300}
            series={[{ data: data.map((d) => d.value), label: selectedVariable }]}
            xAxis={[{ scaleType: 'point', data: data.map((d) => d.date) }]}
        />
        ) : (
        <Typography variant="body1" color="textSecondary">
            No hay datos para mostrar. Por favor, seleccione una variable.
        </Typography>
        )}
    </Paper>
    );
}
