import React, {Fragment, useEffect, useState} from 'react';
import type { HomepageProps } from '../types/homePage';
import DashboardOverview from '@components/DashboardOverView/DashboardOverview.tsx';
import SearchBar from '@components/SearchBar/SearchBar.tsx';
import CategoryFilter from '@components/CategoryFilter/CategoryFilter.tsx';
import type {NewsFilters} from '@pages/HomePage/types/new.ts';
import ErrorAlert from '@components/ErrorAlert/ErrorAlert.tsx';
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner.tsx';
import ArticleGrid from '@components/ArticleGrid/ArticleGrid.tsx';


const HomepageComponent: React.FC<HomepageProps> = (props) => {
  const { getNews,getOverView, newsLoading,overViewChannels,overViewLoading,newsError,news } = props;

    const [filters, setFilters] = useState<NewsFilters>({
        query:'',
        selectedChannel: null,
        category: '*',
    });


    useEffect(() => {
      getOverView();
      getNews();
  }, []);
console.log(news,'news');


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
                            <Fragment>
                                 <ArticleGrid articles={news} />
                            </Fragment>

                        )}
                    </div>
                </div>
            </div>
        </div>


    </Fragment>
  );
};

export default HomepageComponent;
