// 인증 상태 컨텍스트 (뼈대)
import { createContext, useContext } from 'react';

// null 이면 Provider 바깥에서 사용 중
export const StudyAccessContext = createContext(null);

export const useStudyAccessContext = () => {
  const context = useContext(StudyAccessContext);
  if (context === null) {
    throw new Error('StudyAccessProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
};