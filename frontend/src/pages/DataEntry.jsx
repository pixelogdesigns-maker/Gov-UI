import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    TextField, Button, Grid, MenuItem, Typography, Paper,
    InputAdornment, Box, Divider
} from '@mui/material';
import {
    SaveRounded, LocationOnRounded, PeopleRounded, HouseRounded,
    NotesRounded, CalendarMonthRounded, CleaningServicesRounded
} from '@mui/icons-material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../api/axios';
import { useSnackbar } from 'notistack';

const schema = yup.object({
    district: yup.string().required('District is required'),
    village: yup.string().required('Village is required'),
    population: yup.number().typeError('Must be a number').positive().integer().required(),
    households: yup.number().typeError('Must be a number').positive().integer().required(),
    remarks: yup.string(),
    date: yup.string().required('Date is required')
});

const DataEntry = () => {
    const { control, handleSubmit, watch, reset, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: { district: '', village: '', population: '', households: '', remarks: '', date: new Date().toISOString().split('T')[0] }
    });
    const { enqueueSnackbar } = useSnackbar();

    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    const selectedDistrict = watch('district');

    useEffect(() => {
        api.get('/masters/districts').then(res => setDistricts(res.data)).catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (selectedDistrict) {
            api.get(`/masters/villages?district=${selectedDistrict}`).then(res => setVillages(res.data)).catch(err => console.error(err));
        } else {
            setVillages([]);
        }
    }, [selectedDistrict]);

    const onSubmit = async (data) => {
        try {
            await api.post('/records', data);
            enqueueSnackbar('Record saved successfully!', { variant: 'success' });
            reset({ ...data, population: '', households: '', remarks: '' });
        } catch (error) {
            enqueueSnackbar('Error saving record', { variant: 'error' });
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 1, color: '#1e293b' }}>New Record Entry</Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                Enter population metrics for a specific village. Ensure data accuracy.
            </Typography>

            <Paper elevation={0} sx={{ p: 5, maxWidth: 900, mx: 'auto', borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#ffffff' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#2563eb', mb: 2 }}>Location Details</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="district"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            select
                                            label="Select District"
                                            fullWidth
                                            variant="outlined"
                                            error={!!errors.district}
                                            helperText={errors.district?.message}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LocationOnRounded color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        >
                                            {districts.map(d => <MenuItem key={d._id} value={d._id}>{d.name}</MenuItem>)}
                                        </TextField>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="village"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            select
                                            label="Select Village"
                                            fullWidth
                                            variant="outlined"
                                            error={!!errors.village}
                                            helperText={errors.village?.message}
                                            disabled={!selectedDistrict}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <HouseRounded color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        >
                                            {villages.map(v => <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>)}
                                        </TextField>
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider sx={{ my: 4 }} />

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#2563eb', mb: 2 }}>Population Metrics</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <Controller
                                    name="population"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Total Population"
                                            fullWidth
                                            type="number"
                                            error={!!errors.population}
                                            helperText={errors.population?.message}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PeopleRounded color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Controller
                                    name="households"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Total Households"
                                            fullWidth
                                            type="number"
                                            error={!!errors.households}
                                            helperText={errors.households?.message}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <HouseRounded color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Controller
                                    name="date"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Date of Entry"
                                            type="date"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            error={!!errors.date}
                                            helperText={errors.date?.message}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CalendarMonthRounded color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Controller
                            name="remarks"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Additional Remarks"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    placeholder="Any specific observations..."
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <NotesRounded color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        <Button variant="outlined" color="inherit" startIcon={<CleaningServicesRounded />} onClick={() => reset()}>
                            Clear Form
                        </Button>
                        <Button type="submit" variant="contained" size="large" startIcon={<SaveRounded />} sx={{ px: 4, py: 1.5 }}>
                            Submit Record
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default DataEntry;
