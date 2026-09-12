import { useEffect, useRef, useState } from 'react';

import { Frame } from '../../components/Frame';
import SortDropdown from './components/SortDropdown/SortDropdown';
import StudyCard from './components/StudyCard/StudyCard';
import { fetchStudies } from '../../api/studies';
import { useRecentStudies } from '../../hooks/useRecentStudies';
import styles from './Home.module.css';

const PAGE_SIZE = 6;

// SortDropdown(소문자) → BE STUDY_SORT 키(대문자)로 변환
const SORT_KEY = {
  recent: 'RECENT',
  oldest: 'OLDEST',
  pointsDesc: 'POINT_DESC',
  pointsAsc: 'POINT_ASC',
};

function Home() {
  const { recentIds, addRecentStudy } = useRecentStudies();

  const [recentStudies, setRecentStudies] = useState([]);
  const [isRecentLoading, setIsRecentLoading] = useState(false);

  const [exploreStudies, setExploreStudies] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('recent');
  const [isExploreLoading, setIsExploreLoading] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const recentRowRef = useRef(null);
  const [hasRecentOverflow, setHasRecentOverflow] = useState(false);

  // 최근 조회: localStorage 기록 방식 — id 목록으로 목록 API 재조회 (삭제된 스터디는 skip)
  useEffect(() => {
    const loadRecent = async () => {
      if (recentIds.length === 0) {
        setRecentStudies([]);
        setIsRecentLoading(false);
        return;
      }

      try {
        setIsRecentLoading(true);
        const { items } = await fetchStudies({ size: 100 });
        const byId = new Map(items.map((study) => [study.id, study]));
        const recent = recentIds.map((id) => byId.get(id)).filter(Boolean);
        setRecentStudies(recent);
      } catch (error) {
        console.log('최근 조회 스터디를 불러오지 못했습니다.', error.message);
        setRecentStudies([]);
      } finally {
        setIsRecentLoading(false);
      }
    };

    loadRecent();
  }, [recentIds]);

  // 카드가 가려질 때만 힌트 노출 — 폭 상관없이 scrollWidth/clientWidth로 판단
  useEffect(() => {
    const checkOverflow = () => {
      const row = recentRowRef.current;
      setHasRecentOverflow(Boolean(row && row.scrollWidth - row.clientWidth > 1));
    };

    const rafId = requestAnimationFrame(checkOverflow);
    window.addEventListener('resize', checkOverflow);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [recentStudies, isRecentLoading]);

  // 스터디 둘러보기 — 실 API GET /studies
  useEffect(() => {
    const loadExplore = async () => {
      try {
        setIsExploreLoading(true);
        const { items, totalCount: count } = await fetchStudies({
          q: keyword,
          sort: SORT_KEY[sort],
          page: 1,
          size: PAGE_SIZE,
        });
        setExploreStudies(items);
        setTotalCount(count);
        setPage(1);
      } catch (error) {
        console.log('스터디 목록을 불러오지 못했습니다.', error.message);
      } finally {
        setIsExploreLoading(false);
      }
    };

    loadExplore();
  }, [keyword, sort]);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    try {
      setIsMoreLoading(true);
      const { items, totalCount: count } = await fetchStudies({
        q: keyword,
        sort: SORT_KEY[sort],
        page: nextPage,
        size: PAGE_SIZE,
      });
      setExploreStudies((prev) => [...prev, ...items]);
      setTotalCount(count);
      setPage(nextPage);
    } catch (error) {
      console.log('스터디 더보기를 불러오지 못했습니다.', error.message);
    } finally {
      setIsMoreLoading(false);
    }
  };

  const hasMore = exploreStudies.length < totalCount;

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.sectionWrap}>
          <Frame>
            <h2 className={styles.sectionTitle}>최근 조회한 스터디</h2>

            {isRecentLoading ? (
              <p className={styles.stateText}>불러오는 중이에요...</p>
            ) : recentStudies.length === 0 ? (
              <p className={styles.stateText}>아직 조회한 스터디가 없어요</p>
            ) : (
              <div className={`${styles.recentScroll}${hasRecentOverflow ? ` ${styles.overflow}` : ''}`}>
                <div className={styles.recentRow} ref={recentRowRef}>
                  {recentStudies.map((study) => (
                    <div className={styles.recentItem} key={study.id}>
                      <StudyCard study={study} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Frame>
        </div>

        <div className={styles.sectionWrap}>
          <Frame>
            <h2 className={styles.sectionTitle}>스터디 둘러보기</h2>

            <div className={styles.toolbar}>
              <div className={styles.searchBox}>
                <span className={styles.searchIcon} aria-hidden="true">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="검색"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  className={styles.searchInput}
                />
              </div>

              <SortDropdown value={sort} onChange={setSort} />
            </div>

            {isExploreLoading ? (
              <p className={styles.stateText}>불러오는 중이에요...</p>
            ) : exploreStudies.length === 0 ? (
              <p className={styles.stateText}>아직 둘러 볼 스터디가 없어요</p>
            ) : (
              <>
                <div className={styles.grid}>
                  {exploreStudies.map((study) => (
                    <StudyCard study={study} key={study.id} onVisit={addRecentStudy} />
                  ))}
                </div>

                {hasMore && (
                  <div className={styles.moreWrap}>
                    <button
                      type="button"
                      className={styles.moreButton}
                      onClick={handleLoadMore}
                      disabled={isMoreLoading}
                    >
                      {isMoreLoading ? '불러오는 중...' : '더보기'}
                    </button>
                  </div>
                )}
              </>
            )}
          </Frame>
        </div>
      </div>
    </div>
  );
}

export default Home;