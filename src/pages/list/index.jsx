import { useEffect, useState } from 'react';

import { Frame } from '../../components/Frame';
import SortDropdown from './components/SortDropdown/SortDropdown';
import StudyCard from './components/StudyCard/StudyCard';
import { fetchRecentStudies, fetchExploreStudies } from './mocks/mockData';
import styles from './Home.module.css';



const PAGE_SIZE = 6;

function Home() {
  
  const [recentStudies, setRecentStudies] = useState([]);
  const [isRecentLoading, setIsRecentLoading] = useState(true);

 
  const [exploreStudies, setExploreStudies] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('recent');
  const [isExploreLoading, setIsExploreLoading] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  
  useEffect(() => {
    const loadRecent = async () => {
      try {
        setIsRecentLoading(true);
        const studies = await fetchRecentStudies();
        setRecentStudies(studies);
      } catch (error) {
        console.log('최근 조회 스터디를 불러오지 못했습니다.', error.message);
      } finally {
        setIsRecentLoading(false);
      }
    };

    loadRecent();
  }, []);

 
  // TODO: 이 부분은 기존에 만들어둔 페이지네이션 훅/컴포넌트로 교체 예정.
  useEffect(() => {
    const loadExplore = async () => {
      try {
        setIsExploreLoading(true);
        const { studies, totalCount: count } = await fetchExploreStudies({
          keyword,
          sort,
          page: 1,
          pageSize: PAGE_SIZE,
        });
        setExploreStudies(studies);
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

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setIsMoreLoading(true);
    fetchExploreStudies({ keyword, sort, page: nextPage, pageSize: PAGE_SIZE }).then(
      ({ studies, totalCount: count }) => {
        setExploreStudies((prev) => [...prev, ...studies]);
        setTotalCount(count);
        setPage(nextPage);
        setIsMoreLoading(false);
      }
    );
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
              <div className={styles.recentRow}>
                {recentStudies.map((study) => (
                  <div className={styles.recentItem} key={study.id}>
                    <StudyCard study={study} />
                  </div>
                ))}
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
                    <StudyCard study={study} key={study.id} />
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
