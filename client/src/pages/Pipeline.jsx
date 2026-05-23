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
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-8">
        Sales Pipeline
      </h1>

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
                  className="bg-gray-100 p-4 rounded-xl shadow-sm"
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

    </div>
  );
}

export default Pipeline;