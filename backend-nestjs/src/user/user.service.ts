import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(dto: any) {
    const users = await this.prisma.user.findMany({
      where: {
        NOT: {
          email: dto.email
        }
      },
      select: {        
        email: true,
        userName: true,
        following: true,
        followedBy: true
      }
    });

    const currentUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      },      
      include: {
        followedBy: true,
        following: true
      }
    });

    return {
      users,
      currentUser
    };
  }

  async followUser(emailA: string, emailB: string) {
    const updateUserA = await this.prisma.user.update({
      where: {
        email: emailA
      },
      data: {
        following: {
          connect: {
            email: emailB
          }
        }
      },
      include: {
        followedBy: true,
        following: true
      }
    });

    const updateUserB = await this.prisma.user.update({
      where: {
        email: emailB
      },
      data: {
        followedBy: {
          connect: {
            email: emailA
          }
        }
      },
      include: {
        followedBy: true,
        following: true
      }
    });

    return {
      updateUserA,
      updateUserB
    };
  }
}
