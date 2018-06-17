package com.examples;

import com.baidu.mobstat.StatService;
import com.facebook.react.ReactApplication;
import com.baidu.reactnativemobstat.RNBaiduMobStatPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.liuchungui.react_native_umeng_push.UmengPushApplication;
import com.liuchungui.react_native_umeng_push.UmengPushPackage;

import org.android.agoo.huawei.HuaWeiRegister;
import org.android.agoo.xiaomi.MiPushRegistar;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends UmengPushApplication implements ReactApplication {
	private static final UmengPushPackage pushPackage = new UmengPushPackage();

	private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
		@Override
		public boolean getUseDeveloperSupport() {
			return BuildConfig.DEBUG;
		}

		@Override
		protected List<ReactPackage> getPackages() {
			return Arrays.<ReactPackage>asList(
					new SplashScreenReactPackage(),
					new MainReactPackage(),
					new RNBaiduMobStatPackage(),
					pushPackage
			);
		}
	};

	@Override
	public ReactNativeHost getReactNativeHost() {
		return mReactNativeHost;
	}

	@Override
	public void onCreate() {
		super.onCreate();
		SoLoader.init(this, /* native exopackage */ false);
		StatService.start(this);

		//友盟推送自定义资源包名
		String packageName = "com.examples";
		mPushAgent.setResourcePackageName(packageName);
		//华为通道
		HuaWeiRegister.register(this);
		//小米通道
		MiPushRegistar.register(this, BuildConfig.小米AppID, BuildConfig.小米AppKey);
	}

	public static UmengPushPackage getReactPackage() {
		return pushPackage;
	}
}