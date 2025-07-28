import { Header } from '@common/Header/Header.tsx';

const PageLayout = (props: any) => {
  return (
    <div id="PageLayout" className="min-vh-100">
      <Header />
      <div>
        <div id={'viewContent'}>{props.children}</div>
      </div>
      <div id={'footer'}></div>
    </div>
  );
};
export default PageLayout;
