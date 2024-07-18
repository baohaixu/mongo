const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const admin = client.db().admin();
    const databasesList = await admin.listDatabases();

    console.log("Databases:");
    for (const dbInfo of databasesList.databases) {
      const database = client.db(dbInfo.name);
      const collections = await database.listCollections().toArray();

      console.log("Collections in " + database.databaseName);
      for (const col of collections) {
        const collection = database.collection(col.name);
        const data = await collection.find().toArray();
        if (database.databaseName === 'READ__ME_TO_RECOVER_YOUR_DATA') {
          console.log(col.name, data);
        }
      }
    }

    // Drop each database
    // for (const dbInfo of databasesList.databases) {
    //   const db = client.db(dbInfo.name);
    //   if (dbInfo.name === 'appdb') {
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
