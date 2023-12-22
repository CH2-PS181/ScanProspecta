package com.capstone.scanprospecta.data.response

import com.google.firebase.database.IgnoreExtraProperties


@IgnoreExtraProperties
data class Message(
    val text: String? = null,
    val name: String? = null,
    val timestamp: Long? = null
)