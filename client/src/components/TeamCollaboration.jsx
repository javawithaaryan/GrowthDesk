const team = [
  { name: "Priya Kapoor", role: "Sales Manager", initials: "PK", color: "bg-violet-500", status: "online", leads: 12 },
  { name: "Arjun Mehta", role: "Sr. Sales Executive", initials: "AM", color: "bg-sky-500", status: "online", leads: 8 },
  { name: "Sneha Rao", role: "Sales Executive", initials: "SR", color: "bg-rose-500", status: "away", leads: 5 },
];

const statusConfig = {
  online: { dot: "bg-green-500", label: "Online" },
  away: { dot: "bg-yellow-400", label: "Away" },
  offline: { dot: "bg-gray-400", label: "Offline" },
};

function TeamCollaboration() {
  return (
    <div className="space-y-1">
      {team.map((member, i) => {
        const status = statusConfig[member.status];
        return (
          <div
            key={i}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
            style={{ transition: "background-color 150ms ease" }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.03)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            <div className="relative flex-shrink-0">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold ${member.color}`}>
                {member.initials}
              </div>
              <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 ${status.dot}`}
                    style={{ borderColor: "var(--surface-card)" }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>{member.name}</p>
              <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{member.role}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{member.leads}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>leads</p>
            </div>
          </div>
        );
      })}

      <div className="pt-3 mt-1 border-t" style={{ borderColor: "var(--border)" }}>
        <button
          className="w-full text-center text-xs font-semibold py-2 rounded-lg transition-colors"
          style={{ color: "var(--accent)" }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(99,102,241,0.06)"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
        >
          Assign lead to team member →
        </button>
      </div>
    </div>
  );
}

export default TeamCollaboration;
