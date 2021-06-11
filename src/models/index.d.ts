import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Comment {
  readonly id: string;
  readonly comment: string;
  readonly likes: number;
  readonly dislikes: number;
  readonly replies: number;
  readonly videoID?: string;
  readonly User?: User;
  readonly Video?: Video;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Comment>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment>) => MutableModel<Comment> | void): Comment;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly image?: string;
  readonly subscribers?: number;
  readonly Videos?: (Video | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class Video {
  readonly id: string;
  readonly title: string;
  readonly thumbnail: string;
  readonly videoUrl: string;
  readonly duration: number;
  readonly views: number;
  readonly tags?: string;
  readonly likes: number;
  readonly dislikes: string;
  readonly User?: User;
  readonly Comments?: (Comment | null)[];
  readonly userID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Video>);
  static copyOf(source: Video, mutator: (draft: MutableModel<Video>) => MutableModel<Video> | void): Video;
}