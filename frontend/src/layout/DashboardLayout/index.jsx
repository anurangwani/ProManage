import React from 'react';
import '@/modules/DashboardModule/style.css'
import { Layout } from 'antd';

const { Content } = Layout;

export default function DashboardLayout({ children }) {
  return (
    <div
      style={{
        marginLeft: 140,
        // backgroundColor:"#fdfbde",
      }}
    >
      {children}
    </div>
  );
}
