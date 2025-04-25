export default function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-500 truncate">{stat.name}</p>
            <div
              className={`inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium ${
                stat.changeType === "positive"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
              {stat.change}
            </div>
          </div>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
