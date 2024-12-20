import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Item from '../interface/item';

interface MyProp {
  itemsIn: Item[];
}

interface ExtendedItem extends Item {
  temperature: string;
  tempMin: string;
  tempMax: string;
  windSpeed: string;
  windDirection: string;
  pressure: string;
  weatherDescription: string;
}

export default function BasicTable(props: MyProp) {
  const [rows, setRows] = useState<ExtendedItem[]>([]);

  useEffect(() => {
    
    const extendedData: ExtendedItem[] = props.itemsIn.slice(0, 10).map((item) => {
      return {
        ...item,
        temperature: item.temperature || "N/A",
        tempMin: item.tempMin || "N/A",
        tempMax: item.tempMax || "N/A",
        windSpeed: item.windSpeed || "N/A",
        windDirection: item.windDirection || "N/A",
        pressure: item.pressure || "N/A",
        weatherDescription: item.weatherDescription || "N/A",
      };
    });

    setRows(extendedData);
  }, [props.itemsIn]);

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ width: '100%', margin: 0 }}>
      <Grid item xs={12} md={12}>
        <Paper
          sx={{
            backgroundColor: '#e3f2fd',
            padding: 3,
            borderRadius: 2,
            margin: '0 auto',
            boxShadow: 'none',
          }}
        >
          <Typography
            variant="h5"
            color="primary"
            gutterBottom
            textAlign="center"
            sx={{ marginBottom: 2 }}
          >
            Tabla Informativa
          </Typography>
          <TableContainer component={Paper} elevation={0} sx={{ overflow: 'hidden' }}>
            <Table sx={{ minWidth: '100%', tableLayout: 'fixed' }} aria-label="extended table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Hora de inicio</TableCell>
                  <TableCell align="center">Hora de fin</TableCell>
                  <TableCell align="center">Temperatura (°C)</TableCell>
                  <TableCell align="center">Temp. Mín (°C)</TableCell>
                  <TableCell align="center">Temp. Máx (°C)</TableCell>
                  <TableCell align="center">Viento (m/s)</TableCell>
                  <TableCell align="center">Dir. Viento</TableCell>
                  <TableCell align="center">Presión (hPa)</TableCell>
                  <TableCell align="center">Descripción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, idx) => (
                  <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center">{row.dateStart}</TableCell>
                    <TableCell align="center">{row.dateEnd}</TableCell>
                    <TableCell align="center">{row.temperature}</TableCell>
                    <TableCell align="center">{row.tempMin}</TableCell>
                    <TableCell align="center">{row.tempMax}</TableCell>
                    <TableCell align="center">{row.windSpeed}</TableCell>
                    <TableCell align="center">{row.windDirection}</TableCell>
                    <TableCell align="center">{row.pressure}</TableCell>
                    <TableCell align="center">{row.weatherDescription}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}
