# 베이스 이미지
FROM node:20

# 작업 디렉토리 생성
WORKDIR /usr/src/app

# 의존성 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 서버 파일 복사
COPY . . 

# 컨테이너 실행 시 명령
CMD ["npm", "start"]
