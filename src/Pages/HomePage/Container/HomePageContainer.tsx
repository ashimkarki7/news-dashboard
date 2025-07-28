import HomepageComponent from '@pages/HomePage/component';
import { useAppDispatch, useAppSelector } from '@/store/reduxHook.ts';
import * as homepageSlice from '../slice/slice.ts';

const HomePageContainer = (props: any) => {
  const dispatch = useAppDispatch();

  const news = useAppSelector((state) => state?.newsData?.payload);
  const newsLoading = useAppSelector((state) => state?.newsData?.loading);

  props = { ...props, news, newsLoading };
  const getNews = () => {
    return dispatch(homepageSlice.getNews());
  };

  return <HomepageComponent {...props} getNews={getNews} />;
};
export default HomePageContainer;
