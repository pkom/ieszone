import { Get, Param, ParseUUIDPipe, Res } from '@nestjs/common';
import {
  Controller,
  UseGuards,
  Post,
  Inject,
  ClassSerializerInterceptor,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { Logger } from 'winston';
import { UsersService } from '../users/users.service';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { UserRole } from '../../enums';
import { Roles } from '../../shared/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

const name = 'users';
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags(name)
@Controller('users')
export class UsersController {
  SERVER_URL = 'http://localhost:3000/';

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly usersService: UsersService,
  ) {}

  @ApiBearerAuth()
  @Post(':userid/avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'User avatar has been succesully updated',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators are allowed to upload avatars',
  })
  @ApiForbiddenResponse({
    description: 'Only administrators are allowed to upload avatars',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './avatars',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  public uploadAvatar(
    @Param('userid', ParseUUIDPipe) userId: string,
    @UploadedFile() file,
  ) {
    this.usersService.setAvatar(userId, `${this.SERVER_URL}${file.path}`);
  }

  @Get('avatars/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'avatars' });
  }
}
