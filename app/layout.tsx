import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '오일체크 | 엔진오일 교체 시기 계산기',
  description: '주행거리를 입력하고 엔진오일 교체까지 남은 거리를 확인하세요.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
