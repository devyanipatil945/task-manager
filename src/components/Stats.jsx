function Stats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;

  return (
    <div className="stats">

      <div className="card total-card">
        <h2>{total}</h2>
        <p>Total Tasks</p>
      </div>

      <div className="card completed-card">
        <h2>{completed}</h2>
        <p>Completed</p>
      </div>

      <div className="card pending-card">
        <h2>{pending}</h2>
        <p>Pending</p>
      </div>

    </div>
  );
}

export default Stats;