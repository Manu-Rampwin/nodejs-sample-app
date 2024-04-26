# book crud operations

# steps to start the server
-> copy this repo
-> run command=> npm i
-> create a .env file=> copy the env-data from the email recieved and paste it into this new env file, save this
-> create a mongoose atlas database online, and change the DB_URL in env file
-> now open terminal and run command=> npm run start
-> by this the server will start
-> now you have to test the apis, so open the postman apis collection by the postmanLink recieved in the mail
-> now first register then login
-> now test the apis like addBook, getBook, updateBook, deleteBook

# how to test apis (all the apis are required jwt token in headers) 
-> addBook=> simply change book data in body
-> getBook=> here you can get all the books , 
Also you can add pageNumber, limit, searchQuery(author or title) in params into this api to get the filtered records 
To get filter records you can put author's-Email or book's-PublicationYear or book's-Title into searchQuery inside queryparams
ALso to get the limited records you can start with like: 
page=0, limit=3 this will give first 3 records
page=0, limit=10 this will give first 10 records
page=1, limit=4 this will skip first {{page*limit}} records i.e 4 and will give rest 4 records
page=2, limit=3 this will skip first {{page*limit}} records i.e 6 and will give rest 3 records
If you don't give anything then it will give all the records
If you only provides searchQuery then it will all the records matching with the searchQuery
-> updateBook=> you have to pass bookId which is objectId of that book and payload in body to update
-> deleteBook=> you have to pass bookId which is objectId of that book to delete