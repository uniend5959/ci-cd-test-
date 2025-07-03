# GitHub Actions 소개

## 학습 목표

- GitHub Actions의 개념과 장점 이해
- CI/CD 파이프라인의 기본 개념 파악
- GitHub Actions의 기본 구조 이해

## 주요 내용

### 1. GitHub Actions란?

GitHub Actions는 GitHub에서 제공하는 CI/CD(Continuous Integration/Continuous Deployment) 플랫폼입니다.

**주요 특징:**

- YAML 파일로 워크플로우 정의
- GitHub 저장소와 완전 통합
- 다양한 러너 환경 지원
- Marketplace를 통한 액션 공유

### 2. CI/CD란?

- **CI (Continuous Integration)**: 코드 변경사항을 자동으로 빌드하고 테스트
- **CD (Continuous Deployment)**: 테스트가 통과한 코드를 자동으로 배포

### 3. GitHub Actions의 장점

- **자동화**: 반복적인 작업 자동화
- **일관성**: 모든 개발자가 동일한 환경에서 작업
- **빠른 피드백**: 문제를 빠르게 발견하고 수정
- **협업 향상**: 코드 리뷰와 배포 프로세스 개선

### 4. 기본 구조

```yaml
name: 워크플로우 이름
on: [이벤트]
jobs:
  job-name:
    runs-on: ubuntu-latest
    steps:
      - name: 스텝 이름
        run: 명령어
```

## 실습 준비

다음 강의에서 실제 워크플로우를 작성해보겠습니다.
