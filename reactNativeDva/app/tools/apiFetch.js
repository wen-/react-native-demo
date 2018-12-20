import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import Toast from 'components/base/toast';

const config = {
  // iOS状态栏加载指示器
  indicator: true,
  // 超时
  timeout: 60000
};

function toQueryString(obj) {
  return obj
    ? Object.keys(obj)
      .map(k => `${encodeURIComponent(k.toString().trim())}=${encodeURIComponent(obj[k].toString().trim())}`)
      .join('&')
    : '';
}

/**
 * 请求参数
 * @param url
 * @param params
 * @param isShowLoading
 * @param isShowError
 * @param method
 * @returns {Promise}
 */
function requestHandle(url, params = null, method = 'POST') {
  // 加上所有你需要的header公共参数,比如Authorization
  const _header = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Connection': 'close',
    'Accept-Language': 'zh-cn',
    'User-Agent': Platform.OS === 'ios' ? 'iOS' : 'Android',
  };

  let _url = url;
  if (method == 'GET' && params) {
    if(url.includes('?')){
      _url += `&${toQueryString(params)}`;
    }else{
      _url += `?${toQueryString(params)}`;
    }
  }

  let _params;
  if (method == 'POST' && params) {
    _params = JSON.stringify(params);
  }

  console.info('%c 开始请求URL: ', 'backgroundColor:#f00,color: #fff', _url);
  console.info('%c 请求方法: ', 'color: #f00', method);
  console.info('%c 请求头: ', 'color: #f00', _header);
  console.info('%c 请求参数: ', 'color: #f00', _params);

  return RNFetchBlob.config(config).fetch(method, _url, _header, _params);
}

/**
 * 请求参数
 * @param url
 * @param params
 * @param isShowLoading
 * @param isShowError
 * @param method
 * @returns {*}
 */
async function requestHandleVal(url, params = null, isShowLoading=true, isShowError = true, method = 'POST') {
  // 加上所有你需要的header公共参数,比如Authorization
  const _header = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Connection': 'close',
    'Accept-Language': 'zh-cn',
    'User-Agent': Platform.OS === 'ios' ? 'iOS' : 'Android',
  };

  let _url = url;
  if (method == 'GET' && params) {
    if(url.includes('?')){
      _url += `&${toQueryString(params)}`;
    }else{
      _url += `?${toQueryString(params)}`;
    }
  }

  let _params;
  if (method == 'POST' && params) {
    _params = JSON.stringify(params);
  }

  if (isShowLoading) { Toast.loading(); }

  try {
    console.info('%c 开始请求URL: ', 'backgroundColor:#f00,color: #fff', _url);
    console.info('%c 请求方法: ', 'color: #f00', method);
    console.info('%c 请求头: ', 'color: #f00', _header);
    console.info('%c 请求参数: ', 'color: #f00', params);

    const responseData = await RNFetchBlob.config(config).fetch(method, _url, _header, _params);
    const resultData = responseData.data
      ? JSON.parse(responseData.data)
      : { code: 'noJson', message: '接口数据错误，请稍后再试', data: responseData };

    console.info('%c 返回数据: ', 'backgroundColor:#f00,color: #fff', resultData);

    if(isShowError && resultData.code != 200){ Toast.info(resultData.message); }
    if(isShowLoading && !(isShowError && resultData.code != 200)){ Toast.hide(); }
    return resultData;
  } catch (err) {
    console.info('%c 请求URL出错: ', 'backgroundColor:#f00,color: #fff', _url, err);
    const formatError = formatNetworkError(err);
    if(isShowError){ Toast.info(formatError.message); }
    if(isShowLoading && !isShowError){ Toast.hide(); }
    return formatError;
  }
}

/**
 * 数据格式化, 返回非服务器返回的错误
 * @param error
 * @returns {*}  // offline, timeout, unknown
 */
function formatNetworkError(error) {
  const errMsg = error.toString();
  if (errMsg.includes('offline') || errMsg.includes('断开') || errMsg.includes('Failed to connect')) {
    dialog.toast.info('网络已断开，请检测网络后重试');
    return { code: 'offline', message: '网络已断开，请检测网络后重试', data: '网络已断开，请检测网络后重试' };
  } else if (errMsg.includes('timed out') || errMsg.includes('超时')) {
    dialog.toast.info('请求超时，请稍后再试');
    return { code: 'timeout', message: '网络异常，请稍后重试', data: '网络异常，请稍后重试' };
  }
  return { code: 'unknown', message: '网络异常，请稍后重试', data: errMsg };
}

export default {
  requestHandle,
  requestHandleVal
};
