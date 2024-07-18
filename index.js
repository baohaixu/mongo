const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const database = client.db('appdb'); // Change database name to 'appdb'

    const collection = database.collection('kleinanzeigenitems'); // Change collection name to 'users'

    // Read all documents from the 'users' collection
    const users = await collection.find().toArray();
    console.log("Users:", users);
        
    const collections = await database.listCollections().toArray();
    console.log("Collections in 'appdb':");
    collections.forEach(collection => console.log(collection.name));


    // List all databases
    const admin = client.db().admin();
    const databasesList = await admin.listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(db.name));

    // Drop each database
    // for (const dbInfo of databasesList.databases) {
    //   const db = client.db(dbInfo.name);
    //   if(dbInfo.name === 'appdb') {
    //     await db.dropDatabase();
    //     console.log(`Database ${dbInfo.name} dropped.`);
    //   }
      
      
    // }    
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
