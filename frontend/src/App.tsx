import { Navigate, Route, Routes } from 'react-router-dom';
import { CustomPromptPage } from './pages/CustomPromptPage';
import { HomePage } from './pages/HomePage';
import { SurveyPage } from './pages/SurveyPage';
import { TemplatesPage } from './pages/TemplatesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/templates" element={<TemplatesPage />} />
      <Route path="/custom-prompt" element={<CustomPromptPage />} />
      <Route path="/survey" element={<SurveyPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
