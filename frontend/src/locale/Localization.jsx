import { ConfigProvider } from 'antd';
import '@/modules/DashboardModule/style.css'
export default function Localization({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#AC4FC6',
          colorLink: '#9873AC',
          borderRadius: 8,
          colorBgContainer: '#fff8e7', // Dark background color
          colorText: 'black', // White text color
          colorBorder: '#444444', // Dark border color
          //colorBgElevated: '#2A2A2A', // Elevated background color
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
