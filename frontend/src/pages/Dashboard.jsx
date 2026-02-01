import { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box, Card, CardContent, Chip } from '@mui/material';
import api from '../api/axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAuth from '../hooks/useAuth';
import { AnalyticsRounded, TableChartRounded, SupervisorAccountRounded } from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => (
    <Card elevation={2} sx={{ height: '100%', borderRadius: 3, borderLeft: `6px solid ${color}`, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
                <Typography color="textSecondary" variant="h6" sx={{ fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{title}</Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, mt: 1, color: '#334155' }}>{value}</Typography>
            </Box>
            <Box sx={{ bgcolor: `${color}15`, p: 2, borderRadius: '50%' }}>
                {icon}
            </Box>
        </CardContent>
    </Card>
);

const Dashboard = () => {
    const [stats, setStats] = useState({ totalRecords: 0 });
    const { user } = useAuth();

    useEffect(() => {
        // Only fetch if admin for now, or adjust backend to allow general stats
        if (user?.role === 'Admin' || true) { // Allow everyone to see stats for demo
            const fetchStats = async () => {
                try {
                    const { data } = await api.get('/records/stats');
                    setStats(data);
                } catch (e) { console.error(e); }
            };
            fetchStats();
        }
    }, [user]);

    const data = [
        { name: 'Monday', entries: 12 },
        { name: 'Tuesday', entries: 19 },
        { name: 'Wednesday', entries: 3 },
        { name: 'Thursday', entries: 5 },
        { name: 'Friday', entries: 8 },
        { name: 'Saturday', entries: 4 },
        { name: 'Sunday', entries: 10 },
    ];

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b' }}>Dashboard Overview</Typography>
                <Typography variant="body1" color="textSecondary">Welcome back, here's what's happening today.</Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <StatCard
                        title="Total Records"
                        value={stats.totalRecords}
                        icon={<TableChartRounded sx={{ fontSize: 30, color: '#2563eb' }} />}
                        color="#2563eb"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard
                        title="Active Sessions"
                        value="1"
                        icon={<AnalyticsRounded sx={{ fontSize: 30, color: '#0ea5e9' }} />}
                        color="#0ea5e9"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard
                        title="Your Role"
                        value={user?.role}
                        icon={<SupervisorAccountRounded sx={{ fontSize: 30, color: '#10b981' }} />}
                        color="#10b981"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={4} sx={{ mt: 1 }}>
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, height: 450 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>Weekly Entry Analytics</Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: 8, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', border: 'none' }}
                                    cursor={{ fill: '#f1f5f9' }}
                                />
                                <Bar dataKey="entries" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, height: 450 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Recent Activity</Typography>
                        <Box sx={{ mt: 3 }}>
                            {[1, 2, 3, 4].map((i) => (
                                <Box key={i} sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
                                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: i % 2 === 0 ? '#10b981' : '#2563eb' }} />
                                    <Box>
                                        <Typography variant="subtitle2">New Record Added</Typography>
                                        <Typography variant="caption" color="textSecondary">Just now</Typography>
                                    </Box>
                                </Box>
                            ))}
                            <Chip label="View All Activity" clickable sx={{ mt: 2, bgcolor: '#f1f5f9' }} />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
