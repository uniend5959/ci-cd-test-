name: example yml
# git 의 액션을 정하기
on:
  push: # 푸쉬 액션 등록
    paths: "src/**" # src의 경로 안에 있는거를 수정했을때만 push 액션발동
  pull_request: # pr 액션 등록
    branches: [main, dev] # 해당 브런치에만 pr 액션작동
    types: [opened, synchronize, closed] # pr이 열릴때, pr에 새 커밋 추가 될때 / pr이 닫힐떄 작동
  workflow_dispatch: # 수동 작업
jobs: #작업 정의
  # 개별작업 정의
  echo: # 실행단위 정의
    runs-on: ubuntu-latest
    steps:
      - name: 전역변수처럼 사용가능한 ropo에 대한 정보 객체 불러오기
        run: echo '${{ toJson(github)}}'

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

  #브런치 별로 실행사항 정하기
  branch:
    runs-on: ubuntu-latest
    steps:
      - name: main 동작
        if: github.ref_name == 'main'
        run: echo 'Production 배포 준비'

      - name: develop
        if: github.ref_name == 'develop'
        run: echo 'Staging 배포 준비'

      - name: feature
        if: github.ref_name == 'feature'
        run: echo 'Feature 테스트 준비'

  pull_request:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - name: checkout code
        uses: actions/checkout@v4

      - name: install depencies
        run: npm ci

      - name: PR이 열릴때
        if: github.event.action == 'opened'
        run: npm run test

      - name: PR에 새로운 커밋이 푸쉬됐을때
        if: github.event.action == 'synchronize'
        run: npm run test

      - name: PR이 닫힐때
        if: github.event.action == 'closed'
        run: echo '임시 파일 삭제...'

  exercise2_4_feat:
    if: startsWith(github.ref_name,'feat/')
    runs-on: ubuntu-latest
    steps:
      - name: checkout code
        uses: actions/checkout@v4

      - name: install depencies
        run: npm ci

      - name: Run test
        run: npm run test

  exercise2_4_develop:
    if: github.ref_name == 'develop'
    runs-on: ubuntu-latest
    steps:
      - name: checkout code
        uses: actions/checkout@v4

      - name: install depencies
        run: npm ci

      - name: Run test
        run: npm run test

      - name: build
        run: npm run build

      - name: Staging
        run: echo "Staging deploy..."

  exercise2_4_main:
    if: github.ref_name == 'main'
    runs-on: ubuntu-latest
    steps:
      - name: checkout code
        uses: actions/checkout@v4

      - name: install depencies
        run: npm ci

      - name: feat/* 브랜치는 테스트만 실행
        run: npm run test

      - name: build
        run: npm run build

      - name: Production
        run: echo "Production deploy..."
