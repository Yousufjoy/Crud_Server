/**
 * --------------------
 * MongoDB connection
 * ---------------------
 * 1. Create Account
 * 2. Create user with password
 * 3. whitelist IP Address
 * 4. database > connect > driver > Node > View full code
 * 5. Change the password in the UI
 *
 * --------------------------
 * Server side (CREATE)
 * ---------------------------
 *
 * 1. CREATE --- POST
 * 2. app.post('/users'/ async(req,res)=>{})
 * 3. Make the function async to use await inside it
 * 4. Make sure you use the express.json() middleWare
 * 5. access data from the body: const user = req.body
 * 6. const result = await userCollection.insertOne(user)
 * 7. res.send(result)
 *
 * --------------------------
 * Client side (CREATE)
 * ---------------------------
 * 1. create fetch
 * 2. add second parameter as an object
 * 3. provide method: "POST"
 * 4. add headers : {'content-type': 'application/json'}
 * 5. add body: JSON.Stringify (user)
 *
 *  --------------------------
 * READ MANY
 * ---------------------------
 *
 * 1. create a cursor = userCollection
 * 2. const result = await cursor.toArray()
 *
 *
 * --------------------------
 * DELETE SERVER
 * ---------------------------
 *
 * 1. create app.delete('/users/:id', async(req,res)=>{})
 * 2. specify unique ObjectId to delete the right user
 * 3. const query = {_id: new ObjectId(id)}
 * 4. const result = await userCollection.deleteOne(query);
 *
 * --------------------------
 * DELETE CLient
 * ---------------------------
 * 1. create dynamic url with id
 * 2. mention the delete method
 *
 *
 */
