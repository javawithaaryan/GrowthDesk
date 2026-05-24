import { useTheme } from "../context/ThemeContext";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

const data = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 58000 },
  { month: "Mar", revenue: 47000 },
  { month: "Apr", revenue: 73000 },
  { month: "May", revenue: 89000 },
  { month: "Jun", revenue: 65000 },
  { month: "Jul", revenue: 94000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-card px-4 py-3 shadow-lg min-w-[120px]" style={{ borderRadius: "10px" }}>
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{label}</p>
        <p className="text-base font-bold mt-1" style={{ color: "var(--text-primary)" }}>
          ₹{(payload[0].value / 1000).toFixed(0)}K
        </p>
      </div>
    );
  }
  return null;
};

function SalesChart() {
  const { isDarkMode } = useTheme();

  const gridColor = isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
  const tickColor = isDarkMode ? "#8b949e" : "#9ca3af";
  const barFill = isDarkMode ? "#818cf8" : "#6366f1";

  return (
    <div className="chart-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Revenue Progression</h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Monthly revenue trend · 2024</p>
        </div>
        <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full">
          <span className="text-xs font-semibold">↑ 18%</span>
          <span className="text-xs text-green-500/70">vs last quarter</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="30%">
          <CartesianGrid vertical={false} stroke={gridColor} strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: tickColor }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: tickColor }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${v / 1000}K`}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)" }} />
          <Bar
            dataKey="revenue"
            fill={barFill}
            radius={[6, 6, 0, 0]}
            maxBarSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;