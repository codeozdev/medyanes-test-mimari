export default function RecentActivities({ activities }) {
  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900">Son Aktiviteler</h3>
        <div className="mt-6">
          <ul className="divide-y divide-gray-200">
            {activities.map((activity) => (
              <li key={activity.id} className="py-4">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">{activity.action}</h3>
                      <p className="text-sm text-gray-500">{activity.timestamp}</p>
                    </div>
                    <p className="text-sm text-gray-500">Kullanıcı: {activity.user}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
