name: context ci
on:
  push:
  pull_request:
jobs:
  basicContext:
    runs-on: ubuntu-latest
    steps:
      - name: info
        run: |
          echo  ` 저장소 이름 ${{ github.repository }}`
          echo '브런치 이름 ${{ github.ref_name }}'
          echo   '커밋 해쉬 ${{ github.sha }}'
          echo '이벤트 타입${{ github.event_name }}'

  branch:
    runs-on: ubuntu-latest
    steps:
      - name: main 동작
        if: github.ref_name == 'main'
        run: echo 'Production 배포 준비'

      - name: develop
        if: github.ref_name == 'develop'
        run: echo 'Staging 배포 준비'

      - name: feature
        if: github.ref_name == 'feature'
        run: echo 'Feature 테스트 준비'

  prevent:
    runs-on: ubuntu-latest
    steps:
      - name: pr시 처리동작

        run: |
          echo 'pr 제목 :${{ github.event.pull_request.title }}'
          echo 'pr 번호 :${{ github.event.pull_request.number }}'
          echo 'pr 작성자 정보 :${{ github.event.pull_request.user.login }}'
