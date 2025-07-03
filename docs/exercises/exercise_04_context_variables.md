# Exercise 04: GitHub Actions Context Variables (프론트엔드 핵심)

## 목표

프론트엔드 개발에서 GitHub Actions를 사용할 때 꼭 알아야 하는 핵심 Context 변수들을 실습합니다.

## 실습 내용

### 1. GitHub Context 사용

- 저장소 정보, 브랜치 정보, 커밋 정보 출력
- 이벤트 타입에 따른 다른 동작 구현

### 2. 브랜치별 조건부 실행

- main 브랜치와 develop 브랜치에서 다른 동작
- feature 브랜치 감지 및 처리

### 3. Pull Request 처리

- PR 정보 출력 (제목, 번호, 작성자)
- PR 이벤트에만 실행되는 단계 구현

### 4. 단계 간 데이터 전달

- 빌드 정보를 생성하고 다음 단계에서 사용
- 환경 변수로 Context 활용

## 요구사항

### 워크플로우 파일 생성

`workflows/04_context_variables.yml` 파일을 생성하고 다음 기능을 구현하세요:

1. **기본 Context 출력**

   - 저장소 이름, 브랜치 이름, 커밋 해시 출력
   - 이벤트 타입과 실행자 정보 출력

2. **브랜치별 다른 동작**

   - main 브랜치: "Production 배포 준비" 메시지
   - develop 브랜치: "Staging 배포 준비" 메시지
   - feature 브랜치: "Feature 테스트 준비" 메시지

3. **Pull Request 처리**

   - PR 제목, 번호, 작성자 정보 출력
   - PR에만 실행되는 특별한 단계

4. **빌드 정보 생성 및 활용**

   - 빌드 ID, 브랜치, 커밋 정보를 단계 출력으로 설정
   - 다음 단계에서 이 정보들을 사용

5. **환경 변수 활용**
   - Context 정보를 환경 변수로 설정
   - 환경 변수를 사용하여 정보 출력

### 예상 출력

워크플로우가 실행되면 다음과 같은 정보들이 출력되어야 합니다:

```
=== GitHub Context ===
Repository: owner/repo-name
Branch: main
Commit: a1b2c3d4e5f6...
Event: push
Actor: username

=== Branch-specific Action ===
Production 배포 준비
Branch: main

=== Build Info ===
Build ID: 1234567890
Branch: main
Commit: a1b2c3d4e5f6...
```

## 힌트

- `${{ github.repository }}` - 저장소 이름
- `${{ github.ref_name }}` - 브랜치 이름
- `${{ github.sha }}` - 커밋 해시
- `${{ github.event_name }}` - 이벤트 타입
- `if: github.ref_name == 'main'` - 조건부 실행
- `echo "key=value" >> $GITHUB_OUTPUT` - 단계 출력 설정

## 평가 기준

- [ ] GitHub context가 올바르게 출력됨
- [ ] 브랜치별 조건부 실행이 작동함
- [ ] Pull Request 처리가 올바르게 구현됨
- [ ] 단계 간 데이터 전달이 성공함
- [ ] 환경 변수 활용이 올바르게 작동함
- [ ] 워크플로우가 성공적으로 실행됨

## 추가 학습

- GitHub Actions의 다른 context 종류
- Context를 활용한 고급 조건문
- Context 보안 고려사항
