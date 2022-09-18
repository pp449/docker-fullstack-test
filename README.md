# 목적
### - Docker 공부를 해보며 CI/CD환경을 구축해보는 경험
### - 다양한 AWS기능 사용 경험 (EB와 RDS를 VPC로 묶는 등)
### - CI platform의 동작원리 이해
<br />

# 사용된 기술들
### Frontend: React
### Backend: Nodejs
### Database: Mysql
<br />

### AWS: EB(Elastic Beanstalk), RDS
### CI platform: travis
### Web Service, Proxy: nginx
### etc: docker, docker-compose
<br />

# client가 request 요청 시 동작 방법
![image](https://user-images.githubusercontent.com/71641127/190892701-5ef28d52-dca9-46b3-b00c-463442031ca9.png)
1. 먼저 80번 포트 nginx로 요청이 온다
2. url이 /api로 시작하면 5000번 포트 백엔드 서버로 요청을 보내준다
3. url이 /api를 제외하고 나머지 경로의 경우 3000번 포트 프론트엔드 서버로 요청을 보내준다
4. frontend에 요청 시 미리 빌드된 파일들이 nginx를 통해 client에게 화면을 보여준다
<br /><br />

# 배포되는 순서
1. github에 master branch가 push되면 travis에서 .travis.yml의 설정에 따라 수행<br />
    ### .travis.yml 수행내용
        1-1. frontend의 test를 실행해봄(실패 시 더이상 진행 X)
        1-2. test성공 시 도커 허브에 frontend, backend, nginx 이미지를 등록
        1-3. Elastic Beanstalk실행
2. Elastic Beanstalk에서 docker-compose.yml파일의 설정대로 실행
3. frontend, backend, nginx 이미지를 도커 허브에서 불러와서 실행
4. 배포완료!
<br />

# TIP
- backend에서 RDS접근하기 위해 DB에 연결 시 변수값은
EB 환경변수 => docker-compose.yml 횐경변수 => db.js로 이동하여 보안성을 높인다