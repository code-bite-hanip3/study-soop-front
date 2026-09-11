// import styles from './DetailPage.module.css';
import { Frame } from '@/components/Frame';
import { Layout } from '@/components/Layout';
import PageHeader from './PageHeader';
import PageTable from './PageTable';

function DetailPage() {
  return (
    <Layout>
      <Frame>
        <PageHeader></PageHeader>
        <PageTable></PageTable>
      </Frame>
    </Layout>
  );
}

export default DetailPage;
