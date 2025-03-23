import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData as data } from "../data/mockData";
import { useEffect, useState } from "react";
import { BASE_URL } from "./constants/baseurl";
import { useGetAllUsersQuery } from "../redux/apiSlice";

// const BarChart = ({ isDashboard = false }) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [sales, setSales] = useState([]);
//   const { data: users = [], isLoading: loadingUsers, error: errorUsers } = useGetAllUsersQuery();
//   // تحديث الحالة عند تغيير البيانات
//   useEffect(() => {
//     if (users.length > 0) {
//       const filteredUsers = users.filter(user => user.role === "sales");
//       setSales(filteredUsers);
//     }
//   }, [users]); // يتم تشغيله عند تغيير users
//   return (
//     <div style={{ width: "100%", height: "400px" }}> {/* الحاوية */}
//       <ResponsiveBar
//         data={data}
//         theme={{
//           axis: {
//             domain: {
//               line: {
//                 stroke: colors.grey[100],
//               },
//             },
//             legend: {
//               text: {
//                 fill: colors.grey[100],
//               },
//             },
//             ticks: {
//               line: {
//                 stroke: colors.grey[100],
//                 strokeWidth: 1,
//               },
//               text: {
//                 fill: colors.grey[100],
//               },
//             },
//           },
//           legends: {
//             text: {
//               fill: colors.grey[100],
//             },
//           },
//         }}
//         keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
//         indexBy="country"
//         margin={{ top: 50, right: 100, bottom: 50, left: 40 }}
//         padding={0.3}
//         valueScale={{ type: "linear" }}
//         indexScale={{ type: "band", round: true }}
//         colors={{ scheme: "nivo" }}
//         defs={[
//           {
//             id: "dots",
//             type: "patternDots",
//             background: "inherit",
//             color: "#38bcb2",
//             size: 4,
//             padding: 1,
//             stagger: true,
//           },
//           {
//             id: "lines",
//             type: "patternLines",
//             background: "inherit",
//             color: "#eed312",
//             rotation: -45,
//             lineWidth: 6,
//             spacing: 10,
//           },
//         ]}
//         borderColor={{
//           from: "color",
//           modifiers: [["darker", "1.6"]],
//         }}
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: isDashboard ? undefined : "country",
//           legendPosition: "middle",
//           legendOffset: 32,
//         }}
//         axisLeft={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: isDashboard ? undefined : "food",
//           legendPosition: "middle",
//           legendOffset: -40,
//         }}
//         enableLabel={false}
//         labelSkipWidth={12}
//         labelSkipHeight={12}
//         labelTextColor={{
//           from: "color",
//           modifiers: [["darker", 1.6]],
//         }}
//         legends={[
//           {
//             dataFrom: "keys",
//             anchor: "bottom-right",
//             direction: "column",
//             justify: false,
//             translateX: 120,
//             translateY: 0,
//             itemsSpacing: 2,
//             itemWidth: 100,
//             itemHeight: 20,
//             itemDirection: "left-to-right",
//             itemOpacity: 0.85,
//             symbolSize: 20,
//             effects: [
//               {
//                 on: "hover",
//                 style: {
//                   itemOpacity: 1,
//                 },
//               },
//             ],
//           },
//         ]}
//         role="application"
//         barAriaLabel={function (e) {
//           return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
//         }}
//       />
//     </div>
//   );
// };

// export default BarChart;


const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [chartData, setChartData] = useState([]);
  const { data: users = [], isLoading: loadingUsers, error: errorUsers } = useGetAllUsersQuery();
  const [tickRotation, setTickRotation] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setTickRotation(window.innerWidth < 768 ? -30 : 0);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // استدعاء الوظيفة عند تحميل الصفحة لأول مرة

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (users.length > 0) {
      const salesUsers = users.filter(user => user.role === "sales");

      // استخراج جميع أنواع الحالات الممكنة
      const allStatuses = new Set();
      salesUsers.forEach(salesPerson => {
        const clients = salesPerson.assignedClients || [];
        clients.forEach(client => {
          allStatuses.add(client.status || "Unknown");
        });
      });

      // تحويل Set إلى Array لاستخدامه كمفاتيح رئيسية
      const statusKeys = Array.from(allStatuses);

      // تجهيز البيانات بشكل متكامل
      const salesData = salesUsers.map(salesPerson => {
        const clients = salesPerson.assignedClients || [];

        // حساب عدد العملاء لكل حالة
        const statusCounts = clients.reduce((acc, client) => {
          const status = client.status || "Unknown";
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});

        // إضافة أي حالة مفقودة بـ 0
        statusKeys.forEach(status => {
          if (!(status in statusCounts)) {
            statusCounts[status] = 0;
          }
        });

        return {
          salesName: salesPerson.name, // اسم السيلز للمحور X
          ...statusCounts,
        };
      });

      setChartData(salesData);
    }
  }, [users]);

  return (
    <div style={{ width: "100%", height: "400px", overflowX: 'auto', overflowY: 'clip' }}>
      <div style={{ minWidth: '600px', height: "100%" }}>
      <ResponsiveBar
        data={chartData}
        keys={chartData.length > 0 ? Object.keys(chartData[0]).filter(key => key !== "salesName") : []}
        indexBy="salesName"
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
          tooltip: {
            container: {
              background: theme.palette.mode === "dark" ? colors.grey[800] : "#fff", // تغيير لون الخلفية
              color: theme.palette.mode === "dark" ? "#fff" : "#000", // تغيير لون النص
              borderRadius: "8px", // تحسين المظهر بإضافة زوايا دائرية
              padding: "10px", // إضافة مسافة داخل التولتيب
            },
          },
        }}
          margin={{
            top: 50,
            right: 100,
            bottom: window.innerWidth < 768 ? 80 : 50, // زيادة المسافة أسفل المحور السفلي
            left: 40,
          }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", "1.6"]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: tickRotation,
          // tickRotation: window.innerWidth < 768 ? -60 : 0, // تدوير النص على الشاشات الصغيرة
          legend: "Sales Person",
          legendPosition: "middle",
          legendOffset: window.innerWidth < 768 ? 50 : 40, // تعديل موضع التسمية
        }}
      axisLeft={{
         tickSize: 5,
         tickPadding: 5,
         tickRotation: 0,
          legend: "Leads",
          legendPosition: "middle",
          legendOffset: -35,
        format: value => Math.floor(value), // عرض الأرقام كأعداد صحيحة
       }}

        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
      </div>  {/* ضمان وجود عرض كافٍ */}
    </div>

  );
};

export default BarChart;
