package com.capstone.scanprospecta.data.repository

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.MutableLiveData
import com.capstone.scanprospecta.data.ResultState
import com.capstone.scanprospecta.data.api.ApiService
import com.capstone.scanprospecta.data.response.DataItem
import com.capstone.scanprospecta.data.response.ResumeResponse
import com.capstone.scanprospecta.utils.AppExecutors
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ResumeRepository(
    private val apiService: ApiService,
    private val appExecutors: AppExecutors
) {

    private val getResumeExample = MutableLiveData<ResultState<List<DataItem>>>()

    fun getResumeExample(token: String): LiveData<ResultState<List<DataItem>>> {
        getResumeExample.value = ResultState.loading
        val client = apiService.getResumeExample(token)
        client.enqueue(object : Callback<ResumeResponse> {
            override fun onResponse(call: Call<ResumeResponse>, response: Response<ResumeResponse>) {
                if (response.isSuccessful) {
                    val resume = response.body()?.data
                    val resumeList = ArrayList<DataItem>()

                    appExecutors.diskIO.execute {
                        resume?.forEach {
                            val result = DataItem(
                                it.skills,
                                it.image,
                                it.description,
                                it.resumeId,
                            )
                            resumeList.add(result)
                        }
                    }
                } else {
                    Log.e(TAG, "Failed: Get stories response unsuccessful - ${response.message()}")
                }
            }

            override fun onFailure(call: Call<ResumeResponse>, t: Throwable) {
                getResumeExample.value = ResultState.error(t.message.toString())
                Log.e(TAG, "Failed: Get stories response failure = ${t.message.toString()}")
            }
        })

        return getResumeExample
    }

    companion object {
        private val TAG = ResumeRepository::class.java.simpleName

        @Volatile
        private var instance: ResumeRepository? = null
        fun getInstance(
            apiService: ApiService,
            appExecutors: AppExecutors
        ): ResumeRepository =
            instance ?: synchronized(this) {
                instance ?: ResumeRepository(apiService, appExecutors)
            }.also { instance = it }
    }
}
