// import { useMemo } from 'react';
// import { Col, Progress, Spin } from 'antd';
// import useLanguage from '@/locale/useLanguage';

// const colours = {
//   draft: '#595959',
//   sent: '#1890ff',
//   pending: '#1890ff',
//   unpaid: 'brown',
//   overdue: '#ff4d4f',
//   partially: '#13c2c2',
//   paid: '#95de64',
//   declined: '#ff4d4f',
//   accepted: '#95de64',
//   cyan: '#13c2c2',
//   purple: '#722ed1',
//   expired: '#614700',
// };

// const defaultStatistics = [
//   {
//     tag: 'draft',
//     value: 0,
//   },
//   {
//     tag: 'pending',
//     value: 0,
//   },
//   {
//     tag: 'sent',
//     value: 0,
//   },
//   {
//     tag: 'accepted',
//     value: 0,
//   },
//   {
//     tag: 'declined',
//     value: 0,
//   },
//   {
//     tag: 'expired',
//     value: 0,
//   },
// ];

// const defaultInvoiceStatistics = [
//   {
//     tag: 'draft',
//     value: 0,
//   },
//   {
//     tag: 'pending',
//     value: 0,
//   },
//   {
//     tag: 'overdue',
//     value: 0,
//   },
//   {
//     tag: 'paid',
//     value: 0,
//   },
//   {
//     tag: 'unpaid',
//     value: 0,
//   },
//   {
//     tag: 'partially',
//     value: 0,
//   },
// ];

// const PreviewState = ({ tag, color, value }) => {
//   const translate = useLanguage();
//   return (
//     <div style={{ color: '#595959', marginBottom: 5 }}>
//       <div className="left alignLeft capitalize">{translate(tag)}</div>
//       <div className="right alignRight">{value} %</div>
//       <Progress
//         percent={value}
//         showInfo={false}
//         strokeColor={{
//           '0%': color,
//           '100%': color,
//         }}
//       />
//     </div>
//   );
// };

// export default function PreviewCard({
//   title = 'Preview',
//   statistics = defaultStatistics,
//   isLoading = false,
//   entity = 'invoice',
// }) {
//   const statisticsMap = useMemo(() => {
//     if (entity === 'invoice') {
//       return defaultInvoiceStatistics.map((defaultStat) => {
//         const matchedStat = Array.isArray(statistics)
//           ? statistics.find((stat) => stat.tag === defaultStat.tag)
//           : null;
//         return matchedStat || defaultStat;
//       });
//     } else {
//       return defaultStatistics.map((defaultStat) => {
//         const matchedStat = Array.isArray(statistics)
//           ? statistics.find((stat) => stat.tag === defaultStat.tag)
//           : null;
//         return matchedStat || defaultStat;
//       });
//     }
//   }, [statistics, entity]);

//   const customSort = (a, b) => {
//     const colorOrder = Object.values(colours);
//     const indexA = colorOrder.indexOf(a.props.color);
//     const indexB = colorOrder.indexOf(b.props.color);
//     return indexA - indexB;
//   };
//   return (
//     <Col
//       className="gutter-row"
//       xs={{ span: 24 }}
//       sm={{ span: 24 }}
//       md={{ span: 8 }}
//       lg={{ span: 8 }}
//     >
//       <div className="pad20">
//         <h3
//           style={{
//             color: '#22075e',
//             fontSize: 'large',
//             marginBottom: 40,
//             marginTop: 0,
//           }}
//         >
//           {title}
//         </h3>
//         {isLoading ? (
//           <div style={{ textAlign: 'center' }}>
//             <Spin />
//           </div>
//         ) : (
//           statisticsMap
//             ?.map((status, index) => (
//               <PreviewState
//                 key={index}
//                 tag={status.tag}
//                 color={colours[status.tag]}
//                 value={status?.value}
//               />
//               // sort by colours
//             ))
//             .sort(customSort)
//         )}
//       </div>
//     </Col>
//   );
// }

// import React, { useMemo } from 'react';
// import { Col, Progress, Spin } from 'antd';
// import useLanguage from '@/locale/useLanguage';

// const colours = {
//   draft: '#595959',
//   sent: '#1890ff',
//   pending: '#1890ff',
//   unpaid: 'brown',
//   overdue: '#ff4d4f',
//   partially: '#13c2c2',
//   paid: '#95de64',
//   declined: '#ff4d4f',
//   accepted: '#95de64',
//   cyan: '#13c2c2',
//   purple: '#722ed1',
//   expired: '#614700',
// };

// const defaultStatistics = [
//   { tag: 'draft', value: 0 },
//   { tag: 'pending', value: 0 },
//   { tag: 'sent', value: 0 },
//   { tag: 'accepted', value: 0 },
//   { tag: 'declined', value: 0 },
//   { tag: 'expired', value: 0 },
// ];

// const defaultInvoiceStatistics = [
//   { tag: 'draft', value: 0 },
//   { tag: 'pending', value: 0 },
//   { tag: 'overdue', value: 0 },
//   { tag: 'paid', value: 0 },
//   { tag: 'unpaid', value: 0 },
//   { tag: 'partially', value: 0 },
// ];

