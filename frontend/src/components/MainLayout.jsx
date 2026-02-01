import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem,
    ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Button,
    Avatar, useTheme, useMediaQuery
} from '@mui/material';
import {
    Menu as MenuIcon, DashboardRounded, EditRounded, TableChartRounded,
    StorageRounded, LogoutRounded, AccountCircle
} from '@mui/icons-material';
import useAuth from '../hooks/useAuth';

const drawerWidth = 260;

const MainLayout = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardRounded />, path: '/', roles: ['Admin', 'Operator', 'Viewer'] },
        { text: 'Data Entry', icon: <EditRounded />, path: '/entry', roles: ['Admin', 'Operator'] },
        { text: 'Records List', icon: <TableChartRounded />, path: '/records', roles: ['Admin', 'Operator', 'Viewer'] },
        { text: 'Master Data', icon: <StorageRounded />, path: '/masters', roles: ['Admin'] },
    ];

    const drawer = (
        <Box sx={{
            height: '100%',
            background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)', // Sleek Dark Sidebar
            color: '#f8fafc',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 0.5, bg: 'clip', background: 'linear-gradient(to right, #60a5fa, #38bdf8)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                    GOV PORTAL
                </Typography>
            </Toolbar>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
            <List sx={{ px: 2, mt: 2, flexGrow: 1 }}>
                {menuItems.map((item) => (
                    item.roles.includes(user?.role) && (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                selected={location.pathname === item.path}
                                onClick={() => navigate(item.path)}
                                sx={{
                                    borderRadius: '12px',
                                    py: 1.5,
                                    '&.Mui-selected': {
                                        bgcolor: 'rgba(56, 189, 248, 0.15)', // Subtle highlight
                                        color: '#38bdf8',
                                        borderLeft: '4px solid #38bdf8',
                                        '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.25)' },
                                        '& .MuiListItemIcon-root': { color: '#38bdf8' }
                                    },
                                    '&:hover': {
                                        bgcolor: 'rgba(255,255,255,0.05)'
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ color: '#94a3b8', minWidth: 45 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: 500 }} />
                            </ListItemButton>
                        </ListItem>
                    )
                ))}
            </List>

            <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'rgba(255,255,255,0.05)', p: 1.5, borderRadius: 2 }}>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>{user?.name?.[0]}</Avatar>
                    <Box sx={{ overflow: 'hidden' }}>
                        <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600 }}>{user?.name}</Typography>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>{user?.role}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    bgcolor: 'rgba(255, 255, 255, 0.8)', // Glassmorphism Header
                    backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid #e2e8f0',
                    color: '#1e293b'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ flexGrow: 1 }} />
                    {/* Spacer to push items to right if needed */}

                    <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                        {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    minHeight: '100vh',
                    bgcolor: '#f8fafc'
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
