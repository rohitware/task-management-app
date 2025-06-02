// Dashboard.jsx

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="text-center mt-20">
        <h2 className="text-3xl font-semibold text-gray-800">
          Welcome, {user?.username}!
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          You're now logged in to your dashboard.
        </p>

        <h1 className="text-red-500">Hello Tailwind!</h1>
      </div>
    </div>
  );
}

export default Dashboard;
