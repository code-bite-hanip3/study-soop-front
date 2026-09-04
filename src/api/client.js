// 모든 API 호출은 이 client를 통해 하세요 (공용 코어).

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

// 입력한 스터디 비밀번호를 저장해두면, 쓰기 요청(POST·PATCH·DELETE) Body에 자동 병합됩니다.
const PASSWORD_KEY = 'studyPassword';

export const getPassword = () => localStorage.getItem(PASSWORD_KEY);

export const setPassword = (password) => {
  localStorage.setItem(PASSWORD_KEY, password);
};

export const clearPassword = () => {
  localStorage.removeItem(PASSWORD_KEY);
};

// 하위 호환 별칭 ( setPassword 사용 권장)
export const getToken = getPassword;
export const setToken = setPassword;
export const clearToken = clearPassword;

// 쓰기 메서드 판정 — 이 요청들에만 password가 필요합니다 (조회는 인증 없음)
const WRITE_METHODS = new Set(['POST', 'PATCH', 'PUT', 'DELETE']);

async function request(path, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  let payload = body;
  if (WRITE_METHODS.has(method.toUpperCase())) {
    const password = getPassword();
    if (password) {
      //  쓰기 요청이면 저장된 password를 Body에 자동 병합
      payload = { ...(body ?? {}), password };
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: payload ? JSON.stringify(payload) : undefined,
  });

  if (!response.ok) {
    // 실패 응답 형식: { success: false, message } (백엔드 error-handler)
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message ?? '요청에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }

  return response.json();
}

export const http = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  patch: (path, body) => request(path, { method: 'PATCH', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  delete: (path, body) => request(path, { method: 'DELETE', body }),  //DELETE도 password를 위해 body 허용
};
