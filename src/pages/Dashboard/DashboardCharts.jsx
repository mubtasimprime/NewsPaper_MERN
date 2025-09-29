import axios from "axios";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const DashboardCharts = () => {
  const [publicationData, setPublicationData] = useState([]);

  const publishers = [
    "Prothom Alo",
    "Kaler Kontho",
    "Bangladesh Protidin",
    "Doinik Ittefaq",
    "Naya Digonto",
    "The Times",
    "The Sun",
    "The Daily Star",
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/public-articles`
        );
        const approvedArticles = res.data.filter(
          (a) => a.status === "approved"
        );

        // Count articles per publisher
        const counts = publishers.map((pub) => ({
          name: pub,
          articles: approvedArticles.filter((a) => a.publisher === pub).length,
        }));

        setPublicationData(counts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchArticles();
  }, []);

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

  const barData = [
    ["Publisher", "Articles"],
    ...publicationData.map((p) => [p.name, p.articles]),
  ];

  const barOptions = {
    title: "Articles by Publisher",
    hAxis: { title: "Publisher" },
    vAxis: { title: "Articles" },
    legend: "none",
    colors: ["#34a853"],
    chartArea: { width: "70%", height: "70%" },
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
