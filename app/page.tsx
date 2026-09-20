'use client';

import { useEffect, useState } from 'react';

type Values = { current: string; last: string; interval: string };
const DEFAULTS: Values = { current: '', last: '', interval: '10000' };
const STORAGE_KEY = 'oil-check-values-v1';
const format = (value: number) => new Intl.NumberFormat('ko-KR').format(value);

function readDistance(value: string): number | null {
  if (value.trim() === '') return null;
  const number = Number(value);
  return Number.isSafeInteger(number) && number >= 0 ? number : null;
}

export default function Home() {
  const [values, setValues] = useState<Values>(DEFAULTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          const data = parsed as Partial<Values>;
          setValues({
            current: typeof data.current === 'string' ? data.current : '',
            last: typeof data.last === 'string' ? data.last : '',
            interval: typeof data.interval === 'string' ? data.interval : '10000',
          });
        }
      }
    } catch { /* 저장소를 사용할 수 없는 브라우저에서도 계산은 가능 */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(values)); } catch { /* 저장 불가 시 무시 */ }
  }, [values, ready]);

  const update = (key: keyof Values, value: string) => {
    if (value === '' || /^\d{0,9}$/.test(value)) setValues(prev => ({ ...prev, [key]: value }));
  };
  const current = readDistance(values.current);
  const last = readDistance(values.last);
  const interval = readDistance(values.interval);
  const complete = current !== null && last !== null && interval !== null && interval > 0;
  const invalidOrder = complete && current < last;
  const valid = complete && !invalidOrder;
  const next = valid ? last + interval : 0;
  const remaining = valid ? next - current : 0;
  const traveled = valid ? current - last : 0;
  const progress = valid ? Math.min(100, Math.round((traveled / interval) * 100)) : 0;
  const status = !valid ? '입력 대기' : remaining < 0 ? '교체 시기 지남' : remaining === 0 ? '지금 교체할 시기' : remaining <= 1000 ? '교체 시기 임박' : '정상 주행 중';

  return (
    <main className="page">
      <div className="shell">
        <header className="header"><div className="brand"><span className="brand-icon" aria-hidden="true">◉</span> OILCHECK</div><span className="header-tag">내 차 관리의 시작</span></header>
        <section className="intro"><span className="eyebrow">ENGINE OIL TRACKER</span><h1>엔진오일 교체 시기,<br /><span>이제 놓치지 마세요.</span></h1><p>주행거리만 입력하면 다음 교체까지 남은 거리를 바로 계산해 드려요.</p></section>
        <div className="grid">
          <section className="card input-card" aria-labelledby="input-title"><div className="card-top"><div><span className="step">01 / 주행거리 입력</span><h2 id="input-title">내 차량 정보</h2></div><span className="small-icon" aria-hidden="true">↗</span></div>
            <label htmlFor="current">현재 누적 주행거리 <span className="required">필수</span></label><div className="input-wrap"><input id="current" type="text" inputMode="numeric" placeholder="예: 58000" value={values.current} onChange={e => update('current', e.target.value)} /><span>km</span></div>
            <label htmlFor="last">마지막 엔진오일 교체 주행거리 <span className="required">필수</span></label><div className="input-wrap"><input id="last" type="text" inputMode="numeric" placeholder="예: 50000" value={values.last} onChange={e => update('last', e.target.value)} /><span>km</span></div>
            <label htmlFor="interval">엔진오일 교체 주기 <span className="optional">직접 설정</span></label><div className="input-wrap"><input id="interval" type="text" inputMode="numeric" placeholder="예: 10000" value={values.interval} onChange={e => update('interval', e.target.value)} /><span>km</span></div>
            {invalidOrder && <p className="error" role="alert">현재 주행거리는 마지막 교체 주행거리보다 작을 수 없어요.</p>}
            {interval === 0 && <p className="error" role="alert">교체 주기는 1km 이상이어야 해요.</p>}
            <p className="input-note">입력한 값은 이 브라우저에만 저장돼요. 서버로 전송되지 않아요.</p>
          </section>
          <section className="card result-card" aria-labelledby="result-title"><div className="card-top"><div><span className="step">02 / 교체 시기 확인</span><h2 id="result-title">교체까지 남은 거리</h2></div><span className={`badge ${valid && remaining <= 1000 ? 'badge-alert' : ''}`} aria-live="polite"><span className="dot" />{status}</span></div>
            <div className="metric" aria-live="polite"><strong>{valid ? format(Math.abs(remaining)) : '—'}</strong><span>km</span></div><p className="metric-caption">{!valid ? '왼쪽에 주행거리를 입력해 주세요.' : remaining < 0 ? '교체 기준을 초과했어요. 점검을 권장해요.' : remaining === 0 ? '설정한 교체 주행거리에 도달했어요.' : '다음 엔진오일 교체까지 남았어요.'}</p>
            <div className="progress-header"><span>교체 주기 진행률</span><strong>{valid ? `${progress}%` : '—'}</strong></div><div className="progress-track" role="progressbar" aria-label="교체 주기 진행률" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><div className={`progress-fill ${valid && remaining <= 1000 ? 'progress-alert' : ''}`} style={{ width: `${progress}%` }} /></div>
            <div className="result-divider" /><div className="detail"><span>다음 교체 예정 주행거리</span><strong>{valid ? `${format(next)} km` : '—'}</strong></div><div className="detail"><span>마지막 교체 후 주행거리</span><strong>{valid ? `${format(traveled)} km` : '—'}</strong></div>
            <div className="tip"><span aria-hidden="true">✳</span><p>교체 주기는 차량 제조사 권장 기준과 주행 환경에 따라 달라질 수 있어요. 기간 기준도 함께 확인하세요.</p></div>
          </section>
        </div><footer>OILCHECK · 가볍게 시작하는 차량 관리</footer>
      </div>
    </main>
  );
}
