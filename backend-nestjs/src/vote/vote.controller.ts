import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteDTO } from './dto';

@Controller('api/vote')
export class VoteController {
  constructor(private voteService: VoteService) {}

  @Post()
  voteCategory(@Body() dto: VoteDTO) {
    return this.voteService.voteCategoy(dto);
  }

  @Post('checked')
  checkVoted(@Body() dto: any) {
    return this.voteService.getUserVoted(dto);
  }
}
