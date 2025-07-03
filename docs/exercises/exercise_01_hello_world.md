# 실습 1: Hello World 워크플로우

## 목표

GitHub Actions의 첫 번째 워크플로우를 작성하고 실행해보기

## 준비사항

- GitHub 저장소 접근 권한
- 기본적인 YAML 문법 이해

## 실습 단계

### 1단계: 워크플로우 파일 생성

`.github/workflows/` 디렉토리에 `hello-world.yml` 파일을 생성하세요.

### 2단계: 기본 워크플로우 작성

다음 요구사항에 맞는 워크플로우를 작성하세요:

**요구사항:**

- 워크플로우 이름: "Hello World"
- 트리거: push 이벤트 (모든 브랜치)
- 실행 환경: ubuntu-latest
- 작업: "greet"라는 이름의 job
- 단계: "Say Hello"라는 이름의 step
- 출력: "Hello, GitHub Actions!" 메시지

### 3단계: 워크플로우 실행

1. 파일을 커밋하고 푸시
2. GitHub 저장소의 Actions 탭에서 실행 확인
3. 실행 로그 확인

## 힌트

- `name:` 섹션을 사용하여 워크플로우 이름 지정
- `on:` 섹션에서 이벤트 정의
- `jobs:` 섹션에서 작업 정의
- `runs-on:`으로 실행 환경 지정
- `steps:` 섹션에서 단계 정의
- `run:` 명령어로 쉘 명령 실행

## 확인 사항

- [ ] 워크플로우가 성공적으로 실행되는가?
- [ ] "Hello, GitHub Actions!" 메시지가 출력되는가?
- [ ] Actions 탭에서 실행 로그를 확인할 수 있는가?

## 다음 단계

실습이 완료되면 `docs/solutions/solution_01_hello_world.yml` 파일을 확인하여 정답과 비교해보세요.
