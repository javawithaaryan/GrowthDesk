import MainLayout from "../layouts/MainLayout";

function Pipeline() {

  const columns = [
    {
      title: "New Lead",
      leads: ["Raj Industries", "TechNova Pvt Ltd"],
    },

    {
      title: "Contacted",
      leads: ["Skyline Manufacturing"],
    },

    {
      title: "Quotation Sent",
      leads: ["Vertex Corp"],
    },

    {
      title: "Negotiation",
      leads: ["BuildCraft Ltd"],
    },

    {
      title: "Closed Won",
      leads: ["FutureSteel"],
    },
  ];

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Sales Pipeline
          </h1>

          <p className="text-gray-500 mt-2">
            Track sales stages and client progress.
          </p>

        </div>

      </div>

      <div className="grid grid-cols-5 gap-6">

        {columns.map((column, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-4"
          >

            <h2 className="text-lg font-bold mb-4">
              {column.title}
            </h2>

            <div className="space-y-4">

              {column.leads.map((lead, i) => (
                <div
                  key={i}
                  className="bg-gray-100 p-4 rounded-xl shadow-sm hover:bg-gray-200 transition"
                >

                  <p className="font-medium">
                    {lead}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Manufacturing Client
                  </p>

                </div>
              ))}

            </div>

          </div>
        ))}

      </div>

    </MainLayout>
  );
}

export default Pipeline;