import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VoteDTO } from './dto';

@Injectable()
export class VoteService {
  constructor(private prisma: PrismaService) {}

  async voteCategoy(dto: VoteDTO) {
    const categoryId: number = typeof dto.categoryId === 'string' ? parseInt(dto.categoryId) : dto.categoryId;

    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const existedVote = await this.prisma.vote.findFirst({
      where: {
        userId: user.id,
        categoryId: categoryId
      }
    });

    if(!existedVote) {
      const newVote = await this.prisma.vote.create({
        data: {
          userId: user.id,
          categoryId: categoryId,
          type: dto.type
        }
      });
  
      return newVote;
    } else {
      const updateVote = await this.prisma.vote.update({
        where: {
          userId_categoryId: {
            userId: user.id,
            categoryId: categoryId
          }          
        },
        data: {
          type: dto.type
        }
      });

      return updateVote;
    }    
  }

  async getUserVoted(dto: any) {
    const categoryId: number = typeof dto.categoryId === 'string' ? parseInt(dto.categoryId) : dto.categoryId;

    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      },
    });

    const voted = await this.prisma.vote.findFirst({
      where: {
        userId: user.id,
        categoryId: categoryId
      }
    });

    const isVoted = voted ? voted.type : 'none';

    return {
      isVoted: isVoted
    };
  }
}
