const Lead = require("../models/Lead");

const getDashboardStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();

    const activeDeals = await Lead.countDocuments({
      status: {
        $in: ["Contacted", "Negotiation"],
      },
    });

    const closedDeals = await Lead.countDocuments({
      status: "Closed Won",
    });

    res.json({
      totalLeads,
      activeDeals,
      closedDeals,
      revenue: "₹2.4L",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};