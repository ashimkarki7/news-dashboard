import { Header } from '@common/Header/Header.tsx';
import ScrollProgress from '@components/ScrollProgress.tsx';

const PageLayout = (props: any) => {
  return (
    <div id="PageLayout" className="min-vh-100">
        <ScrollProgress/>
      <Header />
        <main className="container-fluid py-4">
        <div id={'viewContent'}>{props.children}</div>
      </main>
    </div>
  );
};
export default PageLayout;
