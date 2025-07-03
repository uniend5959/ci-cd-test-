# 04. GitHub Actions Context Variables (프론트엔드 개발자를 위한 핵심)

## 개요

프론트엔드 개발에서 GitHub Actions를 사용할 때 꼭 알아야 하는 핵심 Context 변수들을 학습합니다.

## 목차

1. [Context란?](#context란)
2. [핵심 Context 3가지](#핵심-context-3가지)
3. [실무 활용 예제](#실무-활용-예제)

## Context란?

Context는 GitHub Actions 워크플로우 실행 중에 사용할 수 있는 정보들을 담고 있는 객체입니다.

```yaml
# Context 사용 예시
${{ github.repository }}  # 저장소 이름
${{ github.ref_name }}    # 브랜치 이름
${{ github.sha }}         # 커밋 해시
```

## 핵심 Context 3가지

### 1. GitHub Context (가장 중요!)

프론트엔드 개발에서 가장 자주 사용하는 Context입니다.

| 속성명              | 설명              | 사용 예시                    |
| ------------------- | ----------------- | ---------------------------- |
| `github.repository` | 저장소 이름       | `owner/repo-name`            |
| `github.ref_name`   | 브랜치 이름       | `main`, `develop`, `feature` |
| `github.sha`        | 커밋 해시         | `a1b2c3d4e5f6...`            |
| `github.event_name` | 이벤트 이름       | `push`, `pull_request`       |
| `github.actor`      | 워크플로우 실행자 | `username`                   |

### 2. Runner Context

실행 환경 정보를 제공합니다.

| 속성명             | 설명          | 예시                          |
| ------------------ | ------------- | ----------------------------- |
| `runner.os`        | 운영체제      | `Linux`                       |
| `runner.workspace` | 작업 디렉토리 | `/home/runner/work/repo/repo` |

### 3. Steps Context

단계 간 데이터를 전달할 때 사용합니다.

```yaml
# 단계에서 출력 설정
- name: Set output
  id: build_info
  run: |
    echo "version=1.0.0" >> $GITHUB_OUTPUT
    echo "build_time=$(date)" >> $GITHUB_OUTPUT

# 다른 단계에서 사용
- name: Use output
  run: |
    echo "Version: ${{ steps.build_info.outputs.version }}"
    echo "Build Time: ${{ steps.build_info.outputs.build_time }}"
```

## 실무 활용 예제

### 1. 브랜치별 배포

```yaml
- name: Deploy to staging
  if: github.ref_name == 'develop'
  run: |
    echo "Deploying to staging environment"
    echo "Branch: ${{ github.ref_name }}"

- name: Deploy to production
  if: github.ref_name == 'main'
  run: |
    echo "Deploying to production environment"
    echo "Branch: ${{ github.ref_name }}"
```

### 2. Pull Request 처리

```yaml
- name: Handle PR
  if: github.event_name == 'pull_request'
  run: |
    echo "PR Title: ${{ github.event.pull_request.title }}"
    echo "PR Number: ${{ github.event.pull_request.number }}"
    echo "PR Author: ${{ github.event.pull_request.user.login }}"
```

### 3. 빌드 정보 생성

```yaml
- name: Generate build info
  id: build_info
  run: |
    echo "build_id=$(date +%s)" >> $GITHUB_OUTPUT
    echo "branch=${{ github.ref_name }}" >> $GITHUB_OUTPUT
    echo "commit=${{ github.sha }}" >> $GITHUB_OUTPUT

- name: Use build info
  run: |
    echo "Build ID: ${{ steps.build_info.outputs.build_id }}"
    echo "Branch: ${{ steps.build_info.outputs.branch }}"
    echo "Commit: ${{ steps.build_info.outputs.commit }}"
```

### 4. 환경 변수로 Context 사용

```yaml
- name: Set environment variables
  env:
    REPO_NAME: "${{ github.repository }}"
    BRANCH_NAME: "${{ github.ref_name }}"
    COMMIT_SHA: "${{ github.sha }}"
  run: |
    echo "Repository: $REPO_NAME"
    echo "Branch: $BRANCH_NAME"
    echo "Commit: $COMMIT_SHA"
```

## 자주 사용하는 패턴

### 1. 조건부 실행

```yaml
# main 브랜치에만 실행
if: github.ref_name == 'main'

# feature 브랜치에만 실행
if: startsWith(github.ref_name, 'feature/')

# Pull Request에만 실행
if: github.event_name == 'pull_request'
```

### 2. 동적 파일명 생성

```yaml
- name: Create build artifact
  run: |
    # 브랜치명을 포함한 파일명 생성
    filename="build-${{ github.ref_name }}-${{ github.sha }}.zip"
    echo "Creating $filename"
```

### 3. 커밋 메시지 활용

```yaml
- name: Check commit message
  if: github.event_name == 'push'
  run: |
    commit_msg="${{ github.event.head_commit.message }}"
    if [[ $commit_msg == *"[skip ci]"* ]]; then
      echo "Skipping CI due to [skip ci] in commit message"
      exit 0
    fi
```

## 요약

프론트엔드 개발자가 GitHub Actions에서 꼭 알아야 할 Context:

1. **`github.repository`** - 저장소 정보
2. **`github.ref_name`** - 브랜치 이름
3. **`github.sha`** - 커밋 해시
4. **`github.event_name`** - 이벤트 타입
5. **`steps.{id}.outputs.{name}`** - 단계 간 데이터 전달

이 Context들을 활용하면 브랜치별 배포, Pull Request 처리, 빌드 정보 생성 등 프론트엔드 개발에 필요한 대부분의 워크플로우를 구축할 수 있습니다.
