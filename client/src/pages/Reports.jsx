import MainLayout from "../layouts/MainLayout";

function Reports() {

  const reports = [
    {
      company: "Raj Industries",
      status: "Closed Won",
      revenue: "₹45,000",
    },

    {
      company: "Skyline Manufacturing",
      status: "Negotiation",
      revenue: "₹18,000",
    },

    {
      company: "BuildCraft Ltd",
      status: "Quotation Sent",
      revenue: "₹12,000",
    },

    {
      company: "Vertex Corp",
      status: "Contacted",
      revenue: "₹8,500",
    },
  ];

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-4xl font-bold">
            Reports & Analytics
          </h1>

          <p className="text-gray-500 mt-2">
            Monitor business performance and sales insights.
          </p>

        </div>

      </div>

      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-sm">
            Monthly Revenue
          </h2>

          <p className="text-4xl font-bold mt-3">
            ₹2.4L
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-sm">
            Conversion Rate
          </h2>

          <p className="text-4xl font-bold mt-3">
            68%
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-sm">
            Deals Closed
          </h2>

          <p className="text-4xl font-bold mt-3">
            24
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-sm">
            Pending Deals
          </h2>

          <p className="text-4xl font-bold mt-3">
            11
          </p>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold">
            Sales Performance Report
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-black text-white">

            <tr>

              <th className="p-4 text-left">
                Company
              </th>

              <th className="p-4 text-left">
                Deal Status
              </th>

              <th className="p-4 text-left">
                Revenue
              </th>

            </tr>

          </thead>

          <tbody>

            {reports.map((report, index) => (

              <tr
                key={index}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {report.company}
                </td>

                <td className="p-4">
                  {report.status}
                </td>

                <td className="p-4 font-semibold">
                  {report.revenue}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}

export default Reports;