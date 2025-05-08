package com.reactnativewithiosscreen

import android.os.Bundle
import android.view.View
import android.widget.Button
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.datadog.android.okhttp.DatadogInterceptor
import com.datadog.android.rum.GlobalRumMonitor
import com.datadog.android.trace.TracingHeaderType
import okhttp3.OkHttpClient
import okhttp3.Request
import java.io.IOException

class FirstFragment : Fragment(R.layout.fragment_first) {
    private val tracedHostsWithHeaderType = mapOf(
        "example.com" to setOf(TracingHeaderType.DATADOG),
        "example.eu" to setOf(TracingHeaderType.DATADOG)
    )

    private val client = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
        .build()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val firstButton: Button = view.findViewById(R.id.button_first)
        val errorButton: Button = view.findViewById(R.id.button_error)

        firstButton.setOnClickListener {
            this.onButtonPress()
        }

        errorButton.setOnClickListener {
            throw RuntimeException("This is a test error from the error button!")
        }
    }

    override fun onResume() {
        super.onResume()
        GlobalRumMonitor.get().startView("first_fragment", "First Fragment", mapOf())
    }

    override fun onPause() {
        super.onPause()
        GlobalRumMonitor.get().stopView("first_fragment", mapOf())
    }

    private fun onButtonPress() {
        val request = Request.Builder()
            .url("http://httpbin.org/get?params-kotlin-test")
            .build()

        Thread {
            client.newCall(request).execute().use { response ->
                if (!response.isSuccessful) throw IOException("Unexpected code $response")

                for ((name, value) in response.headers) {
                    println("$name: $value")
                }

                println(response.body!!.string())
            }
        }.start()

        findNavController().navigate(R.id.SecondFragment)
    }

}
