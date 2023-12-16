import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Bookings from "./pages/Bookings";
import Users from "./pages/Users";
import Accounts from "./pages/Accounts";
import Settings from "./pages/Settings";
import Cabins from "./pages/Cabins";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
    },
  },
});

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate to="cabins" />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="users" element={<Users />} />
              <Route path="accounts" element={<Accounts />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}
