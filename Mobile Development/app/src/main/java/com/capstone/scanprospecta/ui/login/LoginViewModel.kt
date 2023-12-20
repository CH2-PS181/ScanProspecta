package com.capstone.scanprospecta.ui.login

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.capstone.scanprospecta.data.preference.UserModel
import com.capstone.scanprospecta.data.repository.UserRepository
import kotlinx.coroutines.launch

class LoginViewModel (private val repository: UserRepository): ViewModel() {
    fun saveSession(user: UserModel) {
        viewModelScope.launch {
            repository.saveSession(user)
        }
    }
    
    fun saveSession(token: String) {
        viewModelScope.launch(Dispatchers.IO) {
            userRepository.saveSession(token)
        }
    }
    
    fun checkIfFirstTime(): LiveData<Boolean> {
        return userRepository.isFirstTime().asLiveData()
    }
    fun login(requestBody: Map<String, String>) = repository.login(requestBody)

}