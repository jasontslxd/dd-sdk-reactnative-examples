package com.example.hybridapp

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.findNavController
import com.example.hybridapp.databinding.FragmentSecondBinding
import com.facebook.react.ReactFragment
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Query
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import android.util.Log
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import retrofit2.create

data class HttpResponse(
    val args: Args,
    val origin: String,
    val url: String
)

data class Args(
    val param: String
)

// data class Headers(
//     val Accept: String,
//     val "Accept-Encoding" : String
// )

interface HttpBinApi {
    @GET("/get?params=kotlin-test")
    suspend fun getResponse() : Response<HttpResponse>
}

object ApiHelper {
    val baseUrl = "http://httpbin.org/"

    fun getInstance(): Retrofit {
        return Retrofit.Builder().baseUrl(baseUrl)
            .addConverterFactory(GsonConverterFactory.create()) 
            // we need to add converter factory to 
            // convert JSON object to Java object
            .build()
    }
}

/**
 * A simple [Fragment] subclass as the second destination in the navigation.
 */
class SecondFragment : Fragment() {

    private var _binding: FragmentSecondBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        _binding = FragmentSecondBinding.inflate(inflater, container, false)
        return binding.root

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.buttonApi.setOnClickListener {
            val httpBinApi = ApiHelper.getInstance().create(HttpBinApi::class.java)

            GlobalScope.launch {
            val result = httpBinApi.getResponse()
                if (result != null)
                    // Checking the results
                    Log.d("result: ", result.body().toString())
            }
        }

        binding.buttonSecond.setOnClickListener {
            findNavController().navigate(R.id.action_SecondFragment_to_FirstFragment)
        }

        binding.buttonReact.setOnClickListener {
            val reactNativeFragment = ReactFragment.Builder()
                .setComponentName("RNApp")
                .build()
            activity?.supportFragmentManager
                ?.beginTransaction()
                ?.add(R.id.reactNativeFragment, reactNativeFragment)
                ?.commit()
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}