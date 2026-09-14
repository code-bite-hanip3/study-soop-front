import { useEffect, useState } from 'react';
import { getFormattedDateTime } from '../utils/koreaServerTime';

export const useRealTime = () => {
  const [now, setNow] = useState(getFormattedDateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(getFormattedDateTime()); //setNow 안에 시간을 가져오는 함수가 들어간다.
    }, 1000);

    return () => clearInterval(timer); //
  }, []);

  return now;
};

//setInterval(콜백함수, 시간) : 지정한 '시간'이 지날때마다 콜백함수가 반복된다.
//setNow는 파라미터로 받는 값이 바뀌는 걸 감지하여 렌더링 한다.
//clearInterval() 안에 setInterval이 정의되니 변수를 넣어준다.
//useEffect의 리턴에 clearInterval() 넣어줘서 리렌더가 끝나면 setInterval함수를 종료하게 한다.
