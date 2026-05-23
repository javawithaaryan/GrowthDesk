import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SalesChart() {

  const data = [
    {
      month: "Jan",
      leads: 20,
    },

    {
      month: "Feb",
      leads: 35,
    },

    {
      month: "Mar",
      leads: 28,
    },

    {
      month: "Apr",
      leads: 45,
    },

    {
      month: "May",
      leads: 52,
    },

    {
      month: "Jun",
      leads: 39,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow">

      <h2 className="text-2xl font-bold mb-6">
        Monthly Lead Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart data={data}>

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="leads"
            fill="#000000"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default SalesChart;