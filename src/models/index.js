// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Comment, User, Video } = initSchema(schema);

export {
  Comment,
  User,
  Video
};