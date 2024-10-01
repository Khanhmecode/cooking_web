import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDTO, CommentDTO } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService
  ) {}

  async getAllCategories() {
    const data = this.prisma.category.findMany();

    return data;
  }

  async upComment(comment: CommentDTO) {
    const categoryId = typeof comment.categoryId === 'string' ? parseInt(comment.categoryId) : comment.categoryId;

    const userComment = await this.prisma.user.findUnique({
      where: {
        email: comment.email
      }
    });

    const newComment = await this.prisma.comment.create({
      data: {
        content: comment.content,
        categoryId: categoryId,
        userId: userComment.id
      }
    });

    const updateCategoryComment = await this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        comments: {
          connect: {
            id: newComment.id
          }
        }
      }
    });

    return {
      message: 'Comment successful',
      newComment
    }
  }

  async getCategory(params: any) {
    const id: number = parseInt(params.id);

    const category = await this.prisma.category.findUnique({
      where: {
        id: id
      }
    });

    const userUpPost = await this.prisma.user.findUnique({
      where: {
        id: category.userId
      },
      select: {
        id: true,
        email: true,
        userName: true
      }
    });

    const commentRaw = await this.prisma.comment.findMany({
      where: {
        categoryId: id
      },
      select: {
        content: true,
        createdAt: true,
        userId: true
      }
    });

    const comment = await Promise.all(commentRaw.map(async (item: any) => {
      const user = await this.prisma.user.findUnique({
        where: {
          id: item.userId
        }
      });
    
      // Return a new object with the userName added
      return {
        ...item,
        userName: user?.userName // Handle potential null or undefined user
      };
    }));

    return {
      category,
      userUpPost,
      comment
    };
  }

  async createPost(dto: CategoryDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })

    const newCategory = await this.prisma.category.create({
      data: {
        title: dto.title,
        description: dto.description,
        thumbnail: dto.thumbnail || '',
        userId: user.id,
      }
    });

    const updateUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        categories: {
          connect: { id: newCategory.id },
        }
      }
    })

    return {
      result: true,
      message: 'Created new post!',
      newCategory
    }
  }
}
