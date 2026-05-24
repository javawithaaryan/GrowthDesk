import { FiCheckCircle, FiMessageSquare, FiUserPlus, FiFileText, FiTrendingUp } from "react-icons/fi";

const activities = [
  {
    id: 1,
    icon: FiTrendingUp,
    iconBg: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600 dark:text-green-400",
    text: "Rahul Sharma moved to",
    highlight: "Negotiation stage",
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: FiMessageSquare,
    iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    text: "AI follow-up drafted for",
    highlight: "Skyline Manufacturing",
    time: "4 hours ago",
  },
  {
    id: 3,
    icon: FiUserPlus,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    text: "New lead added —",
    highlight: "BuildCraft Ltd",
    time: "Yesterday, 3:40 PM",
  },
  {
    id: 4,
    icon: FiCheckCircle,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    text: "Deal closed with",
    highlight: "Vertex Corp · ₹45,000",
    time: "Yesterday, 11:00 AM",
  },
  {
    id: 5,
    icon: FiFileText,
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-600 dark:text-orange-400",
    text: "Quarterly report",
    highlight: "updated by Sales Team",
    time: "2 days ago",
  },
];

function ActivityTimeline() {
  return (
    <div className="flow-root">
      <ul className="-mb-4">
        {activities.map((activity, idx) => (
          <li key={activity.id}>
            <div className="relative pb-6">
              {idx !== activities.length - 1 && (
                <span
                  className="absolute left-3.5 top-7 h-full w-px"
                  style={{ backgroundColor: "var(--border)" }}
                />
              )}
              <div className="relative flex items-start gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${activity.iconBg}`}>
                  <activity.icon size={13} className={activity.iconColor} />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {activity.text}{" "}
                    <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                      {activity.highlight}
                    </span>
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
                    {activity.time}
                  </p>
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
