import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Bookings from "./pages/Bookings";
import Users from "./pages/Users";
import Accounts from "./pages/Accounts";
import Settings from "./pages/Settings";
import Cabins from "./pages/Cabins";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import ProtectedRoute from "./ui/ProtectedRoute";
import Router, { Running, Sports } from "./features/customRoutes/Router";
import Link from "./ui/Link";
import NavigationProvider from "./contexts/NavigationContext";
import Calender from "./ui/Calender";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
    },
  },
});

export default function App() {
  return (
    <NavigationProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="cabins" />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="users" element={<Users />} />
              <Route path="accounts" element={<Calender />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        {/* <div>
          <Link to={"/sports"} activeClass={{ backgroundColor: "#3d5ecc" }}>
            Sports
          </Link>
          <Link to={"/running"} activeClass={{ backgroundColor: "#3d5ecc" }}>
            Running
          </Link>

          <Router path="/sports" element={<Sports />} />
          <Router path="/running" element={<Running />} />
        </div> */}
      </QueryClientProvider>
    </NavigationProvider>
  );
}
