function ProgressBar({ tasks }) {

  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  return (
    <div className="progress-container">

      <div className="progress-info">
        <span>Task Progress</span>
        <span>{percentage}%</span>
      </div>

      <div className="progress-bar">

        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
          }}
        ></div>

      </div>

    </div>
  );
}

export default ProgressBar;