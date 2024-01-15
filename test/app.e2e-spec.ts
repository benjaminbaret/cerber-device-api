import { Test } from '@nestjs/testing'; 
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';
import { testPreConditions } from './tools/testPreConditions';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  // starting logic
  beforeAll(async () => {
    const moduleRef = 
      await Test.createTestingModule({
        imports:[AppModule],
      }).compile();

      app = moduleRef.createNestApplication(); // emulate an app
      app.useGlobalPipes(
          new ValidationPipe({whitelist: true,
      }), 
      );

      await app.init(); // start the server
      await app.listen(3333);
    
      prisma = app.get(PrismaService);

      await prisma.cleanDb();
      await testPreConditions();
      



      pactum.request.setBaseUrl('http://localhost:3333');
    });

    // tear down logic
    afterAll(() => {
      app.close(); 
    });

  describe('Auth', () => {

    const dto: AuthDto = {
      signature: 'signature', 
      password: 'password',
    }

    describe('Signin', () => {

      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post(
            '/auth/signin', 
          ).withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post(
            '/auth/signin', 
          ).withBody({
            password: dto.signature,
          })
          .expectStatus(400);
      });

      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post(
            '/auth/signin', 
          ).withBody({
          
          })
          .expectStatus(400);
      });

      it('Should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto) 
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });
});