# 04. Environment Variables in GitHub Actions

## 개요

GitHub Actions에서 환경 변수를 사용하는 방법을 학습합니다. 환경 변수는 워크플로우에서 설정을 관리하고 민감한 정보를 안전하게 처리하는 데 필수적입니다.

## 목차

1. [환경 변수의 개념](#환경-변수의-개념)
2. [GitHub Actions 기본 환경 변수](#github-actions-기본-환경-변수)
3. [커스텀 환경 변수 설정](#커스텀-환경-변수-설정)
4. [GitHub Secrets 사용](#github-secrets-사용)
5. [조건부 환경 변수](#조건부-환경-변수)
6. [실습 예제](#실습-예제)

## 환경 변수의 개념

### 환경 변수란?

환경 변수는 운영 체제나 애플리케이션에서 사용하는 동적 값으로, 프로그램 실행 중에 설정할 수 있는 변수입니다.

### GitHub Actions에서 환경 변수의 역할

- **설정 관리**: 애플리케이션 설정을 코드와 분리
- **보안**: 민감한 정보를 안전하게 관리
- **유연성**: 환경별로 다른 설정 적용
- **재사용성**: 공통 설정을 여러 작업에서 재사용

## GitHub Actions 기본 환경 변수

GitHub Actions는 자동으로 제공하는 기본 환경 변수들이 있습니다.

### 주요 기본 환경 변수

| 변수명              | 설명                         | 예시                   |
| ------------------- | ---------------------------- | ---------------------- |
| `GITHUB_REPOSITORY` | 저장소 이름                  | `owner/repo-name`      |
| `GITHUB_SHA`        | 커밋 SHA                     | `a1b2c3d4e5f6...`      |
| `GITHUB_REF`        | 브랜치 또는 태그 참조        | `refs/heads/main`      |
| `GITHUB_EVENT_NAME` | 워크플로우를 트리거한 이벤트 | `push`, `pull_request` |
| `GITHUB_ACTOR`      | 워크플로우를 실행한 사용자   | `username`             |
| `GITHUB_WORKFLOW`   | 워크플로우 이름              | `CI/CD Pipeline`       |
| `GITHUB_RUN_ID`     | 실행 ID                      | `1234567890`           |
| `GITHUB_RUN_NUMBER` | 실행 번호                    | `42`                   |

### GitHub Context 사용

```yaml
- name: Display context variables
  run: |
    echo "Repository: ${{ github.repository }}"
    echo "SHA: ${{ github.sha }}"
    echo "Ref: ${{ github.ref }}"
```

## 커스텀 환경 변수 설정

### 1. 워크플로우 레벨 환경 변수

워크플로우 전체에서 사용할 수 있는 환경 변수를 설정합니다.

```yaml
name: My Workflow

env:
  APP_NAME: "my-application"
  VERSION: "1.0.0"
  NODE_ENV: "production"

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Use workflow env vars
        run: |
          echo "App: ${{ env.APP_NAME }}"
          echo "Version: ${{ env.VERSION }}"
```

### 2. 작업 레벨 환경 변수

특정 작업에서만 사용할 수 있는 환경 변수를 설정합니다.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    env:
      BUILD_DIR: "./dist"
      NODE_ENV: "production"
    steps:
      - name: Build application
        run: |
          echo "Building in: ${{ env.BUILD_DIR }}"
          npm run build
```

### 3. 단계 레벨 환경 변수

특정 단계에서만 사용할 수 있는 환경 변수를 설정합니다.

```yaml
steps:
        - name: Deploy to staging
        env:
          DEPLOY_ENV: "staging"
          API_URL: "https://api-staging.example.com"
        run: |
          echo "Deploying to ${{ env.DEPLOY_ENV }}"
          curl -X POST ${{ env.API_URL }}/deploy
```

### 환경 변수 우선순위

1. 단계 레벨 (가장 높음)
2. 작업 레벨
3. 워크플로우 레벨 (가장 낮음)

## GitHub Secrets 사용

### Secrets란?

GitHub Secrets는 민감한 정보(API 키, 비밀번호, 토큰 등)를 안전하게 저장하고 사용할 수 있는 기능입니다.

### Secrets 설정 방법

1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. "New repository secret" 클릭
3. 이름과 값을 입력

### Secrets 사용 방법

```yaml
steps:
  - name: Use secrets
    run: |
      echo "Database URL: ${{ secrets.DATABASE_URL }}"
      echo "API Key: ${{ secrets.API_KEY }}"
      echo "JWT Secret: ${{ secrets.JWT_SECRET }}"
```

### Secrets 보안 특징

- 값이 로그에 출력되지 않음 (자동 마스킹)
- 암호화되어 저장됨
- 저장소 관리자만 접근 가능

## 조건부 환경 변수

### 브랜치별 환경 변수

```yaml
steps:
  - name: Production deployment
    if: github.ref == 'refs/heads/main'
    env:
      ENVIRONMENT: "production"
      API_URL: "https://api.production.com"
    run: |
      echo "Deploying to ${{ env.ENVIRONMENT }}"

  - name: Development deployment
    if: github.ref == 'refs/heads/develop'
    env:
      ENVIRONMENT: "development"
      API_URL: "https://api.development.com"
    run: |
      echo "Deploying to ${{ env.ENVIRONMENT }}"
```

### 이벤트별 환경 변수

```yaml
steps:
  - name: Handle push event
    if: github.event_name == 'push'
    env:
      EVENT_TYPE: "push"
    run: |
      echo "Handling ${{ env.EVENT_TYPE }} event"

  - name: Handle pull request
    if: github.event_name == 'pull_request'
    env:
      EVENT_TYPE: "pull_request"
    run: |
      echo "Handling ${{ env.EVENT_TYPE }} event"
```

## 실습 예제

### 완전한 워크플로우 예제

```yaml
name: Environment Variables Demo

on:
  push:
    branches: [main, develop]
  workflow_dispatch:

env:
  # 워크플로우 레벨
  APP_NAME: "my-app"
  VERSION: "1.0.0"

jobs:
  environment-demo:
    runs-on: ubuntu-latest

    env:
      # 작업 레벨
      NODE_ENV: "production"
      BUILD_DIR: "./dist"

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Display all variables
        env:
          # 단계 레벨
          STEP_VAR: "step-level"
        run: |
          echo "=== Environment Variables ==="
          echo "App: ${{ env.APP_NAME }}"
          echo "Version: ${{ env.VERSION }}"
          echo "Node Env: ${{ env.NODE_ENV }}"
          echo "Build Dir: ${{ env.BUILD_DIR }}"
          echo "Step Var: ${{ env.STEP_VAR }}"

      - name: Conditional deployment
        run: |
          if [ "${{ github.ref }}" = "refs/heads/main" ]; then
            echo "Deploying to production"
            echo "Using production secrets"
          else
            echo "Deploying to development"
            echo "Using development secrets"
          fi
```

## 모범 사례

### 1. 환경 변수 명명 규칙

- 대문자와 언더스코어 사용: `DATABASE_URL`, `API_KEY`
- 의미있는 이름 사용: `PRODUCTION_API_URL`
- 접두사 사용: `APP_`, `DB_`

### 2. 보안 고려사항

- 민감한 정보는 항상 Secrets 사용
- 환경 변수에 직접 비밀번호 입력 금지
- 로그에 민감한 정보 출력 금지

### 3. 환경별 설정

- 개발/스테이징/프로덕션 환경 분리
- 브랜치별 자동 환경 설정
- 환경별 Secrets 분리

### 4. 디버깅 팁

- `env | sort` 명령으로 모든 환경 변수 확인
- 조건부 실행 시 조건 확인
- Secrets 값 확인 시 마스킹 확인

## 요약

환경 변수는 GitHub Actions에서 설정을 관리하고 보안을 유지하는 핵심 요소입니다. 워크플로우, 작업, 단계 레벨에서 환경 변수를 설정할 수 있으며, GitHub Secrets를 통해 민감한 정보를 안전하게 관리할 수 있습니다. 조건부 환경 변수를 사용하여 브랜치나 이벤트에 따라 다른 설정을 적용할 수 있습니다.
