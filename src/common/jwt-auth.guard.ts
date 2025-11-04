import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new UnauthorizedException('تۆکنەکە نادروستە یان بەسەرچووە. تکایە دووبارە بچۆرەوە ژوورەوە');
    }
    return user;
  }
}

// ✅ Enables @UseGuards(JwtAuthGuard) for protecting REST API endpoints.
