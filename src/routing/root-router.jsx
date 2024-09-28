import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { Registration } from "../pages/registration";
import { Dashboard } from "../pages/dashboard";
import { NotFound } from "../pages/not-found";
import { paths } from "../paths";
export function RootRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={paths.auth.signIn} element={<Login />} />
          <Route path={paths.auth.signUp} element={<Registration />} />
          <Route index element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
