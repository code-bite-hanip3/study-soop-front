import { useEffect } from 'react';
import styles from './Modal.module.css';


//**사용법
// 사용하는 곳에서 <Modal> 넣어야 되는 내용들 </Modal> 이렇게 작성하면 됩니다. {children} props로 들어감
// onClose는 모달창을 닫기 위함. 모달창 뒷 배경 클릭시 닫힘 기능(기본)
// 나가기, 취소, 등의 버튼에도 onClose props를 추가하면 닫침 기능 추가됨
// onClose 를 사용하기 위해 각자 작업 페이지에 자기만의 state를 만들어야됨
// 예시)
// 각자 페이지 : const [isModalOpen, setIsModalOpen] = useState(false); 가 있어야됨 변수 이름은 자유
// 모달이 열리는 페이지 : onClose={() => setIsModalOpen(false)} 이게 props로 들어가야됨 
export function Modal({children, onClose}){
    useEffect(() => {
    // 모달이 열리는 순간(컴포넌트가 마운트되는 순간) 실행
    document.body.style.overflow = 'hidden';

    // 모달이 닫히는 순간(컴포넌트가 언마운트되는 순간) 실행되는 clean-up 함수
    return () => {
      document.body.style.overflow = '';
    };
  }, []); // 빈 배열 -> 마운트/언마운트 시에만 실행
  
  return(
    <>
      <div className={styles.wrapModal} onClick={onClose}>
        <div className={styles.mainModal} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </>
  );
}