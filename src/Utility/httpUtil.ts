import { httpBase } from './httpBaseUtil.ts';

export function v2Fetch(endpoint: string,params?:any) {
  return httpBase().get(`${endpoint}`,{
    params
  });
}
