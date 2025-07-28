import React, {Fragment, useEffect, useState} from 'react';
import type { HomepageProps } from '../types/homePage';
import DashboardOverview from '@components/DashboardOverView/DashboardOverview.tsx';
import SearchBar from '@components/SearchBar/SearchBar.tsx';


const HomepageComponent: React.FC<HomepageProps> = (props) => {
  const { getNews,getOverView, news, newsLoading,overViewChannels,overViewLoading } = props;
  console.log('home', newsLoading,news);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

    useEffect(() => {
      getOverView();
      getNews();
  }, []);

  return (
    <Fragment>
      <DashboardOverview overViewLoading={overViewLoading} selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel} overViewChannels={overViewChannels}/>
      <div className="row mb-5">
        <div className="col-12">
     <SearchBar  selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel}/>
        </div>
      </div>
    </Fragment>
  );
};

export default HomepageComponent;
