// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom'; // FIX 1: Harus dari react-router-dom
import Loadable from '../layouts/full/shared/loadable/Loadable';
import ProtectedRoute from '../components/guards/ProtectedRoute';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

// authentication
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login')));
const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register')));
const Maintainance = Loadable(lazy(() => import('../views/authentication/Maintainance')));

// Dashboards
const Modern = Loadable(lazy(() => import('../views/dashboards/Modern')));

// Master Data
const DataRumah = Loadable(lazy(() => import('../views/pages/master/DataRumah')));
const DataPenghuni = Loadable(lazy(() => import('../views/pages/master/DataPenghuni')));

// Transaction
const PenerimaanIuran = Loadable(lazy(() => import('../views/pages/administrasi/PenerimaanIuran')));
const PengeluaranRt = Loadable(lazy(() => import('../views/pages/administrasi/PengeluaranRT')));
const LaporanKeuangan = Loadable(lazy(() => import('../views/pages/administrasi/LaporanKeungan')));

//pages
const UserProfile = Loadable(lazy(() => import('../views/pages/user-profile/UserProfile')));

/* ****Apps***** */
const Error = Loadable(lazy(() => import('../views/authentication/Error')));

const Router = [
  {
    // FIX 2: Wrapper untuk rute yang dilindungi
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <FullLayout />,
        children: [
          // FIX 3: Jika sudah login dan buka root '/', lempar ke dashboard
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: <Modern /> },
          { path: 'master/rumah', element: <DataRumah /> },
          { path: 'master/penghuni', element: <DataPenghuni /> },
          { path: 'administrasi/iuran', element: <PenerimaanIuran /> },
          { path: 'administrasi/pengeluaran', element: <PengeluaranRt /> },
          { path: 'administrasi/laporan', element: <LaporanKeuangan /> },
          { path: 'user-profile', element: <UserProfile /> },
        ],
      },
    ],
  },
  {
    // FIX 4: Wrapper untuk rute publik (Blank Layout)
    element: <BlankLayout />,
    children: [
      { path: '/auth/auth2/login', element: <Login2 /> },
      { path: '/auth/auth2/register', element: <Register2 /> },
      { path: '/auth/maintenance', element: <Maintainance /> },
      { path: '/auth/404', element: <Error /> },
    ],
  },
  // FIX 5: Fallback Global untuk rute yang tidak ditemukan
  { 
    path: '*', 
    element: <Navigate to="/auth/404" replace /> 
  },
];

const router = createBrowserRouter(Router);

export default router;