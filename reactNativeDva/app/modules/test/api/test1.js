
//详情
export async function fetchOrderDetail(apiPrams) {
  const params = {
    id: apiPrams.id,
  };
  return await ApiFetch.requestHandle(URL.getCheckRoomOrderDetail, params, true, false, 'POST');
}
