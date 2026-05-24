function TeamCollaboration() {
  const team = [
    { name: "John Doe", role: "Sales Exec", initials: "JD", color: "bg-indigo-500" },
    { name: "Sarah Smith", role: "Manager", initials: "SS", color: "bg-emerald-500" },
    { name: "Mike Johnson", role: "Sales Rep", initials: "MJ", color: "bg-rose-500" },
  ];

  return (
    <div className="space-y-4">
      {team.map((member, i) => (
        <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold ${member.color}`}>
              {member.initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{member.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Online</span>
          </div>
        </div>
      ))}
      <button className="w-full mt-2 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
        Assign Lead
      </button>
    </div>
  );
}

export default TeamCollaboration;
