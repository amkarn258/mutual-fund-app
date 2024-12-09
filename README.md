Please follow the below steps to set up locally. **There is no need for any database migration scripts** in this application, you'd only need to paste a mongo_uri in the env file and the application should work smoothly. How to set up locally:

1. Clone the repository.
2. Create a mongodb database cluster (atlas recommended): Copy and paste the link to connect to mongoDB cluster in the env file in MONGO_URI variable.
3. Generate a jwt token (jwt.io) and paste in the env file for JWT_SECRET variable
4. Get your RapidAPI key and paste it in the env file (this can be found here once you have the rapid api latest mutual fund nav api: https://rapidapi.com/suneetk92/api/latest-mutual-fund-nav/playground)
5. Run npm start from the mutual-fund-app directory.
6. All of the below APIs could be tested and used by POSTMAN or curl commands.

Endpoints (and 1 e2e test for each endpoint):

1. **POST** ```http://localhost:5000/api/auth/register``` : To register a new user to the platform, body: 
   ```
   {
      "email": "testuser2@example.com",
      "password": "password123"
   }
   ```
2. **POST** ```http://localhost:5000/api/auth/login``` : To login to an existing account by providing correct email and password. This request should return an authentication token, which should be included in authentication header for portfolio endpoints. Body:
   ```
   {
      "email": "testuser2@example.com",
      "password": "password123"
   }
   ```
3. **GET** ```http://localhost:5000/api/fundFamilies/``` : Get list of all fund families after user has logged in. The purpose of this endpoint is to allow user to be able to select one of the fund families. Request : /api/fundFamilies/
4. **GET** ```http://localhost:5000/api/schemes/openEndedSchemes?mutual_fund_family=Axis Mutual Fund```: Get the list of all open ended schemes for a given fund family (in this case for Axis Mutual Fund).
5. **POST** ```http://localhost:5000/api/portfolio/add``` : Add an investment for a user for a given scheme. The JWT token obtained from the /login endpoint should be added in authentication header here, otherwise it should give an authentication error with status code of 401. In postman, in authorization, select auth token as bearer type and paste the jwt token. Body:
   ```
   {
         "scheme_code": 141590,
         "scheme_name": "Axis Corporate Bond Fund - Direct Plan - Monthly IDCW",
         "purchase_date": "05-Dec-2024",
         "units_held": 10
   }
   ```
7. **GET** ```http://localhost:5000/api/portfolio/``` : Get the current portfolio of the logged in user which shows all his/her investments, units purchased etc. The JWT token obtained from the /login endpoint should be added in authentication header here, otherwise it should give an authentication error with status code of 401. In postman, in authorization, select auth token as bearer type and paste the jwt token.
