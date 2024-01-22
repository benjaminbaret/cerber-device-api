import { Test } from '@nestjs/testing'; 
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';
import { testPreConditions } from './tools/testPreConditions';
import { EditDeviceStatusDto, EditDeviceProgressDto } from '../src/device/dto';

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

    /*---------------------------------*/
    /*----------    Auth    -----------*/
    /*---------------------------------*/

    describe('Auth', () => {

    let dto: AuthDto = {
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
          .stores('deviceAt', 'access_token');
      });
    });
  });



    /*---------------------------------*/
    /*----------   Device   -----------*/
    /*---------------------------------*/


  describe('Device', () => {

    const dto: EditDeviceStatusDto = {
      status: 'connected'
    }

    describe('Edit Status', () => {

      it('should throw if no token provided', () => {
        return pactum
          .spec()
          .patch(
            '/device/status', 
          )
          .withBody({
            status: dto.status,
          })
          .expectStatus(401);
      });

      it('should throw if no body provided', () => {
        return pactum
        .spec()
        .patch(
          '/device/status', 
        )
        .expectStatus(401);
      });

      it('should set device status', () => {
        return pactum
          .spec()
          .patch(
            '/device/status', 
          )
          .withHeaders({
            Authorization: 'Bearer $S{deviceAt}',
          })  
          .withBody({
            status: dto.status,
          })
          .expectStatus(200);
      });      
    });

    describe('Edit Status', () => {
      
      const dto: EditDeviceProgressDto = {
        updateProgress: 90,
      }

      it('should throw if no token provided', () => {
        return pactum
          .spec()
          .patch(
            '/device/progress', 
          )
          .withBody({
            updateProgress: dto.updateProgress,
          })
          .expectStatus(401);
      });

      it('should throw if no body provided', () => {
        return pactum
        .spec()
        .patch(
          '/device/progress', 
        )
        .expectStatus(401);
      });

      it('should throw if bad dto is received', () => {
        return pactum
          .spec()
          .patch(
            '/device/progress', 
          )
          .withHeaders({
            Authorization: 'Bearer $S{deviceAt}',
          })  
          .withBody({
            status: dto.updateProgress,
          })
          .expectStatus(400);
      });   


      it('should set device status', () => {
        let pactumResult = pactum
          .spec()
          .patch(
            '/device/progress', 
          )
          .withHeaders({
            Authorization: 'Bearer $S{deviceAt}',
          })  
          .withBody({
            updateProgress: dto.updateProgress,
          })
          .expectStatus(200);
          })
      });   

    });

    describe('Get bundle on local machine', () => {

      // pre conditions

      it('should throw if no token provided', () => {
      return pactum
      .spec()
      .get(
        '/device/update/next', 
      )
      .expectStatus(401)
      });

      it('should signin', () => {

        let anotherDto: AuthDto = {
          signature: 'anotherSignature', 
          password: 'password',
        }

        return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          signature: 'anotherSignature',
          password: 'password',
        })
        .expectStatus(200)
        .stores('anotherDeviceAt', 'access_token');
      });

    

      it('should send empty body because no update available for the device', () => {

        return pactum
        .spec()
        .get(
          '/device/update/next', 
        )
        .expectStatus(200)
        .withHeaders({
            Authorization: 'Bearer $S{anotherDeviceAt}', // the device that have a pending update
          })
        .expectBodyContains('')
      });

        it('should send update information', () => {
          return pactum
          .spec()
          .get(
            '/device/update/next', 
          )
          .expectStatus(200)
          .withHeaders({
            Authorization: 'Bearer $S{deviceAt}', // the device that have a pending update
          })
          .expectBody({
            name: "Raspberry udpate 1",
            url: "https://example.com",
            size: "100",
          })
        });
      });
    });
