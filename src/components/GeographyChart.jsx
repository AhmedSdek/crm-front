import { useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoFeatures } from "../data/mockGeoFeatures";
import { tokens } from "../theme";
const GeographyChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = [
    { name: "Al Qahirah", value: 120 }, // عدد العملاء لكل محافظة
    { id: "Alexandria", value: 80 },
    { id: "Giza", value: 95 },
    { id: "Aswan", value: 40 }, 
    { id: "Suez", value: 55 },
  ];
  return ( 
    <ResponsiveChoropleth
      data={data}
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
      }}
      features={geoFeatures.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      domain={[0, 1000000]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionScale={2500} // تكبير الخريطة
      // projectionTranslation={[0.9, 1.4]} // توسيط الخريطة
      // projectionScale={150}
      projectionTranslation={[-0.6, 3]}
      projectionRotation={[0, 0, 0]}
      borderWidth={1.5}
      borderColor="#ffffff"
      legends={
        [
              {
                anchor: "bottom-left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: colors.grey[100],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#ffffff",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
        ]
      }
    />
  );
};

export default GeographyChart;

// const EgyptMap = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const data = [
//     { name: "Al Qahirah", value: 120 }, // عدد العملاء لكل محافظة
//     // { id: "Alexandria", value: 80 },
//     // { id: "Giza", value: 95 },
//     // { id: "Aswan", value: 40 },
//     // { id: "Suez", value: 55 },
//   ];

//   return (
//     <ResponsiveChoropleth
//       data={data}
//       theme={{
//         axis: {
//           domain: { line: { stroke: colors.grey[100] } },
//           legend: { text: { fill: colors.grey[100] } },
//           ticks: { line: { stroke: colors.grey[100], strokeWidth: 1 }, text: { fill: colors.grey[100] } },
//         },
//         legends: { text: { fill: colors.grey[100] } },
//       }}
//       features={egyptGeoJSON.features} // ملف خريطة مصر
//       margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
//       colors="YlOrRd" // تدرجات لونية
//       domain={[0, Math.max(...data.map((d) => d.value), 1)]}
//       unknownColor="#666666"
//       label="properties.name" // تسمية المحافظات
//       valueFormat=".2s"
//       projectionScale={1000} // تكبير الخريطة لتناسب العرض
//       projectionTranslation={[0.5, 0.7]} // توسيط الخريطة
//       borderWidth={1.2}
//       borderColor="#ffffff"
//       legends={[
//         {
//           anchor: "bottom-left",
//           direction: "column",
//           translateX: 20,
//           translateY: -40,
//           itemWidth: 94,
//           itemHeight: 18,
//           itemDirection: "left-to-right",
//           itemTextColor: colors.grey[100],
//           symbolSize: 18,
//           symbolShape: "circle",
//           effects: [{ on: "hover", style: { itemTextColor: "#ffffff", itemOpacity: 1 } }],
//         },
//       ]}
//     />
//   );
// };

// export default EgyptMap;
