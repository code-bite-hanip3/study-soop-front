export function HabitList() {
  const habits = [
    '미라클모닝',
    '미라클모닝',
    '미라클모닝',
    '미라클모닝',
    '미라클모닝',
    '미라클모닝',
    "미라클모닝",
  ];

  return (
    <>
      <div className="habitListouter">
        <div className="habitListbox">
          <div className="todayHabit">
            <p>오늘의 습관</p>
            <button className="listEdit">목록수정</button>
          </div>
          <div className="habitList">
            {habits.map((habit) => (<li>{habit}</li>))}
          </div>
        </div>
      </div>
    </>
  );
}