// const PreviewState = ({ tag, color, value }) => {
//   const translate = useLanguage();
//   return (
//     <div style={{ color: '#595959', marginBottom: 10 }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
//         <div className="left alignLeft capitalize">{translate(tag)}</div>
//         <div className="right alignRight">{value} %</div>
//       </div>
//       <Progress
//         percent={value}
//         showInfo={false}
//         strokeColor={color}
//         size={[200, 16]} // Adjusted size
//       />
//     </div>
//   );
// };

// export default function PreviewCard({
//   title = 'Preview',
//   statistics = defaultStatistics,
//   isLoading = false,
//   entity = 'invoice',
// }) {
//   const statisticsMap = useMemo(() => {
//     if (entity === 'invoice') {
//       return defaultInvoiceStatistics.map((defaultStat) => {
//         const matchedStat = Array.isArray(statistics)
//           ? statistics.find((stat) => stat.tag === defaultStat.tag)
//           : null;
//         return matchedStat || defaultStat;
//       });
//     } else {
//       return defaultStatistics.map((defaultStat) => {
//         const matchedStat = Array.isArray(statistics)
//           ? statistics.find((stat) => stat.tag === defaultStat.tag)
//           : null;
//         return matchedStat || defaultStat;
//       });
//     }
//   }, [statistics, entity]);

//   return (
//     <Col
//       className="gutter-row"
//       xs={{ span: 24 }}
//       sm={{ span: 24 }}
//       md={{ span: 8 }}
//       lg={{ span: 8 }}
//     >
//       <div className="pad20">
//         <h3
//           style={{
//             color: '#22075e',
//             fontSize: 'large',
//             marginBottom: 40,
//             marginTop: 0,
//           }}
//         >
//           {title}
//         </h3>
//         {isLoading ? (
//           <div style={{ textAlign: 'center' }}>
//             <Spin />
//           </div>
//         ) : (
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//             {statisticsMap?.map((status, index) => (
//               <PreviewState
//                 key={index}
//                 tag={status.tag}
//                 color={colours[status.tag]}
//                 value={status.value}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </Col>
//   );
// }


import React, { useMemo } from 'react';
import { Col, Progress, Spin } from 'antd';
import useLanguage from '@/locale/useLanguage';
import '@/modules/DashboardModule/style.css'; // Ensure this is imported if needed for your styles

const colours = {
  draft: '#329D7E',
  sent: '#1890ff',
  pending: '#635DF6',
  unpaid: 'brown',
  overdue: '#ff4d4f',
  partially: '#13c2c2',
  paid: '#95de64',
  declined: '#ff4d4f',
  accepted: '#95de64',
  cyan: '#13c2c2',
  purple: '#722ed1',
  expired: '#614700',
};

const defaultStatistics = [
  { tag: 'draft', value: 0 },
  { tag: 'pending', value: 0 },
  { tag: 'sent', value: 0 },
  { tag: 'accepted', value: 0 },
  { tag: 'declined', value: 0 },
  { tag: 'expired', value: 0 },
];

const defaultInvoiceStatistics = [
  { tag: 'draft', value: 0 },
  { tag: 'pending', value: 0 },
  { tag: 'overdue', value: 0 },
  { tag: 'paid', value: 0 },
  { tag: 'unpaid', value: 0 },
  { tag: 'partially', value: 0 },
];

const PreviewState = ({ tag, color, value }) => {
  const translate = useLanguage();
  return (
    <div style={{ color: '#595959', marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <div className="left alignLeft capitalize">{translate(tag)}</div>
        {/* <div className="right alignRight" style={{ marginLeft: 10 }}>{value} %</div> */}
      </div>
      <Progress
        steps={3}
        percent={value}
        strokeColor={color}
        size={[60, 6]} // Adjust size to fit vertically
        showInfo={true} // Hide percentage text inside the progress bar
      />
    </div>
  );
};

export default function PreviewCard({
  title = 'Preview',
  statistics = defaultStatistics,
  isLoading = false,
  entity = 'invoice',
}) {
  const statisticsMap = useMemo(() => {
    if (entity === 'invoice') {
      return defaultInvoiceStatistics.map((defaultStat) => {
        const matchedStat = Array.isArray(statistics)
          ? statistics.find((stat) => stat.tag === defaultStat.tag)
          : null;
        return matchedStat || defaultStat;
      });
    } else {
      return defaultStatistics.map((defaultStat) => {
        const matchedStat = Array.isArray(statistics)
          ? statistics.find((stat) => stat.tag === defaultStat.tag)
          : null;
        return matchedStat || defaultStat;
      });
    }
  }, [statistics, entity]);

  return (
    <Col
      className="gutter-row"
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={{ span: 8 }}
      lg={{ span: 8 }}
    >
      <div className="pad20" style={{ padding: '20px', minHeight: '400px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <h3
          style={{
            color: '#22075e',
            fontSize: 'large',
            marginBottom: 20,
            marginTop: 0,
          }}
        >
          {title}
        </h3>
        {isLoading ? (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {statisticsMap?.map((status, index) => (
              <PreviewState
                key={index}
                tag={status.tag}
                color={colours[status.tag]}
                value={status.value}
              />
            ))}
          </div>
        )}
      </div>
    </Col>
  );
}


