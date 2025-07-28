import React, { Fragment, useEffect } from 'react';
import type { HomepageProps } from '../types/homePage';


const HomepageComponent: React.FC<HomepageProps> = (props: any) => {
  const { getNews, news, newsLoading } = props;
  console.log('home', newsLoading,news);

    useEffect(() => {
      getNews()
  }, []);

  return (
    <Fragment>
    </Fragment>
  );
};

export default HomepageComponent;
