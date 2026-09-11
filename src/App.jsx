// 공부의 숲 — 루트 컴포넌트
// 라우팅은 각 페이지 담당자가 추가합니다 (react-router 등).

import './styles/reset.css';
import './styles/global.css';
import { Layout } from './components/Layout';
import { HabitsPage } from './pages/habits';
import { Routes, Route } from 'react-router';
import { Focus } from './pages/focus';
import ListPage from './pages/list';
import { DetailPage } from './pages/detail';
import CreatePage from './pages/create';

function App() {
  return (
    <main>
      <Layout hasCreateButton>
      </Layout>

      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/studies/:studyId" element={<DetailPage />} />
        <Route path="/habits" element={<HabitsPage />} />
        <Route path="/focus" element={<Focus />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </main>
  );
}

export default App;
