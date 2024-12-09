How to set up locally: 

1. Clone the repository.
2. Create a mongodb database cluster (atlas recommended): Copy and paste the link to connect to mongoDB cluster in the env file in MONGO_URI variable.
3. Generate a jwt token (jwt.io) and paste in the env file for JWT_SECRET variable
4. Get your RapidAPI key and paste it in the env file (this can be found here once you have the rapid api latest mutual fund nav api: https://rapidapi.com/suneetk92/api/latest-mutual-fund-nav/playground)
5. Run npm start from the mutual-fund-app directory.
6. All of the below APIs could be tested and used by POSTMAN or curl commands. 

Endpoints:

1. **POST** ```/api/auth/register``` : To register a new user to the platform, body: 
   ```
   {
      "email": "testuser2@example.com",
      "password": "password123"
   }
   ```
2. **POST** ```/api/auth/login``` : To login to an existing account by providing correct email and password. Body:
   ```
   {
      "email": "testuser2@example.com",
      "password": "password123"
   }
   ```
3. **GET** ```/api/fundFamilies/``` : Get list of all fund families after user has logged in. The purpose of this endpoint is to allow user to be able to select one of the fund families. Request : /api/fundFamilies/
4. **GET** ```/api/schemes/openEndedSchemes```: Get the list of all open ended schemes for a given fund family.
5. **POST** ```/api/portfolio/add``` : Add an investment for a user for a given scheme. Body:
   ```
   {
         "scheme_code": 141590,
         "scheme_name": "Axis Corporate Bond Fund - Direct Plan - Monthly IDCW",
         "purchase_date": "05-Dec-2024",
         "units_held": 10
   }
   ```
7. **GET** ```/api/portfolio/``` : Get the current portfolio of the logged in user which shows all his/her investments, units purchased etc.
