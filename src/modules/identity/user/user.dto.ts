import { PageAndSort } from "src/common"
import { User } from "src/prisma"

export class UserDto {
  id: string
  nickname: string | null
  bio: string | null

  constructor(u: User) {
    this.id = u.id
    this.nickname = u.nickname
    this.bio = u.bio
  }
}

export class GetUserListInput extends PageAndSort{
  /**
   * Search query
   * @example John
   */
  q : string | null
}

export class UpdateUserInput {
  /**
   * Nickname
   * @example John Doe
   */
  nickname?: string | null
  /**
   * Bio
   * @example I'm a developer
   * @example I'm a designer
   */ 
  bio?: string | null
}

export function mapToUser(input: UpdateUserInput, user: User) {
  if (input.nickname !== undefined) {
    user.nickname = input.nickname
  }
  if (input.bio !== undefined) {
    user.bio = input.bio
  }
  return user
}