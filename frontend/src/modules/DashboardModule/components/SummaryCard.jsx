// import { Tag, Divider, Row, Col, Spin, Tooltip } from 'antd';
// import { useMoney } from '@/settings';
// import { selectMoneyFormat } from '@/redux/settings/selectors';
// import { useSelector } from 'react-redux';
// import '@/modules/DashboardModule/style.css'

// export default function AnalyticSummaryCard({ title, tagColor, data, prefix, isLoading = false }) {
//   const { moneyFormatter } = useMoney();
//   const money_format_settings = useSelector(selectMoneyFormat);
//   return (
//     <Col
//       className="gutter-row"
//       xs={{ span: 24 }}
//       sm={{ span: 12 }}
//       md={{ span: 12 }}
//       lg={{ span: 6 }}
//     >
//       <div
//         className="whiteBox shadow custom"
//         style={{ color: '#595959', fontSize: 13, minHeight: '106px', height: '100%' }}
//       >
//         <div className="pad15 strong" style={{ textAlign: 'center', justifyContent: 'center' }}>
//           <h3
//             style={{
//               color: '#22075e',
//               fontSize: 'large',
//               margin: '5px 0',
//               textTransform: 'capitalize',
//             }}
//           >
//             {title}
//           </h3>
//         </div>
//         <Divider style={{ padding: 0, margin: 0 }}></Divider>
//         <div className="pad15">
//           <Row gutter={[0, 0]} justify="space-between" wrap={false}>
//             <Col className="gutter-row" flex="85px" style={{ textAlign: 'left' }}>
//               <div className="left" style={{ whiteSpace: 'nowrap' }}>
//                 {prefix}
//               </div>
//             </Col>
//             <Divider
//               style={{
//                 height: '100%',
//                 padding: '10px 0',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}
//               type="vertical"
//             ></Divider>
//             <Col
//               className="gutter-row"
//               flex="auto"
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}
//             >
//               {isLoading ? (
//                 <Spin />
//               ) : (
//                 <Tooltip
//                   title={data}
//                   style={{
//                     direction: 'ltr',
//                   }}
//                 >
//                   <Tag
//                     color={tagColor}
//                     style={{
//                       margin: '0 auto',
//                       justifyContent: 'center',
//                       maxWidth: '110px',
//                       overflow: 'hidden',
//                       whiteSpace: 'nowrap',
//                       textOverflow: 'ellipsis',
//                       direction: 'ltr',
//                     }}
//                   >
//                     {data
//                       ? moneyFormatter({
//                           amount: data,
//                           currency_code: money_format_settings?.default_currency_code,
//                         })
//                       : moneyFormatter({
//                           amount: 0,
//                           currency_code: money_format_settings?.default_currency_code,
//                         })}
//                   </Tag>
//                 </Tooltip>
//               )}
//             </Col>
//           </Row>
//         </div>
//       </div>
//     </Col>
//   );
// }

// import { Statistic, Divider, Row, Col, Spin, Tooltip, Typography } from 'antd';
// import { ArrowUpOutlined, ArrowDownOutlined, DollarOutlined } from '@ant-design/icons';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip, ResponsiveContainer } from 'recharts';
// import { useMoney } from '@/settings';
// import { selectMoneyFormat } from '@/redux/settings/selectors';
// import { useSelector } from 'react-redux';
// import '@/modules/DashboardModule/style.css';

// export default function AnalyticSummaryCard({ title, tagColor, data, prefix, isLoading = false }) {
//   const { moneyFormatter } = useMoney();
//   const moneyFormatSettings = useSelector(selectMoneyFormat);

//   const formattedData = moneyFormatter({
//     amount: data || 0,
//     currency_code: moneyFormatSettings?.default_currency_code,
//   });

//   // Example data for the mini bar chart
//   const chartData = [
//     { name: 'Jan', uv: 4000 },
//     { name: 'Feb', uv: 3000 },
//     { name: 'Mar', uv: 2000 },
//     { name: 'Apr', uv: 2780 },
//     { name: 'May', uv: 1890 },
//     { name: 'Jun', uv: 2390 },
//   ];

//   return (
//     <Col xs={24} sm={12} md={12} lg={6}>
//       <div className="whiteBox shadow custom" style={{ color: '#595959', fontSize: 13, minHeight: '200px', height: '100%' }}>
//         <div className="pad15 strong" style={{ textAlign: 'center', justifyContent: 'center' }}>
//           <h3 style={{ color: '#22075e', fontSize: 'large', margin: '5px 0', textTransform: 'capitalize' }}>
//             {title}
//           </h3>
//         </div>
//         <Divider style={{ padding: 0, margin: 0 }} />
//         <div className="pad15">
//           <Row gutter={[0, 0]} justify="space-between" wrap={false}>
//             <Col flex="85px" style={{ textAlign: 'left' }}>
//               <DollarOutlined style={{ fontSize: '24px', color: tagColor }} />
//             </Col>
//             <Divider type="vertical" style={{ height: '100%', padding: '10px 0', justifyContent: 'center', alignItems: 'center' }} />
//             <Col flex="auto" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//               {isLoading ? (
//                 <Spin />
//               ) : (
//                 <Tooltip title={data} style={{ direction: 'ltr' }}>
//                   <Statistic
//                     value={formattedData}
//                     precision={2}
//                     valueStyle={{ color: tagColor }}
//                     prefix={prefix}
//                   />
//                 </Tooltip>
//               )}
//             </Col>
//           </Row>
//           <ResponsiveContainer width="100%" height={60}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" hide />
//               <YAxis hide />
//               <RechartTooltip />
//               <Bar dataKey="uv" fill={tagColor} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </Col>
//   );
// }

