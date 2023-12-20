package com.capstone.scanprospecta.ui.login

import android.animation.AnimatorSet
import android.animation.ObjectAnimator
import android.content.Intent
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.view.WindowInsets
import android.view.WindowManager
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AlertDialog
import com.capstone.scanprospecta.data.ResultState
import com.capstone.scanprospecta.data.preference.UserModel
import com.capstone.scanprospecta.databinding.ActivityLoginBinding
import com.capstone.scanprospecta.ui.ViewModelFactory
import com.capstone.scanprospecta.ui.home.HomeFragment
import com.capstone.scanprospecta.ui.main.MainActivity
import com.capstone.scanprospecta.ui.register.RegisterActivity

class LoginActivity : AppCompatActivity() {

    private val viewModel by viewModels<LoginViewModel> {
        ViewModelFactory.getInstance(this)
    }
    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)


        setupView()
        userlogin()
    }

    private fun setupView() {
        @Suppress("DEPRECATION")
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.insetsController?.hide(WindowInsets.Type.statusBars())
        } else {
            window.setFlags(
                WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN
            )
        }
        supportActionBar?.hide()
    }

    private fun setupAction(message: String) {
        binding.btnRegister.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java)) }

        AlertDialog.Builder(this@LoginActivity).apply {
            setTitle("Yeah!")
            setMessage(message)
            setPositiveButton("Lanjut") { _, _ ->
                val intent = Intent(context, MainActivity::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_NEW_TASK
                startActivity(intent)
            }
            create()
            show()
        }
    }


    private fun userlogin(){

        val email = binding.editTextEmail.text.toString()
        val password = binding.editTextPassword.text.toString()
        val requestBody = mapOf(

            "email" to email,
            "password" to password,
        )
        binding.btnLogin.setOnClickListener{
            viewModel.login(requestBody).observe(this){
                if (it!=null){
                    when(it){
                        is ResultState.loading -> {
                            showLoading(true)
                        }
                        is ResultState.success -> {
                            val message = it.data.message
                            setupAction(message)

                            val token = it.data?.Token

                            if (token != null) {
                                viewModel.saveSession(UserModel( email, token))
                            }

                            showLoading(false)
                        }
                        is ResultState.error -> {
                            val error = it.error
                            showToast(error)
                            showLoading(false)
                        }
                    }
                }
            }
        }
    }

    private fun showLoading(isLoading: Boolean) {
        binding.progressIndicator.visibility = if (isLoading) View.VISIBLE else View.GONE
    }

    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
}