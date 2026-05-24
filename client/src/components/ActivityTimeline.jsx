import { FiCheckCircle, FiMessageSquare, FiUserPlus, FiFileText } from "react-icons/fi";

function ActivityTimeline() {
  const activities = [
    {
      id: 1,
      type: "status",
      content: "Rahul Sharma moved to",
      target: "Negotiation stage",
      time: "2 hours ago",
      icon: FiCheckCircle,
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400"
    },
    {
      id: 2,
      type: "ai",
      content: "AI Follow-up generated for",
      target: "Skyline Manufacturing",
      time: "4 hours ago",
      icon: FiMessageSquare,
      iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
      iconColor: "text-indigo-600 dark:text-indigo-400"
    },
    {
      id: 3,
      type: "lead",
      content: "New lead added by",
      target: "Sales Team",
      time: "Yesterday",
      icon: FiUserPlus,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      id: 4,
      type: "report",
      content: "Quarterly report",
      target: "updated",
      time: "2 days ago",
      icon: FiFileText,
      iconBg: "bg-orange-100 dark:bg-orange-900/30",
      iconColor: "text-orange-600 dark:text-orange-400"
    }
  ];

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {activities.map((activity, activityIdx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {activityIdx !== activities.length - 1 ? (
                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-slate-700" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-slate-800 ${activity.iconBg}`}>
                    <activity.icon className={`h-4 w-4 ${activity.iconColor}`} aria-hidden="true" />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.content}{' '}
                      <span className="font-medium text-gray-900 dark:text-gray-200">{activity.target}</span>
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={activity.time}>{activity.time}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityTimeline;
