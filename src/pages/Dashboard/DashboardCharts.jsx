import { Chart } from "react-google-charts";

const DashboardCharts = () => {
  // Fake article counts per publisher (dynamic data example)

  const publicationData = [
    { name: "Publication A", articles: 2 },
    { name: "Publication B", articles: 3 },
    { name: "Publication C", articles: 5 },
  ];

  // Build data array for Google Pie Chart
  const pieData = [
    ["Publication", "Articles"],
    ...publicationData.map((p) => [p.name, p.articles]),
  ];

  const pieOptions = {
    title: "Articles by Publication (%)",
    is3D: true,
    pieSliceText: "percentage",
    legend: { position: "right" },
    chartArea: { width: "80%", height: "75%" },
  };

  // ------------------------
  // Static Bar Chart Data
  // ------------------------
  const barData = [
    ["Month", "Visitors"],
    ["Jan", 800],
    ["Feb", 600],
    ["Mar", 1000],
    ["Apr", 700],
    ["May", 1200],
  ];

  const barOptions = {
    title: "Monthly Visitors (Static Example)",
    hAxis: { title: "Month" },
    vAxis: { title: "Visitors" },
    legend: "none",
    colors: ["#34a853"],
  };

  return (
    <div className="grid md:grid-cols-1 gap-6 p-6">
      {/* Pie Chart */}
      <div className="bg-[#b2d8d8] rounded-xl shadow p-4">
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={pieData}
          options={pieOptions}
        />
      </div>

      {/* Bar Chart */}
      <div className="bg-[#b2d8d8] rounded-xl shadow p-4">
        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={barData}
          options={barOptions}
        />
      </div>
    </div>
  );
};

export default DashboardCharts;
