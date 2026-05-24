import MainLayout from "../layouts/MainLayout";
import SalesChart from "../components/SalesChart";
import ConversionChart from "../components/ConversionChart";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

  const handleExportPDF = () => {
    const input = document.getElementById('report-content');
    if (!input) return;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("performance_insights.pdf");
    });
  };

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-4xl font-bold dark:text-white">
            Performance Insights
          </h1>

          <p className="text-gray-500 mt-2 dark:text-gray-400">
            Monitor business performance and actionable sales insights.
          </p>

        </div>

        <button 
          onClick={handleExportPDF}
          className="bg-indigo-600 border border-indigo-700 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center gap-2 shadow-sm"
        >
          Export Report (PDF)
        </button>

      </div>

      <div id="report-content" className="space-y-10">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">

          <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Monthly Revenue
          </h2>

          <p className="text-4xl font-bold mt-3 text-gray-900 dark:text-white">
            ₹2.4L
          </p>

        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">

          <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Conversion Rate
          </h2>

          <p className="text-4xl font-bold mt-3 text-gray-900 dark:text-white">
            68%
          </p>

        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">

          <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Deals Closed
          </h2>

          <p className="text-4xl font-bold mt-3 text-gray-900 dark:text-white">
            24
          </p>

        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">

          <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Pending Deals
          </h2>

          <p className="text-4xl font-bold mt-3 text-gray-900 dark:text-white">
            11
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <ConversionChart />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">

        <div className="p-6 border-b border-gray-200 dark:border-slate-700">

          <h2 className="text-xl font-bold dark:text-white">
            Recent Deal Performance
          </h2>

        </div>

        <table className="w-full text-sm">

          <thead className="bg-gray-50 dark:bg-slate-900 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-slate-700">

            <tr>

              <th className="p-4 text-left font-medium">
                Company
              </th>

              <th className="p-4 text-left font-medium">
                Deal Status
              </th>

              <th className="p-4 text-left font-medium">
                Revenue
              </th>

            </tr>

          </thead>

          <tbody>

            {reports.map((report, index) => (

              <tr
                key={index}
                className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
              >

                <td className="p-4 font-semibold text-gray-900 dark:text-white">
                  {report.company}
                </td>

                <td className="p-4 text-gray-500 dark:text-gray-400">
                  {report.status}
                </td>

                <td className="p-4 font-bold text-gray-900 dark:text-white">
                  {report.revenue}
                </td>

              </tr>

            ))}

          </tbody>
        </table>
      </div>

      </div>

    </MainLayout>
  );
}

export default Reports;