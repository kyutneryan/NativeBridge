package com.nativebridge

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class MessageModule(reactContext: ReactApplicationContext) :
        ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "MessageModule"
    }

    @ReactMethod
    fun sendMessage(message: String, promise: Promise) {
        val response = "Received: $message"
        promise.resolve(response)
    }
}
