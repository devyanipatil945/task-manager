function Header() {
  const today = new Date();

  const date = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = today.toLocaleTimeString();

  return (
    <div className="header">

      <h1>📋 Task Manager</h1>

      <p>{date}</p>

      <p>{time}</p>

    </div>
  );
}

export default Header;