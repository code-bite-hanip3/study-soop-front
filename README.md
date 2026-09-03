

> 프론트 라우팅은 보일러플레이트에 포함하지 않습니다. 각 페이지 담당자가 필요 시 `react-router-dom`을 추가하세요.


## 폴더 구조
```
src/
  main.jsx / App.jsx        부트스트랩
  api/client.js             공용 fetch 헬퍼 (쓰기 요청 Body에 password 자동 병합 — bcrypt, v6)
  api/                      (도메인) studies.js · habits.js ... 각자 추가
  hooks/                    useStudyAccess(인증) · usePagination(강사 그대로)
  contexts/ providers/      인증 상태 컨텍스트 골격
  components/               공용 컴포넌트 (index.js + .module.css + classix)
  pages/                    list(①) create(②) detail(③) habits(④) focus(⑤) — 각자
  types/                    공용 타입 (Study, Habit, ...)
  styles/reset.css          강사 그대로
```

## 실행 방법
```bash
npm i
npm run dev    # http://localhost:5173
```
> `/api` 요청은 Vite 프록시로 `http://localhost:30000`(백엔드)에 전달됩니다.

## 협업 규칙 (보일러플레이트)
- **공용 코어**(이 폴더): main/App · api/client · hooks(useStudyAccess) · contexts/providers · components · types.
- **각 페이지 담당**: `pages/<자기페이지>/` + `api/<자기도메인>.js`.
- 라우팅(react-router 등)은 각자 페이지에서 필요 시 추가하세요.