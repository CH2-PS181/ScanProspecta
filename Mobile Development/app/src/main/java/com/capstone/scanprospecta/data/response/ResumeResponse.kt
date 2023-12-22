package com.capstone.scanprospecta.data.response

import com.google.gson.annotations.SerializedName

data class ResumeResponse(

	@field:SerializedName("data")
	val data: List<DataItem>,

	@field:SerializedName("message")
	val message: String
)

data class DataItem(

	@field:SerializedName("skills")
	val skills: String,

	@field:SerializedName("image")
	val image: String,

	@field:SerializedName("description")
	val description: String,

	@field:SerializedName("resume_id")
	val resumeId: Int,
)
