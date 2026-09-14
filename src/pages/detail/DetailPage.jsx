// import styles from './DetailPage.module.css';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { fetchStudyDetail } from '@/api/studies';
import { Frame } from '@/components/Frame';
import PageHeader from './PageHeader';
import PageTable from './PageTable';

function DetailPage() {
  const { studyId } = useParams();
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStudyDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchStudyDetail(studyId);
        setStudy(data);
      } catch (error) {
        setError(error.message);
        console.error('스터디 상세 정보를 불러오지 못했습니다.', error.message);
      } finally {
        setLoading(false);
      }
    };
    getStudyDetail();
  }, [studyId]);

  if (loading) {
    return <Frame>스터디 정보를 불러오는 중이에요.</Frame>;
  }

  if (error) {
    return <Frame>스터디 정보를 불러오는데 문제가 발생했어요.</Frame>;
  }

  return (
    <Frame>
      <PageHeader study={study}></PageHeader>
      <PageTable studyId={studyId}></PageTable>
    </Frame>
  );
}

export default DetailPage;
