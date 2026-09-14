import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import 'dayjs/locale/ko.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ko'); // -> 표준시간을 한국 시간으로 맞추기 위한 라이브러리 day.js

export function getTodayDate() {
  return dayjs().tz('Asia/Seoul').format('YYYY-MM-DD');
}

//실시간 시간 렌더링 때 필요한 양식 지정하기
export function getFormattedDateTime() {
  return dayjs().tz('Asia/Seoul').format('YYYY-MM-DD A h:mm');
}
