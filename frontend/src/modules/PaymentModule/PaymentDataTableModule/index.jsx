import { ErpLayout } from '@/layout';
import ErpPanel from '@/modules/ErpPanelModule';
import '@/modules/DashboardModule/style.css'
export default function PaymentDataTableModule({ config }) {
  return (
    <ErpLayout>
      <ErpPanel config={config} ></ErpPanel>
    </ErpLayout>
  );
}
