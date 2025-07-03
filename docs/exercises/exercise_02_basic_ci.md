# 실습 2: 기본 CI 워크플로우

## 목표

Node.js 프로젝트를 위한 기본 CI(Continuous Integration) 워크플로우 작성

## 준비사항

- 실습 1 완료
- Node.js 프로젝트 (package.json 존재)
- 기본 테스트 스크립트

## 실습 단계

### 1단계: 워크플로우 파일 생성

`.github/workflows/` 디렉토리에 `basic-ci.yml` 파일을 생성하세요.

### 2단계: CI 워크플로우 작성

다음 요구사항에 맞는 CI 워크플로우를 작성하세요:

**요구사항:**

- 워크플로우 이름: "Basic CI"
- 트리거: push와 pull_request 이벤트 (main 브랜치)
- 실행 환경: ubuntu-latest
- 작업: "ci"라는 이름의 job
- 단계들:
  1. "Checkout code" - 코드 체크아웃
  2. "Setup Node.js" - Node.js 18 설정
  3. "Install dependencies" - 의존성 설치
  4. "Run tests" - 테스트 실행
  5. "Build project" - 프로젝트 빌드

### 3단계: 액션 사용

다음 액션들을 사용하세요:

- `actions/checkout@v4` - 코드 체크아웃
- `actions/setup-node@v4` - Node.js 설정

### 4단계: 워크플로우 실행

1. 파일을 커밋하고 푸시
2. GitHub 저장소의 Actions 탭에서 실행 확인
3. 각 단계별 실행 로그 확인

## 힌트

- `uses:` 키워드로 액션 사용
- `with:` 섹션으로 액션에 파라미터 전달
- `run:` 명령어로 npm 명령 실행
- 각 단계에 의미있는 이름 부여

## 확인 사항

- [ ] 모든 단계가 성공적으로 실행되는가?
- [ ] Node.js가 올바르게 설정되는가?
- [ ] 의존성이 정상적으로 설치되는가?
- [ ] 테스트가 실행되는가?
- [ ] 빌드가 성공하는가?

## 다음 단계

실습이 완료되면 `docs/solutions/solution_02_basic_ci.yml` 파일을 확인하여 정답과 비교해보세요.
