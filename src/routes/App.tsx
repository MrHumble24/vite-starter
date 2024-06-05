import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AdminLayout />} />
        <Route path='/admin/rooms' element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
