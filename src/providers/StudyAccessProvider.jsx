// 인증 Provider (뼈대) 
// useStudyAccess 를 연결해 인증 상태를 전역으로 공급합니다.
import { useStudyAccess } from '@/hooks/useStudyAccess';
import { StudyAccessContext } from '@/contexts/studyAccessContext';

const StudyAccessProvider = ({ children }) => {
  const studyAccess = useStudyAccess();

  return (
    <StudyAccessContext.Provider value={studyAccess}>
      {children}
    </StudyAccessContext.Provider>
  );
};

export default StudyAccessProvider;