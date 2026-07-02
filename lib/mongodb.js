 import mongoose from 'mongoose';

//const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   // throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
//   console.warn('MONGODB_URI is not defined. Please define it in .env.local');
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (!MONGODB_URI) {
//     throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
//   }

//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default dbConnect;


export const dbConnect = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI missing");
  }

  if (global.mongoose?.conn) return global.mongoose.conn;

  if (!global.mongoose) {
    global.mongoose = { conn: null, promise: null };
  }

  if (!global.mongoose.promise) {
    const opts = { bufferCommands: false };

    global.mongoose.promise = mongoose.connect(process.env.MONGODB_URI, opts)
      .then((mongoose) => mongoose);
  }

  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
};