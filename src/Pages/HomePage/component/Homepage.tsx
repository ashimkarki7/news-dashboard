import React, {Fragment, useEffect, useState} from 'react';
import type { HomepageProps } from '../types/homePage';
import DashboardOverview from '@components/DashboardOverView/DashboardOverview.tsx';


const HomepageComponent: React.FC<HomepageProps> = (props) => {
  const { getNews,getOverView, news, newsLoading,overViewChannels } = props;
  console.log('home', newsLoading,news);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

    useEffect(() => {
      getOverView();
      getNews();
  }, []);

  return (
    <Fragment>
      <DashboardOverview selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel} overViewChannels={overViewChannels}/>
    </Fragment>
  );
};

export default HomepageComponent;
