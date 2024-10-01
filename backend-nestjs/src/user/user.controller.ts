import { Controller } from '@nestjs/common';
import { Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  getAllUsers(@Body() dto: any) {
    return this.userService.getAllUsers(dto);
  }

  @Post('follow')
  followUser(@Body() dto: any) {
    return this.userService.followUser(dto.emailA, dto.emailB);
  }
}
