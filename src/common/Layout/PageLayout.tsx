import { Header } from '@common/Header/Header.tsx';
import ScrollProgress from '@components/ScrollProgress.tsx';
import FloatingActionButton from '@components/FloatingActionButton.tsx';

const PageLayout = (props: any) => {
  return (
    <div id="PageLayout" className="min-vh-100">
        <ScrollProgress/>
      <Header />
        <main className="container-fluid py-4">
        <div id={'viewContent'}>{props.children}</div>
      </main>
        <FloatingActionButton />
    </div>
  );
};
export default PageLayout;
