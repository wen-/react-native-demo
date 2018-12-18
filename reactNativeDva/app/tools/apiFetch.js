import RNFetchBlob from 'rn-fetch-blob';
import { DeviceEventEmitter, Platform } from 'react-native';
import dialog from '@components/base/dialog';

const config = {
  // 指示器,iOS专属
  indicator: true,
  // 超时
  timeout: 15000
  // 缓存地址
  // path : string,
  // appendExt : string,
  // session : string,
  // addAndroidDownloads : any,
};

function toQueryString(obj) {
  return obj
    ? Object.keys(obj)
      .map(k => `${encodeURIComponent(k.toString().trim())}=${encodeURIComponent(obj[k].toString().trim())}`)
      .join('&')
    : '';
}

// 网络请求状态
const RequestStatus = {
  success: '200', // 请求成功
  failed: '100', // 请求失败
  sessionExpired: '2', // 请求会话过期
  noPermission: '3', // 请求无权限
  timeout: '4', // 请求超时
  offline: 'offline', // 请求超时
  other: '5' // 其他错误
};

// let requestCount = 0;
function showLoading() {
  dialog.toast.loading(0);
  // requestCount += 1;
}

function hideLoading() {
  dialog.toast.hide();
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
async function requestHandle(url, params = null, isShowLoading, isShowError = true, method = 'POST') {
  // 加上所有你需要的header公共参数,比如Authorization
  const _method = method;

  const userInfo = await Store.get('userInfo');
  const authorization = do {
    if (!userInfo) {
      undefined;
    } else if (!userInfo.authorization) {
      undefined;
    } else {
      `Bearer ${userInfo.authorization}`;
      // Bearer
    }
  };
  const _header = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Connection': 'close',
    'Accept-Language': 'zh-cn',
    'User-Agent': Platform.OS === 'ios' ? 'IOS' : 'Android',
    Authorization: authorization,
  };

  let _url = url;
  if (_method === 'GET' && !isEmpty(params)) {
    _url += `?${toQueryString(params)}`;
  }

  let _params;
  if (_method === 'POST' && !isEmpty(params)) {
    _params = JSON.stringify(params);
  }
  if (isShowLoading) { showLoading(); }
  try {
    console.info('%c begin request URI: ', 'background: red; color: #fff', _url);
    const responseData = await RNFetchBlob.config(config).fetch(_method, _url, _header, _params);
    const resultData = responseData.data
      ? JSON.parse(responseData.data)
      : { code: 'noJson', message: '接口数据错误，请稍后再试', data: responseData };
    log(_method, _url, _params, authorization, resultData);
    const handled = errInterception(resultData);
    !handled && resultHandle(resultData, isShowLoading, isShowError);
    return resultData;
  } catch (err) {
    const formatError = formatNetworkError(err);
    resultHandle(formatError, isShowLoading, isShowError);
    log(_method, _url, _params, formatError);
    return formatError;
  }
}

/**
 * @param url  上传文件地址
 * @param opts 必须遵守{uri: uri, type: 'multipart/form-data', name: 'image.png'}格式
 * @param onProgress
 * @returns {Promise}
 */
function uploadFormHandle(url, opts = {}, onProgress) {
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open('post', url);
    Object.keys(opts.headers || {})
      .forEach((feild) => {
        const value = opts.headers[feild];
        xhr.setRequestHeader(feild, value);
      });
    xhr.onload = e => res(e.target);
    xhr.onerror = rej;
    // event.loaded / event.total * 100 ; //event.lengthComputable
    if (xhr.upload && onProgress) xhr.upload.onprogress = onProgress;
    xhr.send(opts.body);
  });
}

/**
 * 下载的文件地址
 * @param fromUrl
 * @param downloadDest
 * @param progress
 * @param background
 * @returns {*}
 */
function downloadHandle(fromUrl, downloadDest, progress, background) {
  return RNFS.downloadFile({
    fromUrl,
    toFile: downloadDest,
    headers: {
      Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJlYWYiLCJzdWIiOiJkZnMiLCJhdWQiOiJkZXZlbG9wZXJzIiwiaWF0IjoxNTE2MDk2NzEzfQ.VXgN6b_H-q66VuLBZRQEzbGgWRTatgAQ4zto2OZ-oJG3hzSFN4kvZkW4EsMg8YyBO4uZW8AYh9x9dRFkpfRLew'
    },
    progress,
    background
  });
}

// ============== util start

/**
 * 错误日志打印
 * @param method
 * @param api
 * @param data
 * @param Authorization
 * @param result
 */
function log(method, api, data, Authorization, result) {
  if (__DEV__ && console.group) {
    const styles = {
      method: () => 'color: #dd1c65',
      url: () => 'color: #000',
      data: () => 'color: #4CAF50',
      Authorization: () => 'color: #4CAF50',
      result: () => 'color: #03A9F4'
    };
    console.group(`%c ${method} %c ${api}`, styles.method(), styles.url());
    console.log('%c data', styles.data(), cloneDeep(data));
    console.log('%c Authorization', styles.Authorization(), { Authorization });
    console.log('%c result', styles.result(), cloneDeep(result));
    try {
      console.groupEnd();
    } catch (e) {
      console.log('—— log end ——');
    }
  }
}

/**
 * 强制拦截接口指定的返回错误, 必须要拦截的写在下面, 一般无需拦截
 * example: 1111111 用户信息更新， 000000 会话失效，000002空指针异常，要求跳到登录页
 * warning: 该方法拦截的错误不受isShowError的值控制
 * @param resData
 * @param isShowLoading
 * @returns {boolean}
 */
function errInterception(resData, isShowLoading) {
  let handleMsg;
  if (resData.code === '1111111') {
    handleMsg = '请重新刷新该页面';
  }
  if (resData.code === '000000') {
    handleMsg = resData.message;
  }
  if (resData.code === '000002') {
    global.Authorization = ''; // 清空Authorization
    handleMsg = '系统升级中， 请稍后再试';
  }

  if (resData.code === '800023') { // 被其他设备登录
    handleMsg = resData.message;

    DeviceEventEmitter.emit('NeedRefreshUser');
  }

  if (handleMsg) {
    resultHandle(
      {
        ...resData, message: handleMsg
      },
      isShowLoading,
      true
    );
    return true;
  }
  return false;
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
  return { code: 'unknown', message: '系统升级中，请稍后重试', data: errMsg };
}

/**
 * ui展示错误信息
 * @param formatError
 * @param isShowLoading
 * @param isShowError
 */
function resultHandle(formatError, isShowLoading, isShowError) {
  isShowLoading && hideLoading();
  isShowError && formatError.code != RequestStatus.success && dialog.toast.info(formatError.message);
}

// ============ util end

export {
  RequestStatus,
  requestHandle,
  uploadFormHandle,
  downloadHandle
};