// import { Divider, Row, Col, Spin, Tooltip, Progress } from 'antd';
// import { useMoney } from '@/settings';
// import { selectMoneyFormat } from '@/redux/settings/selectors';
// import { useSelector } from 'react-redux';
// import '@/modules/DashboardModule/style.css';

// export default function AnalyticSummaryCard({ title, tagColor, data = 0, prefix, isLoading = false }) {
//   const { moneyFormatter } = useMoney();
//   const money_format_settings = useSelector(selectMoneyFormat);

//   // Format the data
//   const formattedData = moneyFormatter({
//     amount: data,
//     currency_code: money_format_settings?.default_currency_code,
//   });

//   return (
//     <Col
//       className="gutter-row"
//       xs={{ span: 24 }}
//       sm={{ span: 12 }}
//       md={{ span: 12 }}
//       lg={{ span: 6 }}
//     >
//       <div
//         className="whiteBox shadow custom"
//         style={{ color: '#595959', fontSize: 13, minHeight: '200px', height: '100%' }}
//       >
//         <div className="pad15 strong" style={{ textAlign: 'center', justifyContent: 'center' }}>
//           <h3
//             style={{
//               color: '#22075e',
//               fontSize: 'large',
//               margin: '5px 0',
//               textTransform: 'capitalize',
//             }}
//           >
//             {title}
//           </h3>
//         </div>
//         <Divider style={{ padding: 0, margin: 0 }}></Divider>
//         <div className="pad15">
//           <Row gutter={[0, 0]} justify="space-between" wrap={false}>
//             <Col className="gutter-row" flex="85px" style={{ textAlign: 'left' }}>
//               <div className="left" style={{ whiteSpace: 'nowrap' }}>
//                 {prefix}
//               </div>
//             </Col>
//             <Divider
//               style={{
//                 height: '100%',
//                 padding: '10px 0',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}
//               type="vertical"
//             ></Divider>
//             <Col
//               className="gutter-row"
//               flex="auto"
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}
//             >
//               {isLoading ? (
//                 <Spin />
//               ) : (
//                 <Tooltip
//                   title={formattedData}
//                   style={{
//                     direction: 'ltr',
//                   }}
//                 >
//                   <Progress
//                     type="circle"
//                     percent={data}
//                     format={() => formattedData}
//                     strokeColor={tagColor}
//                   />
//                 </Tooltip>
//               )}
//             </Col>
//           </Row>
//         </div>
//       </div>
//     </Col>
//   );
// }

import React from 'react';
import { Divider, Row, Col, Spin, Tooltip } from 'antd';
import LiquidFillGauge from 'react-liquid-gauge';
import { useMoney } from '@/settings';
import { selectMoneyFormat } from '@/redux/settings/selectors';
import { useSelector } from 'react-redux';
import '@/modules/DashboardModule/style.css';

export default function AnalyticSummaryCard({ title, tagColor, data = 0, prefix, isLoading = false }) {
  const { moneyFormatter } = useMoney();
  const money_format_settings = useSelector(selectMoneyFormat);

  const formattedData = moneyFormatter({
    amount: data,
    currency_code: money_format_settings?.default_currency_code,
  });

  const percentage = data / 100;

  return (
    <Col
      className="gutter-row"
      xs={{ span: 24 }}
      sm={{ span: 12 }}
      md={{ span: 12 }}
      lg={{ span: 6 }}
    >
      <div
        className="whiteBox shadow custom"
        style={{ color: '#595959', fontSize: 13, minHeight: '250px', height: '100%' }}
      >
        <div className="pad15 strong" style={{ textAlign: 'center', justifyContent: 'center' }}>
          <h3
            style={{
              color: '#22075e',
              fontSize: 'large',
              margin: '5px 0',
              textTransform: 'capitalize',
            }}
          >
            {title}
          </h3>
        </div>
        <Divider style={{ padding: 0, margin: 0 }}></Divider>
        <div className="pad15">
          <Row gutter={[0, 0]} justify="space-between" wrap={false}>
            <Col className="gutter-row" flex="85px" style={{ textAlign: 'left' }}>
              <div className="left" style={{ whiteSpace: 'nowrap' }}>
                {prefix}
              </div>
            </Col>
            <Divider
              style={{
                height: '100%',
                padding: '10px 0',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              type="vertical"
            ></Divider>
            <Col
              className="gutter-row"
              flex="auto"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              {isLoading ? (
                <Spin />
              ) : (
                <Tooltip
                  title={formattedData}
                  style={{
                    direction: 'ltr',
                  }}
                >
                  <LiquidFillGauge
                    style={{ margin: '0 auto' }}
                    width={130}
                    height={135}
                    value={percentage * 100}
                    textSize={1}
                    textOffsetX={0}
                    textOffsetY={0}
                    textRenderer={(value) => (
                      <tspan>
                        {formattedData}
                      </tspan>
                    )}
                    riseAnimation
                    waveAnimation
                    waveFrequency={2}
                    waveAmplitude={3}
                    gradient
                    circleStyle={{ fill: tagColor }}
                    waveStyle={{ fill: tagColor }}
                    textStyle={{ fill: '#444', fontSize: '1em' }}
                    waveTextStyle={{ fill: '#fff', fontSize: '1em' }}
                  />
                </Tooltip>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </Col>
  );
}


