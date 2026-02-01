import { useEffect, useState } from 'react';
import { Box, Paper, Tabs, Tab, Typography, TextField, Button, Grid, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import api from '../api/axios';
import { useSnackbar } from 'notistack';

const Masters = () => {
    const [tab, setTab] = useState(0);
    const { enqueueSnackbar } = useSnackbar();

    // States
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    // Forms
    const [dName, setDName] = useState('');
    const [dCode, setDCode] = useState('');

    const [vName, setVName] = useState('');
    const [vCode, setVCode] = useState('');
    const [vDist, setVDist] = useState('');

    const fetchData = () => {
        api.get('/masters/districts').then(res => setDistricts(res.data));
        api.get('/masters/villages').then(res => setVillages(res.data));
    };

    useEffect(() => { fetchData(); }, []);

    const handleAddDistrict = async () => {
        try {
            await api.post('/masters/districts', { name: dName, code: dCode });
            enqueueSnackbar('District Added', { variant: 'success' });
            setDName(''); setDCode('');
            fetchData();
        } catch (e) { enqueueSnackbar('Error adding district', { variant: 'error' }); }
    };

    const handleAddVillage = async () => {
        try {
            await api.post('/masters/villages', { name: vName, code: vCode, district: vDist });
            enqueueSnackbar('Village Added', { variant: 'success' });
            setVName(''); setVCode(''); setVDist('');
            fetchData();
        } catch (e) { enqueueSnackbar('Error adding village', { variant: 'error' }); }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Master Management</Typography>
            <Paper>
                <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                    <Tab label="Districts" />
                    <Tab label="Villages" />
                </Tabs>
            </Paper>

            <Box sx={{ mt: 3 }}>
                {tab === 0 && (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>Add District</Typography>
                                <TextField label="Name" fullWidth value={dName} onChange={(e) => setDName(e.target.value)} sx={{ mb: 2 }} />
                                <TextField label="Code" fullWidth value={dCode} onChange={(e) => setDCode(e.target.value)} sx={{ mb: 2 }} />
                                <Button variant="contained" onClick={handleAddDistrict}>Add</Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead><TableRow><TableCell>Name</TableCell><TableCell>Code</TableCell></TableRow></TableHead>
                                    <TableBody>
                                        {districts.map(d => (
                                            <TableRow key={d._id}><TableCell>{d.name}</TableCell><TableCell>{d.code}</TableCell></TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                )}

                {tab === 1 && (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>Add Village</Typography>
                                <TextField label="Name" fullWidth value={vName} onChange={(e) => setVName(e.target.value)} sx={{ mb: 2 }} />
                                <TextField label="Code" fullWidth value={vCode} onChange={(e) => setVCode(e.target.value)} sx={{ mb: 2 }} />
                                <TextField select label="District" fullWidth value={vDist} onChange={(e) => setVDist(e.target.value)} sx={{ mb: 2 }}>
                                    {districts.map(d => <MenuItem key={d._id} value={d._id}>{d.name}</MenuItem>)}
                                </TextField>
                                <Button variant="contained" onClick={handleAddVillage}>Add</Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead><TableRow><TableCell>Name</TableCell><TableCell>Code</TableCell><TableCell>District</TableCell></TableRow></TableHead>
                                    <TableBody>
                                        {villages.map(v => (
                                            <TableRow key={v._id}>
                                                <TableCell>{v.name}</TableCell>
                                                <TableCell>{v.code}</TableCell>
                                                <TableCell>{v.district?.name}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Box>
    );
};

export default Masters;
