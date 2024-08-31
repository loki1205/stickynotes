import NotesPage from "./pages/NotesPage";
import NoteProvider from "./context/NotesContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from "./components/PrivateRoutes";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div id="app">

      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
                <Route path="/" element={<NoteProvider><NotesPage /></NoteProvider>} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div >
  );
}

export default App;