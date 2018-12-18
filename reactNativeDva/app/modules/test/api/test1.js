import URL from 'config/url';

//详情
export async function fetchOrderDetail(apiPrams) {
  const params = {
    id: apiPrams.id,
  };
  return await ApiFetch.requestHandle(URL.test, params, true, false, 'POST');
}
