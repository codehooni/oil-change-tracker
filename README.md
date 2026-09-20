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

## Vercel 배포

운영 배포는 Vercel의 `codehoonis-projects/oil-change-tracker` 프로젝트에서 관리합니다.
연결된 GitHub 저장소의 `main` 브랜치에 푸시하면 Vercel이 자동 배포합니다.

- 프레임워크: Next.js (자동 감지)
- 빌드: `npm ci` 후 `npm run build`
- 정적 빌드 결과: `out/`
- 배포 경로: `/` (`NEXT_PUBLIC_BASE_PATH`를 설정하지 않습니다)
- 로컬 개발: `npm run dev`
- CLI 배포: 프로젝트 연결 후 `npx vercel --prod`
- 정적 배포이므로 `next start` 대신 정적 파일 서버로 `out/`을 제공합니다.

Vercel 연결 정보와 환경 파일은 Git에 포함하지 않습니다.
이전 GitHub Pages 자동 배포 워크플로는 Vercel 전환에 따라 제거했습니다.

배포 참고: [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs).
