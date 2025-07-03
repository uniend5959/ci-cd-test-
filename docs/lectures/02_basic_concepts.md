# 02. GitHub Actions 기본 개념과 워크플로우 문법

## 학습 목표

- Workflow, Job, Step의 개념 이해
- Runner와 실행 환경 파악
- Events와 Triggers 이해
- YAML 문법과 워크플로우 파일 구조 파악
- 조건문과 표현식 사용법 학습

## 주요 개념

### 1. Workflow (워크플로우)

- GitHub Actions의 최상위 단위
- `.github/workflows/` 디렉토리에 YAML 파일로 정의
- 하나의 저장소에 여러 워크플로우 가능

### 2. Job (작업)

- 워크플로우 내의 독립적인 실행 단위
- 순차 또는 병렬 실행 가능
- 각 Job은 별도의 러너에서 실행

### 3. Step (단계)

- Job 내의 개별 작업 단위
- 순차적으로 실행
- Action 또는 Shell 명령어로 구성

### 4. Runner (러너)

- 워크플로우를 실행하는 서버
- **GitHub-hosted runners**: GitHub에서 제공
- **Self-hosted runners**: 직접 호스팅

### 5. Action (액션)

- 재사용 가능한 작업 단위
- Marketplace에서 공유
- JavaScript, Docker, Composite 액션 지원

## 워크플로우 파일 구조

### 기본 구조

```yaml
name: 워크플로우 이름
on: 이벤트
env: 환경변수
jobs: 작업들
```

### YAML 기본 문법

```yaml
# 주석
key: value
list:
  - item1
  - item2
nested:
  key: value
```

## 주요 섹션

### 1. name

워크플로우의 이름을 정의

```yaml
name: My First Workflow
```

### 2. on

워크플로우를 트리거할 이벤트 정의

```yaml
# 단일 이벤트
on: push

# 여러 이벤트
on: [push, pull_request]

# 특정 브랜치
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
```

### 3. env

전역 환경변수 설정

```yaml
env:
  NODE_ENV: production
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### 4. jobs

실행할 작업들 정의

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - name: Step 1
        run: echo "Hello"

  job2:
    needs: job1 # job1 완료 후 실행
    runs-on: ubuntu-latest
    steps:
      - name: Step 2
        run: echo "World"
```

## 기본 구조 예시

```yaml
name: Basic Workflow
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test
```

## 조건문과 표현식

### 1. 조건부 실행

```yaml
- name: Conditional step
  if: github.ref == 'refs/heads/main'
  run: echo "Only on main branch"
```

### 2. 컨텍스트 사용

```yaml
- name: Use context
  run: |
    echo "Repository: ${{ github.repository }}"
    echo "Branch: ${{ github.ref_name }}"
    echo "Actor: ${{ github.actor }}"
```

### 3. 환경변수

```yaml
- name: Use environment variables
  run: |
    echo "NODE_ENV: ${{ env.NODE_ENV }}"
    echo "Custom var: ${{ vars.CUSTOM_VARIABLE }}"
```

## 실행 흐름

1. **Event 발생** → 2. **Workflow 트리거** → 3. **Job 실행** → 4. **Step 실행** → 5. **Action 실행**

## 자주 사용하는 이벤트

### 1. push

- 코드가 브랜치에 푸시될 때 실행
- 가장 일반적인 CI/CD 트리거

### 2. pull_request

- Pull Request가 생성, 업데이트, 병합될 때 실행
- 코드 리뷰와 테스트에 유용

### 3. workflow_dispatch

- 수동으로 워크플로우 실행
- 배포나 특별한 작업에 사용

### 4. schedule

- 정해진 시간에 자동 실행
- 정기적인 백업이나 유지보수에 사용

## 실습 예제

다음 강의에서 실제 워크플로우를 작성해보겠습니다.
