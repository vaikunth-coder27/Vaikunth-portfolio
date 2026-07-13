// Serverless-safe MongoDB connection. Caches the client on globalThis so warm
// Lambda/Vercel invocations reuse one pooled connection instead of reconnecting.
// Everything is fail-safe: if the URI is missing or the connection fails, getDb()
// returns null and callers degrade gracefully (the chat keeps working, unlogged).

import { MongoClient, type Db } from 'mongodb'

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || 'portfolio_chat'

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

let warned = false

export async function getDb(): Promise<Db | null> {
  if (!uri) {
    if (!warned) {
      console.warn('MONGODB_URI not set — chat logging/compaction disabled.')
      warned = true
    }
    return null
  }
  try {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, {
        maxPoolSize: 5,
        serverSelectionTimeoutMS: 5000,
      })
      global._mongoClientPromise = client.connect()
    }
    const client = await global._mongoClientPromise
    return client.db(dbName)
  } catch (err) {
    console.error('Mongo connection failed:', err)
    global._mongoClientPromise = undefined
    return null
  }
}
