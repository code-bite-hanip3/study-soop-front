// 공부의 숲 — 루트 컴포넌트
// 라우팅은 각 페이지 담당자가 추가합니다 (react-router-dom 등).

import './App.css';
import './styles/reset.css';
import './styles/global.css';
import { Layout } from './components/Layout';
import { HabitsPage } from './pages/habits';
import { Routes, Route } from 'react-router';
import { Focus } from './pages/focus';
import ListPage from './pages/list';
import { DetailPage } from './pages/detail';
// import { Point } from './components/Point/Point';
// import { Button } from './components/Button/BasicButton';
// import { CircleButton } from './components/Button/CircleButton';
// import { RecordButton } from './components/Button/RecordButton';
// import { NavButton } from './components/Button/NavButton';
// import { useState } from 'react';
// import { Input } from './components/Input';

function App() {
  // const [nickname, setNickname] = useState('');
  // const [password, setPassword] = useState('');
  // const [passwordConfirm, setPasswordConfirm] = useState('');

  return (
    <main>
      {/* <h1>공부의 숲</h1> */}
      {/* TODO(각자): 자기 페이지를 pages/ 에 만들고 여기로 진입 */}
      <Layout hasCreateButton>
        {/* <Point></Point>
          <Point></Point>
          <Point></Point>
          <NavButton size="type01"> 오늘의 습관</NavButton>
          <NavButton size="type02"> 홈</NavButton>

          <Button bgcolor="primary" size="type02">
            오늘의 습관으로 가기
          </Button>
          <Button bgcolor="primary" size="type02">
            오늘의 습관으로 가기
          </Button>
          <Button bgcolor="primary" size="type01">
            만들기
          </Button>
          <Button bgcolor="primary" size="makestudy">
            스터디 만들기
          </Button>

          <Button bgcolor="primary" size="type03">
            수정완료
          </Button>

          <Button bgcolor="gray" size="type03">
            취소
          </Button>

          <RecordButton bgcolor="primary" />

          <RecordButton bgcolor="primary" disabled /> */}
          {/* <div className="test">
            <Input
              label="닉네임"
              placeholder="닉네임을 입력해 주세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <Input
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해 주세요"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              error={
                password !== passwordConfirm && passwordConfirm.length > 0
                  ? '비밀번호가 일치하지 않습니다.'
                  : ''
              }
            />
          </div>
          <CircleButton bgcolor="primary" />
          <CircleButton icon="pause" bgcolor="green" />
          <CircleButton disabled />
          <CircleButton icon="pause" disabled /> */}
      </Layout>

      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/studies/:studyId" element={<DetailPage />} />
        <Route path="/habits" element={<HabitsPage />} />
        <Route path="/focus" element={<Focus />} />
      </Routes>
    </main>
  );
}

export default App;
