# 이름을 정해준다.
# 이벤트를 지정해준다. : on
name: basic ci
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  # job의 시작
  ci:
    # 실행환경 설정
    runs-on: ubuntu-latest
    # 단계설정
    steps:
      # 레퍼지토리의 코드를 가져오는것
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup NodeJs
        uses: actions/setup-node@v4
        with:
          node-version: "22"

      # package Lock 의존성 설치
      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test

      - name: build project
        run: npm run build
