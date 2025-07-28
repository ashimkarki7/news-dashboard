import { httpBase } from './httpBaseUtil.ts';

export function v2Fetch(endpoint: string,params:any) {
  const getApi = import.meta.env.VITE_NEWS_API_KEY;
   params = {
    ...params,
    apikey:getApi
  }
  return httpBase().get(`${endpoint}`,{
    params
  });
}
