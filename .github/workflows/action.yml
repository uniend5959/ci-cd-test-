# yml을 자주 쓰는 확장자
# key / value 형식으로 이루어져있음
# tabdmfh rnqnsgka
# 워크플로우 -> 자동화 할 작업의 설계서  --> action.yml 그 자체
# jobs :  작업 단위 ( 테스트 시켜줘, 빌드시켜줘, 이슈 닫아줘 )
# 워크플로우 > job이란작업단위가 있음
# 실행환경 : git 회사의 가상 환경 , 내 코드를 git은 모름
# step: job > step 이 포함되어있음
# job(작업단위)가 실행되기 위해서 완수해야할 단계(step)
# 1. 코드를 colone
# 2. npm i
# 3. npm start?

name: first workflow
on: push
jobs:
  # job의 이름

  lint:
    runs-on: ubuntu-latest
    steps:
      - name: chekout code
        uses: actions/checkout@v4

      - name: install nodeJs
        uses: actions/setup-node@v4
        with:
          node-version: "22"

      - name: install dependencies
        run: npm ci

      - name: run lint
        run: npm run lint

  test:
    runs-on: ubuntu-latest
    steps:
      - name: checkoust code
        uses: actions/checkout@v4

      - name: install nodeJs
        uses: actions/setup-node@v4
        with:
          node-version: "22"

      - name: install dependencies
        run: npm ci

      - name: run test
        run: npm run test

  # lint 가 성공해야 build가 실행하게 해야한다면  needs 사용
  build:
    runs-on: ubuntu-latest
    # 이러한 작업을 build에 의존성 추가라 한다.
    # 단일 선행 작업 : needs :  job이름
    # 복수 선행 작업 : needs : [ job 이름, job 이름, ...]
    needs: [lint, test] # build 이전에 lint job이 선행되야함 # lint가 성공해야 build가 순차적으로 시작할수 있음
    steps:
      - name: hello world
        run: echo 'hello wold' #cli 명령어,   echo : 리눅스 명령, 변수출력 하는 역할, 리눅스 명령어 쓸때는 run

      # uses: npm install, import, require처럼, "미리 만들어진 기능을 가져와서 사용하겠다"
      # Action(도구)들이 있습니다. 코드를 압축하는 도구, 클라우드에 배포하는 도구, 슬랙으로 알림을 보내는 도구
      # 'actions/checkout@v4'는 GitHub에서 공식적으로 제공하는 'checkout'이라는 Action의 4버전을 사용하겠다는 뜻입니다
      #  그 중 checkout 은 현재 워크플로우가 실행되고 있는 레포지토리의 소스 코드를 가상 머신으로 복제(git clone)하는 것
      # 내 레포지토리 코드가 워크플로우 실행 환경에 다운로드 되는것
      - name: Checkout Code
        uses: actions/checkout@v4 # actions : 재사용 가능한, 반복되는 작업들을 npm처럼

      - name: install nodeJs
        uses: actions/setup-node@v4
        with:
          node-version: "22"

      # package-lock.json 파일을 기반으로 프로젝트 의존성(dependency)들을 빠르고 안정적으로 설치하는 단계입니다.
      # 'deps'는 'dependencies'(의존성)의 줄임말
      - name: install deps
        run: npm ci # ci

      - name: run build
        run: npm run build
