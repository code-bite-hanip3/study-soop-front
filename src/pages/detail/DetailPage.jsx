// import styles from './DetailPage.module.css';
import { Frame } from '@/components/Frame';
import PageHeader from './PageHeader';
import PageTable from './PageTable';

function DetailPage() {
  return (
    <Frame>
      <PageHeader></PageHeader>
      <PageTable></PageTable>
    </Frame>
  );
}

export default DetailPage;
