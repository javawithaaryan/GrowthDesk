import { useTheme } from "../context/ThemeContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "New Lead", value: 30 },
  { name: "Contacted", value: 25 },
  { name: "Quotation Sent", value: 20 },
  { name: "Negotiation", value: 15 },
  { name: "Closed Won", value: 10 },
];

const COLORS_LIGHT = ["#818cf8", "#a78bfa", "#c4b5fd", "#6366f1", "#4f46e5"];
const COLORS_DARK  = ["#6366f1", "#818cf8", "#a78bfa", "#4f46e5", "#4338ca"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;
    return (
      <div className="chart-card px-4 py-3 shadow-lg" style={{ borderRadius: "10px" }}>
        <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{name}</p>
        <p className="text-base font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>{value}%</p>
      </div>
    );
  }
  return null;
};

const renderLegend = (props) => {
  const { payload } = props;
  return (
    <ul className="flex flex-wrap gap-3 justify-center mt-4">
      {payload.map((entry, index) => (
        <li key={index} className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }}></span>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

function ConversionChart() {
  const { isDarkMode } = useTheme();
  const COLORS = isDarkMode ? COLORS_DARK : COLORS_LIGHT;

  return (
    <div className="chart-card">
      <div className="mb-6">
        <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Lead Conversion Breakdown</h2>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Pipeline stage distribution · current quarter</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ConversionChart;
