import URL from 'config/url';
import ApiFetch from 'tools/apiFetch';

//详情
export async function fetchOrderDetail(apiPrams) {
  const params = {
    id: apiPrams.id,
  };
  return await ApiFetch.requestHandleVal(URL.test, params, true, false, 'GET');
}
