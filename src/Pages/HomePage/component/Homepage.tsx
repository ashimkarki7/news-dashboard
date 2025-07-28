import React, {Fragment, useEffect, useState} from 'react';
import type { HomepageProps } from '../types/homePage';
import DashboardOverview from '@components/DashboardOverView/DashboardOverview.tsx';
import SearchBar from '@components/SearchBar/SearchBar.tsx';
import CategoryFilter from '@components/CategoryFilter/CategoryFilter.tsx';
import type {NewsFilters} from '@pages/HomePage/types/new.ts';


const HomepageComponent: React.FC<HomepageProps> = (props) => {
  const { getNews,getOverView, newsLoading,overViewChannels,overViewLoading } = props;

    const [filters, setFilters] = useState<NewsFilters>({
        query:'',
        selectedChannel: null,
        category: '*',
    });


    useEffect(() => {
      getOverView();
      getNews();
  }, []);



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
    </Fragment>
  );
};

export default HomepageComponent;
