// import { Statistic, Progress, Divider, Row, Spin } from "antd";
// import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
// import useLanguage from "@/locale/useLanguage";

// export default function CustomerPreviewCard({
//   isLoading = false,
//   activeCustomer = 0,
//   newCustomer = 0,
// }) {
//   const translate = useLanguage();
//   return (
//     <Row className="gutter-row">
//       <div className="whiteBox shadow" style={{ height: 458 }}>
//         <div
//           className="pad20"
//           style={{
//             textAlign: "center",
//             justifyContent: "center",
//             backgroundColor:"#fff8ef"
//           }}
//         >
//           <h3 style={{ color: "#22075e", marginBottom: 40, marginTop: 15, fontSize: "large" }}>
//             {translate("Customers")}
//           </h3>

//           {isLoading ? (
//             <Spin />
//           ) : (
//             <div
//               style={{
//                 display: "grid",
//                 justifyContent: "center",
//               }}
//             >
//               <Progress type="dashboard" percent={newCustomer} size={148} />
//               <p>{translate("New Customer this Month")}</p>
//               <Divider />
//               <Statistic
//                 title={translate("Active Customer")}
//                 value={activeCustomer}
//                 precision={2}
//                 valueStyle={
//                   activeCustomer > 0
//                     ? { color: "#3f8600" }
//                     : activeCustomer < 0
//                       ? { color: "#cf1322" }
//                       : { color: "#000000" }
//                 }
//                 prefix={
//                   activeCustomer > 0 ? (
//                     <ArrowUpOutlined />
//                   ) : activeCustomer < 0 ? (
//                     <ArrowDownOutlined />
//                   ) : null
//                 }
//                 suffix="%"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </Row>
//   );
// }

import { Statistic, Divider, Row, Spin } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useLanguage from "@/locale/useLanguage";

export default function CustomerPreviewCard({
  isLoading = false,
  activeCustomer = 0,
  newCustomer = 0,
}) {
  const translate = useLanguage();

  const data = [
    { name: 'New Customers', percent: newCustomer },
  ];

  return (
    <Row className="gutter-row">
      <div className="whiteBox shadow" style={{ height: 458 }}>
        <div
          className="pad20"
          style={{
            textAlign: "center",
            justifyContent: "center",
            backgroundColor:"#fff8ef"
          }}
        >
          <h3 style={{ color: "#22075e", marginBottom: 40, marginTop: 15, fontSize: "large" }}>
            {translate("Customers")}
          </h3>

          {isLoading ? (
            <Spin />
          ) : (
            <div
              style={{
                display: "grid",
                justifyContent: "center",
              }}
            >
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="percent" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              <p>{translate("New Customer this Month")}</p>
              <Divider />
              <Statistic
                title={translate("Active Customer")}
                value={activeCustomer}
                precision={2}
                valueStyle={
                  activeCustomer > 0
                    ? { color: "#3f8600" }
                    : activeCustomer < 0
                      ? { color: "#cf1322" }
                      : { color: "#000000" }
                }
                prefix={
                  activeCustomer > 0 ? (
                    <ArrowUpOutlined />
                  ) : activeCustomer < 0 ? (
                    <ArrowDownOutlined />
                  ) : null
                }
                suffix="%"
              />
            </div>
          )}
        </div>
      </div>
    </Row>
  );
}
