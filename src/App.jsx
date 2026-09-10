// 공부의 숲 — 루트 컴포넌트
// 라우팅은 각 페이지 담당자가 추가합니다 (react-router-dom 등).

import './App.css';
import './styles/reset.css';
import './styles/global.css';
import { Routes, Route } from 'react-router-dom';
import { Focus } from './pages/focus';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/focus" element={<Focus />} />
        {/* <Route path="/study/:studyId/focus" element={<Focus />} /> */}
      </Routes>
    </main>
  );
}

export default App;
