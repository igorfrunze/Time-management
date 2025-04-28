import { Route, Routes, Navigate } from 'react-router-dom';
import {
  Analytics,
  Home,
  Login,
  Projects,
  Register,
  Settings,
  ProjectCreate,
} from './pages';
import { Header } from './components';
import './App.css';

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects_create" element={<ProjectCreate />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
