import HomepageComponent from '@pages/HomePage/component';
import { useAppDispatch, useAppSelector } from '@/store/reduxHook.ts';
import * as homepageSlice from '../slice/slice.ts';
import type {NewsQueryParams} from '@pages/HomePage/types/new.ts';

const HomePageContainer = (props: any) => {
  const dispatch = useAppDispatch();

  const news = useAppSelector((state) => state?.newsData?.articles);
  const newsLoading = useAppSelector((state) => state?.newsData?.loading);
  const overViewChannels = useAppSelector((state) => state?.newsData?.overview?.sources);
  const overViewLoading = useAppSelector((state) => state?.newsData?.overViewLoading);


  props = { ...props,overViewChannels, news, newsLoading,overViewLoading };
  const getNews = (formData?:NewsQueryParams) => {
    return dispatch(homepageSlice.getNews(formData));
  };

  const getOverView = () => {
    return dispatch(homepageSlice.getOverView());
  };

  return <HomepageComponent {...props} getNews={getNews} getOverView={getOverView} />;
};
export default HomePageContainer;
