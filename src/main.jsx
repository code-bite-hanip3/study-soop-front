import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/styles/reset.css';

// import App from './App.jsx';
import { DetailPage } from './pages/detail/DetailPage.jsx';
{
  /* DetailPage 페이지 렌더링을 위한 임시 추가 */
}
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* DetailPage 페이지 렌더링을 위한 임시 주석처리 */}
    {/* <App /> */}
    <BrowserRouter>
      <DetailPage />
    </BrowserRouter>
  </StrictMode>,
);
