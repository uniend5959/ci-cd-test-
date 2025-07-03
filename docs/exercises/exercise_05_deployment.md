# 실습 4: 배포 워크플로우

## 목표

Vercel을 사용한 자동 배포 워크플로우 작성

## 준비사항

- 실습 3 완료
- Vercel 계정
- Vercel 프로젝트 설정

## 실습 단계

### 1단계: 워크플로우 파일 생성

`.github/workflows/` 디렉토리에 `deployment.yml` 파일을 생성하세요.

### 2단계: 배포 워크플로우 작성

다음 요구사항에 맞는 배포 워크플로우를 작성하세요:

**요구사항:**

- 워크플로우 이름: "Deploy to Vercel"
- 트리거: main 브랜치에 push될 때만
- 실행 환경: ubuntu-latest
- 작업들:
  1. "test" - 테스트 실행 (실패 시 배포 중단)
  2. "deploy" - Vercel 배포 (test 성공 후)

### 3단계: 환경변수 설정

- Vercel 토큰을 GitHub Secrets에 추가
- Vercel 프로젝트 ID 설정

### 4단계: 조건부 배포

- main 브랜치에서만 배포
- 테스트 통과 시에만 배포

### 5단계: 워크플로우 실행

1. 파일을 커밋하고 푸시
2. GitHub 저장소의 Actions 탭에서 실행 확인
3. Vercel 대시보드에서 배포 확인

## 힌트

- `needs:` 키워드로 작업 간 의존성 설정
- `if:` 조건문으로 브랜치 조건 설정
- `${{ secrets.VERCEL_TOKEN }}`으로 시크릿 사용
- `amondnet/vercel-action@v25` 액션 사용

## 확인 사항

- [ ] main 브랜치에서만 배포가 실행되는가?
- [ ] 테스트 실패 시 배포가 중단되는가?
- [ ] Vercel에 성공적으로 배포되는가?
- [ ] 배포 URL이 출력되는가?

## 다음 단계

실습이 완료되면 `docs/solutions/solution_04_deployment.yml` 파일을 확인하여 정답과 비교해보세요.
