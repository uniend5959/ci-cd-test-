# CI/CD 강의 실습 프로젝트

GitHub Actions를 사용한 CI/CD 파이프라인 실습을 위한 프로젝트입니다.

## 프로젝트 구조

```
cicd/
├── docs/
│   ├── exercises/          # 실습 문제
│   │   ├── exercise_01_hello_world.md
│   │   ├── exercise_02_basic_ci.md
│   │   ├── exercise_03_context_variables.md
│   │   ├── exercise_04_testing.md
│   │   ├── exercise_05_deployment.md
│   │   ├── exercise_06_environment_variables.md
│   │   └── exercise_07_event_filters.md
│   ├── lectures/           # 강의 자료
│   │   ├── 01_introduction.md
│   │   ├── 02_basic_concepts.md
│   │   ├── 03_context_variables.md
│   │   ├── 04_workflow_syntax.md
│   │   ├── 05_environment_variables.md
│   │   └── 07_event_filters.md
│   └── solutions/          # 실습 정답
│       ├── solution_01_hello_world.yml
│       ├── solution_02_basic_ci.yml
│       ├── solution_03_context_variables.yml
│       ├── solution_04_testing.yml
│       ├── solution_05_deployment.yml
│       ├── solution_06_environment_variables.yml
│       └── solution_07_event_filters.yml
├── workflows/              # 실제 워크플로우 파일
│   ├── 01_hello_world.yml
│   ├── 02_ci_example.yml
│   ├── 03_context_variables.yml
│   ├── 04_test_and_deploy.yml
│   ├── 05_frontend_context.yml
│   ├── 06_environment_variables.yml
│   ├── 07_event_filters_01.yml
│   ├── 07_event_filters_02.yml
│   ├── 07_event_filters_03.yml
│   ├── 07_event_filters_04.yml
│   ├── 07_event_filters_05.yml
│   ├── 07_event_filters_challenge_01.yml
│   ├── 07_event_filters_challenge_02.yml
│   └── 07_event_filters_challenge_03.yml
└── src/                    # Next.js 애플리케이션
    ├── app/
    ├── components/
    └── __tests__/
```

## 실습 목록

### 1. Hello World

- GitHub Actions 기본 구조 학습
- 워크플로우 파일 작성 방법
- 간단한 출력 작업

### 2. Basic CI

- 기본적인 CI 파이프라인 구축
- 코드 체크아웃 및 빌드
- 조건부 실행

### 3. Testing

- 자동화된 테스트 실행
- Jest를 사용한 테스트
- 테스트 결과 보고

### 4. Deployment

- 자동 배포 파이프라인
- 환경별 배포 설정
- 배포 상태 확인

### 5. Environment Variables

- GitHub Actions 환경 변수 사용법
- GitHub Secrets 활용
- 조건부 환경 변수 설정
- 브랜치별 환경 분리

### 6. Context Variables

- GitHub Actions 컨텍스트 변수 활용
- 이벤트 정보 접근
- 동적 워크플로우 구성

### 7. Event Filters ⭐ NEW

- GitHub Actions 이벤트 필터링
- Push/Pull Request 이벤트 제어
- Activity Types 활용
- 경로 및 브랜치 기반 필터링

## 시작하기

### 1. 저장소 클론

```bash
git clone <repository-url>
cd cicd
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 테스트 실행

```bash
npm test
```

## 실습 방법

1. **실습 문제 읽기**: `docs/exercises/` 폴더의 실습 문제를 읽습니다.
2. **워크플로우 작성**: `workflows/` 폴더에 워크플로우 파일을 작성합니다.
3. **정답 확인**: `docs/solutions/` 폴더의 정답과 비교합니다.
4. **실행 테스트**: GitHub에 푸시하여 워크플로우가 정상 실행되는지 확인합니다.

## 환경 변수 실습 (Exercise 06)

### 목표

- GitHub Actions에서 환경 변수를 사용하는 방법 학습
- GitHub Secrets를 통한 민감한 정보 관리
- 브랜치별 환경 설정

### 주요 내용

- 기본 환경 변수 사용 (`GITHUB_REPOSITORY`, `GITHUB_SHA` 등)
- 커스텀 환경 변수 설정 (워크플로우/작업/단계 레벨)
- GitHub Secrets 활용
- 조건부 환경 변수 (브랜치별 설정)

### 실행 방법

1. `workflows/06_environment_variables.yml` 파일을 생성
2. GitHub Secrets 설정 (선택사항)
3. main 또는 develop 브랜치에 푸시
4. Actions 탭에서 실행 결과 확인

## 이벤트 필터 실습 (Exercise 07) ⭐ NEW

### 목표

- GitHub Actions 이벤트 필터링 방법 학습
- Push/Pull Request 이벤트 세밀 제어
- Activity Types를 활용한 조건부 실행

### 주요 내용

- Push 이벤트 필터링 (경로, 브랜치 기반)
- Pull Request Activity Types 활용
- 복합 조건 워크플로우 구성
- 브랜치별 다른 동작 설정
- 고급 필터링 기법

### 실행 방법

1. `workflows/07_event_filters_*.yml` 파일들을 생성
2. 다양한 이벤트 조건으로 테스트
3. GitHub에서 실제 이벤트 발생 시뮬레이션
4. Actions 탭에서 실행 결과 확인

### 실습 구성

- **실습 1**: Push 이벤트 경로 필터링
- **실습 2**: Pull Request Activity Types
- **실습 3**: 복합 조건 워크플로우
- **실습 4**: 브랜치별 다른 동작
- **실습 5**: 고급 필터링 (머지 감지)
- **도전 과제**: 스케줄링, 라벨 기반, 파일 크기 기반 필터링

## 기술 스택

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Testing**: Jest, React Testing Library
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel (예시)

## 참고 자료

- [GitHub Actions 공식 문서](https://docs.github.com/en/actions)
- [Next.js 공식 문서](https://nextjs.org/docs)
- [Jest 공식 문서](https://jestjs.io/docs/getting-started)

## 라이선스

MIT License
