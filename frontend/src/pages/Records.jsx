import { useEffect, useState } from 'react';
import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Typography, Box, TextField, Grid, Button, MenuItem,
    InputAdornment, Chip, IconButton
} from '@mui/material';
import { DownloadRounded, FilterListRounded, SearchRounded, MoreVertRounded } from '@mui/icons-material';
import api from '../api/axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import useAuth from '../hooks/useAuth';

const Records = () => {
    const { user } = useAuth();
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [districts, setDistricts] = useState([]);

    // Filters
    const [filterDistrict, setFilterDistrict] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        api.get('/masters/districts').then(res => setDistricts(res.data));
    }, []);

    const fetchRecords = async () => {
        let query = `?pageNumber=${page + 1}`;
        if (filterDistrict) query += `&district=${filterDistrict}`;
        if (startDate) query += `&startDate=${startDate}`;
        if (endDate) query += `&endDate=${endDate}`;

        try {
            const { data } = await api.get(`/records${query}`);
            setRecords(data.records);
            setTotal(data.total);
        } catch (e) { console.error(e); }
    };

    useEffect(() => {
        fetchRecords();
    }, [page, filterDistrict, startDate, endDate]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleExport = async () => {
        try {
            const query = filterDistrict ? `?district=${filterDistrict}` : '';
            const response = await api.get(`/records/export${query}`);
            const data = response.data.map(rec => ({
                District: rec.district?.name,
                Village: rec.village?.name,
                Population: rec.population,
                Households: rec.households,
                Date: new Date(rec.date).toLocaleDateString(),
                Remarks: rec.remarks,
                EnteredBy: rec.createdBy?.name
            }));

            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Records");
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
            saveAs(blob, `Records_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
        } catch (error) {
            console.error("Export failed", error);
            alert("Export failed or unauthorized");
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b' }}>Data Records</Typography>
                    <Typography variant="body2" color="textSecondary">Manage and view all entered population data.</Typography>
                </Box>
                {user?.role === 'Admin' && (
                    <Button variant="contained" color="success" startIcon={<DownloadRounded />} onClick={handleExport} sx={{ borderRadius: 2 }}>
                        Export to Excel
                    </Button>
                )}
            </Box>

            <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: '1px solid #e2e8f0' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FilterListRounded fontSize="small" /> FILTER RECORDS
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            select
                            label="Filter by District"
                            fullWidth
                            size="small"
                            value={filterDistrict}
                            onChange={(e) => setFilterDistrict(e.target.value)}
                            sx={{ bgcolor: '#f8fafc' }}
                        >
                            <MenuItem value="">All Districts</MenuItem>
                            {districts.map(d => <MenuItem key={d._id} value={d._id}>{d.name}</MenuItem>)}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            type="date"
                            label="From Date"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            sx={{ bgcolor: '#f8fafc' }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            type="date"
                            label="To Date"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            sx={{ bgcolor: '#f8fafc' }}
                        />
                    </Grid>
                </Grid>
            </Paper>

            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#f8fafc' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, color: '#64748b' }}>DATE</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#64748b' }}>DISTRICT</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#64748b' }}>VILLAGE</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#64748b' }}>POPULATION</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#64748b' }}>HOUSEHOLDS</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#64748b' }}>REMARKS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((row) => (
                            <TableRow key={row._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Chip label={row.district?.name} size="small" sx={{ bgcolor: '#eff6ff', color: '#2563eb', fontWeight: 500 }} />
                                </TableCell>
                                <TableCell>{row.village?.name}</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>{row.population.toLocaleString()}</TableCell>
                                <TableCell>{row.households}</TableCell>
                                <TableCell sx={{ color: '#64748b' }}>{row.remarks || '-'}</TableCell>
                            </TableRow>
                        ))}
                        {records.length === 0 && (
                            <TableRow><TableCell colSpan={6} align="center" sx={{ py: 5 }}>No records found matching your criteria</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={total}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[10]}
                    sx={{ borderTop: '1px solid #e2e8f0' }}
                />
            </TableContainer>
        </Box>
    );
};
export default Records;
