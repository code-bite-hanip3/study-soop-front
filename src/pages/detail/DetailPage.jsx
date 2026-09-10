import '../../reset.css';
import '../../global.css';

// import styles from './DetailPage.module.css';
import { Frame } from '@/components/Frame';
import { Layout } from '@/components/Layout';
import PageHeader from './PageHeader';
import PageTable from './PageTable';

export function DetailPage() {
  return (
    <Layout>
      <Frame>
        <PageHeader></PageHeader>
        <PageTable></PageTable>
      </Frame>
    </Layout>
  );
}
