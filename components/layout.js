import Head from 'next/head';
import styles from './layout.module.css';
import Header from '../components/header';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Next Fauna Auth</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    <main>
      <div className={styles.container}>{children}</div>
    </main>
  </>
);

export default Layout;
