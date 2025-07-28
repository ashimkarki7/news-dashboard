import HomepageComponent from '@pages/HomePage/component';
import { useAppDispatch, useAppSelector } from '@/store/reduxHook.ts';
import * as homepageSlice from '../slice/slice.ts';
import type {NewsQueryParams} from '@pages/HomePage/types/new.ts';

const HomePageContainer = (props: any) => {
  const dispatch = useAppDispatch();

  const news = useAppSelector((state) => state?.newsData?.articles);
  const totalResults = useAppSelector((state) => state?.newsData?.totalResults);
  const newsLoading = useAppSelector((state) => state?.newsData?.loading);
  const overViewChannels = useAppSelector((state) => state?.newsData?.overview?.sources);
  const overViewLoading = useAppSelector((state) => state?.newsData?.overViewLoading);

  const newsError = useAppSelector((state) => state?.newsData?.error);


  props = { ...props,overViewChannels, news, newsLoading,overViewLoading,totalResults };
  const getNews = (formData?:NewsQueryParams) => {
    return dispatch(homepageSlice.getNews(formData));
  };

  const getNewsPaginated = (formData?:NewsQueryParams) => {
    return dispatch(homepageSlice.getNewsPaginated(formData));
  };


  const getOverView = () => {
    return dispatch(homepageSlice.getOverView());
  };

  return <HomepageComponent {...props} getNewsPaginated={getNewsPaginated} getNews={getNews} getOverView={getOverView} newsError={newsError} />;
};
export default HomePageContainer;
