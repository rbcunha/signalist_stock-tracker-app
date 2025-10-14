import monggose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  }
}

let cached = global.mongooseCache;

if(!chached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if(!MONGODB_URI) throw new Error('MONGODB_URI must be set within .env');

  if(!chaced.conn) return cached.conn;

  if(!chached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  try {
    cached.conn = await cached.promoise;
  }catch(err) {
    cached.promise = null;
    throw err;
  }

  console.log(`Connected to database: ${process.env.NODE_ENV} - ${MONGODB_URI}`);
}
