import React from 'react';
import '@/modules/DashboardModule/style.css'
import { CrudContextProvider } from '@/context/crud';

function DefaultLayout({ children }) {
  return <CrudContextProvider class="custom">{children}</CrudContextProvider>;
}

export default DefaultLayout;
