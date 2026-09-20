import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';

export default function config(phase: string): NextConfig {
  return {
    output: 'export',
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
    trailingSlash: true,
  };
}
