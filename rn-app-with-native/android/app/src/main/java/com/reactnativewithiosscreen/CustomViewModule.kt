package com.reactnativewithiosscreen

import android.content.Intent
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.datadog.android.okhttp.DatadogInterceptor
import okhttp3.OkHttpClient
import okhttp3.Request
import java.io.IOException

class CustomViewModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "CustomView"

    @ReactMethod
    fun startView(promise: Promise) {
        val intent = Intent(reactApplicationContext, NativeActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        reactApplicationContext.startActivity(intent)
        promise.resolve(true)
    }

    @ReactMethod
    fun callApiFromNative(promise: Promise) {
        val client = OkHttpClient.Builder()
            .addInterceptor(DatadogInterceptor())
            .build()
 
        val request = Request.Builder()
            .url("https://httpbin.org/get?params=native-api-call-from-react-native")
            .build()
 
        Thread {
            try {
                client.newCall(request).execute().use { response ->
                    if (!response.isSuccessful) throw IOException("Unexpected code $response")
 
                    val responseBody = response.body?.string() ?: "No Response Body"
                    // Emit event to React Native with the API response
                    reactApplicationContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit("nativeApiResponse", responseBody)
                    promise.resolve("API call successful")
                }
            } catch (e: Exception) {
                promise.reject("API_CALL_FAILED", e)
            }
        }.start()
    }
}


