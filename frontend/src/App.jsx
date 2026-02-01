import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import DataEntry from './pages/DataEntry';
import Records from './pages/Records';
import Masters from './pages/Masters';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Login Route Removed */}

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="records" element={<Records />} />

          <Route element={<ProtectedRoute allowedRoles={['Admin', 'Operator']} />}>
            <Route path="entry" element={<DataEntry />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route path="masters" element={<Masters />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
