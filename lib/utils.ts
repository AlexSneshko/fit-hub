import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNowStrict } from 'date-fns'
import locale from 'date-fns/locale/en-US'
import { Gym, User } from "@prisma/client";

import { AuthorWithProfileInfo } from "@/types/author";
import { UserAuthorWithProfileInfo, UserWithSubsribers } from "@/types/user-author";
import { GymAuthorWithProfileInfo, GymWithSubscribers } from "@/types/gym-author";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isAuthorUser(author: AuthorWithProfileInfo): author is UserAuthorWithProfileInfo {
  return (author as UserAuthorWithProfileInfo).surname !== null;
}

export function isAuthorGym(author: AuthorWithProfileInfo): author is GymAuthorWithProfileInfo {
  return (author as GymAuthorWithProfileInfo).gymOpenTime !== null;
}

export function isUser(author: User | Gym): author is User {
  return (author as User).surname !== undefined;
}

export function isUserSubcribed(profile: UserWithSubsribers | GymWithSubscribers, targetUser: string) {
  return profile.subscribers.some(({ subscriberId }) => subscriberId === targetUser);
};

const formatDistanceLocale = {
  lessThanXSeconds: 'just now',
  xSeconds: 'just now',
  halfAMinute: 'just now',
  lessThanXMinutes: '{{count}}m',
  xMinutes: '{{count}}m',
  aboutXHours: '{{count}}h',
  xHours: '{{count}}h',
  xDays: '{{count}}d',
  aboutXWeeks: '{{count}}w',
  xWeeks: '{{count}}w',
  aboutXMonths: '{{count}}m',
  xMonths: '{{count}}m',
  aboutXYears: '{{count}}y',
  xYears: '{{count}}y',
  overXYears: '{{count}}y',
  almostXYears: '{{count}}y',
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace('{{count}}', count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result
    } else {
      if (result === 'just now') return result
      return result + ' ago'
    }
  }

  return result
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  })
}