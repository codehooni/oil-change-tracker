# OILCHECK

누적 주행거리와 마지막 엔진오일 교체 주행거리를 입력하면 다음 교체까지 남은 거리를 계산하는 Next.js 공부용 웹페이지입니다.

## 실행

Node.js 20 이상에서:

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 을 여세요.

## 기능
- 현재 누적 주행거리, 마지막 교체 주행거리, 교체 주기 입력
- 다음 교체 주행거리, 남은 거리, 진행률 표시
- 교체 주기가 지난 경우 경고 표시
- 브라우저 localStorage에 입력값 저장 (서버/DB 없음)

교체 주기 10,000km는 예시 기본값입니다. 실제 교체 주기는 차량 매뉴얼 및 주행 환경을 확인하세요.

## GitHub Pages 배포

이 프로젝트는 정적 사이트로 빌드되며, `main` 브랜치에 푸시하면 GitHub Actions가 GitHub Pages에 자동 배포합니다.
저장소의 **Settings → Pages → Source**는 **GitHub Actions**로 설정합니다.

- 빌드: `npm ci` 후 `npm run build`
- 빌드 결과: `out/`
- 하위 경로 배포: `NEXT_PUBLIC_BASE_PATH`를 `/저장소이름`으로 설정한 뒤 빌드
- 로컬 개발: `npm run dev` (기본 경로 `/`)
- 정적 배포이므로 `next start` 대신 정적 파일 서버로 `out/`을 제공합니다.

배포 참고: [GitHub Pages 공식 문서](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [Next.js 정적 내보내기](https://nextjs.org/docs/app/guides/static-exports).
