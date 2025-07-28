import React, {Fragment, useCallback, useEffect, useState} from 'react';
import type { HomepageProps } from '../types/homePage';
import DashboardOverview from '@components/DashboardOverView/DashboardOverview.tsx';
import SearchBar from '@components/SearchBar/SearchBar.tsx';
import CategoryFilter from '@components/CategoryFilter/CategoryFilter.tsx';
import type {NewsFilters} from '@pages/HomePage/types/new.ts';
import ErrorAlert from '@components/ErrorAlert/ErrorAlert.tsx';
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner.tsx';
import ArticleGrid from '@components/ArticleGrid/ArticleGrid.tsx';
import InfiniteScroll from '@components/InfiniteScroll/InfiniteScroll.tsx';


const HomepageComponent: React.FC<HomepageProps> = (props) => {
  const { getNews,getNewsPaginated ,getOverView, newsLoading,overViewChannels,overViewLoading,newsError,news,totalResults } = props;

    const hasMore = news.length < totalResults;

    const [filters, setFilters] = useState<NewsFilters>({
        query:'',
        selectedChannel: '',
        category: '*',
        page: 1,
        pageSize: 20,
    });


    useEffect(() => {
      getOverView();
        getNews ({page: 1 ,pageSize: 20});
  }, []);




    const loadMore = useCallback(async () => {
        const nextPage = filters.page + 1;
        setFilters((prev) => ({ ...prev, page: nextPage }));

        const paginatedFilters:any = {
            page: nextPage,pageSize: 20
        }
        if (filters?.query) {
            paginatedFilters.q = filters.query;
            paginatedFilters.searchIn = 'title,description';
        }  if (filters?.selectedChannel) {
            paginatedFilters.sources = filters.selectedChannel
        }

        if (filters?.category && filters?.category !== '*') {
            paginatedFilters.q = filters.category
        }
        await getNewsPaginated(paginatedFilters);
    }, [filters, getNews]);


  return (
    <Fragment>
      <DashboardOverview filters={filters}  overViewLoading={overViewLoading}  setFilters={setFilters} overViewChannels={overViewChannels}/>
      <div className="row mb-5" id={'searchBarContainer'}>
        <div className="col-12">
     <SearchBar  filters={filters} setFilters={setFilters}/>
        </div>
      </div>
        <div className="row mb-5" id={'categoryFilterContainer'}>
            <div className="col-12">
                <CategoryFilter newsLoading={newsLoading} filters={filters} setFilters={setFilters}    />
            </div>
        </div>
        {newsError && (
            <div className="row mb-4">
                <div className="col-12">
                    <ErrorAlert message={newsError} />
                </div>
            </div>
        )}


        <div className="row">
            <div className="col-12">
                <div className="card bg-dark bg-opacity-25 border-light border-opacity-25 mb-4">
                    <div className="card-body">
                        <h4 className="card-title text-white mb-3">
                            <i className="fas fa-newspaper me-2"></i>
                            Latest News Articles
                        </h4>
                        {newsLoading && news?.length === 0 ? (
                            <LoadingSpinner />
                        ) : (
                            <InfiniteScroll loadMore={loadMore} newsLoading={newsLoading} articles={news} hasMore={hasMore}>
                                 <ArticleGrid articles={news} />
                             </InfiniteScroll>
                        )}
                    </div>
                </div>
            </div>
        </div>


    </Fragment>
  );
};

export default HomepageComponent;
