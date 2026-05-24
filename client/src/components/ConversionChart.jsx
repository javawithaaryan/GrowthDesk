import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

function ConversionChart() {
  const data = [
    { name: "New Lead", value: 30 },
    { name: "Contacted", value: 25 },
    { name: "Quotation Sent", value: 20 },
    { name: "Negotiation", value: 15 },
    { name: "Closed Won", value: 10 },
  ];

  const COLORS = ["#3b82f6", "#a855f7", "#eab308", "#f97316", "#22c55e"];

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-6">Lead Conversion Status</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ConversionChart;
