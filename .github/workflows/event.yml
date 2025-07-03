name: context test
on: [pull_request, push]

jobs:
  exercise2_2_pull_request:
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
