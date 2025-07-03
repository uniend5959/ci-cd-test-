# GitHub Actions Event Filters

## 개요

GitHub Actions에서 워크플로우는 특정 이벤트가 발생했을 때만 실행됩니다. 이벤트 필터를 사용하면 더 세밀한 제어가 가능하며, 불필요한 워크플로우 실행을 방지할 수 있습니다.

## 주요 이벤트 타입

### 1. Push 이벤트

가장 일반적인 이벤트로, 코드가 저장소에 푸시될 때 발생합니다.

```yaml
on:
  push:
    branches: [main, develop]
    paths: ["src/**", "package.json"]
```

**Activity Types:**

- `created`: 브랜치나 태그가 생성될 때
- `deleted`: 브랜치나 태그가 삭제될 때
- `edited`: 브랜치나 태그가 편집될 때
- `opened`: 브랜치나 태그가 열릴 때
- `synchronize`: 브랜치에 새로운 커밋이 푸시될 때

### 2. Pull Request 이벤트

Pull Request와 관련된 모든 활동에서 발생합니다.

```yaml
on:
  pull_request:
    branches: [main]
    types: [opened, synchronize, reopened, closed]
```

**Activity Types:**

- `assigned`: PR이 할당될 때
- `unassigned`: PR 할당이 해제될 때
- `labeled`: PR에 라벨이 추가될 때
- `unlabeled`: PR에서 라벨이 제거될 때
- `opened`: PR이 열릴 때
- `edited`: PR 제목이나 내용이 편집될 때
- `closed`: PR이 닫힐 때
- `reopened`: PR이 다시 열릴 때
- `synchronize`: PR에 새로운 커밋이 푸시될 때
- `ready_for_review`: PR이 리뷰 준비가 완료될 때
- `review_requested`: 리뷰가 요청될 때
- `review_request_removed`: 리뷰 요청이 제거될 때

### 3. Schedule 이벤트

정해진 시간에 워크플로우를 실행합니다.

```yaml
on:
  schedule:
    - cron: "0 0 * * *" # 매일 자정
    - cron: "0 12 * * 1" # 매주 월요일 정오
```

### 4. Workflow Dispatch 이벤트

수동으로 워크플로우를 실행할 수 있습니다.

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: "Deploy to environment"
        required: true
        default: "staging"
        type: choice
        options:
          - staging
          - production
```

## 이벤트 필터링 옵션

### 브랜치 필터링

특정 브랜치에서만 워크플로우를 실행할 수 있습니다.

```yaml
on:
  push:
    branches:
      - main
      - develop
      - "feature/*"
      - "release/**"
```

### 경로 필터링

특정 파일이나 디렉토리가 변경되었을 때만 실행합니다.

```yaml
on:
  push:
    paths:
      - "src/**"
      - "package.json"
      - "package-lock.json"
      - "!docs/**" # docs 폴더는 제외
```

### Activity Type 필터링

특정 활동 유형에서만 실행합니다.

```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened]
```

## 실용적인 예제

### 1. 프론트엔드 코드 변경 시에만 테스트 실행

```yaml
on:
  push:
    paths:
      - "src/**"
      - "public/**"
      - "package.json"
      - "next.config.js"
    branches: [main, develop]
```

### 2. PR 리뷰 완료 시에만 배포

```yaml
on:
  pull_request:
    types: [closed]
    branches: [main]
```

### 3. 특정 파일 변경 시 특정 작업 실행

```yaml
on:
  push:
    paths:
      - "docker/**"
    branches: [main]
```

### 4. 수동 배포 워크플로우

```yaml
on:
  workflow_dispatch:
    inputs:
      target:
        description: "Target environment"
        required: true
        default: "staging"
        type: choice
        options:
          - staging
          - production
```

### 5. 정기적인 유지보수 작업

```yaml
on:
  schedule:
    - cron: "0 2 * * 0" # 매주 일요일 새벽 2시
```

## 주의사항

1. **경로 필터링의 한계**: 경로 필터링은 해당 경로의 파일이 변경되었을 때만 워크플로우를 실행합니다. 다른 파일의 변경으로 인한 간접적 영향은 감지하지 못합니다.

2. **브랜치 보호**: 중요한 브랜치(main, production 등)에서는 브랜치 보호 규칙과 함께 사용하는 것이 좋습니다.

3. **성능 고려**: 너무 많은 조건을 설정하면 워크플로우 실행이 복잡해질 수 있습니다.

4. **Activity Type 이해**: 각 이벤트의 activity type을 정확히 이해하고 사용해야 합니다.

## 모범 사례

1. **명확한 조건 설정**: 언제 워크플로우가 실행되어야 하는지 명확히 정의
2. **불필요한 실행 방지**: 경로 필터링을 사용하여 관련 없는 변경사항으로 인한 실행 방지
3. **단계적 접근**: 복잡한 조건은 단계적으로 추가하여 디버깅 용이성 확보
4. **문서화**: 팀원들이 워크플로우 실행 조건을 이해할 수 있도록 주석 추가

## 다음 단계

이제 실습을 통해 event filter와 activity type을 실제로 적용해보겠습니다.
