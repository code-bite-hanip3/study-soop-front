// 공용 인증 훅 (뼈대) — 쓰기 API(③④⑤)가 함께 사용합니다.
// 토큰 개념 없음 — 비밀번호를 저장해두면 client.js가 쓰기 요청 Body에 자동 병합합니다.
// (조회 GET은 인증이 아예 없으니 이 훅 없이도 호출 가능합니다.)
import { useCallback, useState } from 'react';
import { http, getPassword, setPassword, clearPassword } from '@/api/client';

export const useStudyAccess = () => {
  const password = getPassword();

  // 비밀번호를 저장해두면 이후 쓰기 요청(POST·PATCH·DELETE)에 자동 첨부됩니다.
  const savePassword = useCallback((newPassword) => {
    setPassword(newPassword);
  }, []);

  // 비밀번호 검증이 필요하면(비밀번호 게이트 화면) 각자 도메인 API로 확인하세요.
  // 예: 습관 생성 API에 password를 보내 401이면 틀린 비밀번호입니다.

  const clear = useCallback(() => {
    clearPassword();
  }, []);

  return { password, setPassword: savePassword, clearPassword: clear };
};

// 하위 호환 별칭 (v5 코드 사용 중인 경우 — v6에서는 savePassword 사용 권장)
export const useStudyPassword = useStudyAccess;
