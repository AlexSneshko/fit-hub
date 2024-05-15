import { Gym, Post, User } from "@prisma/client";

export type PostWithUserAuthor = Post & {
    authorUser: User | null;
};
export type PostWithGymAuthor = Post & {
    authorGym: Gym | null;
};

export type PostWithAuthor = PostWithUserAuthor | PostWithGymAuthor;