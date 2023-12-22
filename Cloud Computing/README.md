<h1 align="center">ScanProspecta</h1>
<p align="center">Capstone project bangkit 2023-Cloud computing</p>

ScanProspecta is a comprehensive system designed to bridge the gap between job seekers and companies by efficiently scanning CVs to identify prospects matching qualifications and profiles, offering tailored recommendations, and optimizing opportunities in the job market that aims to leverage advanced technology and data-driven insights to streamline and improve the recruitment process for all parties involved. 
ScanProspecta emphasizes a meticulous and effective scanning process to unearth job opportunities, career advancement possibilities, or skills that harmonize with the CVs of job seekers or employees who upload their resumes. 
This service is engineered to help job seekers maximize their opportunities in the competitive job market.
> Base url of this service is: http://localhost:5000/

The service available:

- Authentications
  <pre>POST  /login</pre>
  <pre>POST  /register</pre>
  <pre>GET   /profile/{client_id}</pre>


- Predict 
  <pre>POST /run/predict</pre>

- Resume Example
  <pre>GET  /resume/</pre>
  <pre>GET  /resume/{resume_id}</pre>



# Quick Look

# Authentications

This service utilizes token-based authentication, requiring users to have an account for accessing its features. If you don't have an account, please create a new one. Once registered, you can generate an authentication token. This token serves as a means of logging in, requiring you to authenticate yourself using your email and password. If the authentication is successful, you will receive an access token, enabling you to access the service. If the authentication fails, an error message will be displayed.

The provided tokens are the accessToken and refreshToken. The refreshToken is used for token refreshing purposes. The accessToken remains valid for one hour. To refresh the token, you must send the refreshToken to the service. If the refreshToken is valid, a new accessToken will be provided. If the refreshToken is invalid, an error message will be returned.

By following this authentication process, you can securely access the service and enjoy its functionalities.

# Instructions

This project run in node js version 18.17.1.

1. Install all dependencies with

```bash
npm install
```

2. Make your database and export from database
3. Run server:

```bash
npm run start
```

# Environment

In order to run this project, you need to configure the following environment variables:

```bash

PORT= {your server port}

# Database Configuration MySQL
DB_HOST= {define your db host}
DB_USERNAME= {define your db username}
DB_PASSWORD= {define your db password}
DB_NAME= {define your db name}

# JWT TOKEN
SECRET_KEY= {define your secret key}
REFRESH_TOKEN_KEY= {define your refresh key}

```


### Dependency

- [Express Server](https://www.npmjs.com/package/express)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [DotEnv](https://www.npmjs.com/package/dotenv)
- [Multer](https://www.npmjs.com/package/multer)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [mysql2](https://www.npmjs.com/package/mysql2)
