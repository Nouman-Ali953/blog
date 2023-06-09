import { mongoose } from "mongoose";

const Connect = async (URL) => {
  mongoose.set('strictQuery', false);
  await new mongoose.connect(URL, { useNewUrlParser: true })
    .then(() => {
      console.log(`Database successfully connected 👍`);
    })
    .catch((err) => {
      console.log(`Error while connecting to database`,err);
    });
};
export default Connect;