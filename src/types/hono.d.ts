import { Context } from 'hono';

declare module 'hono' {
  interface Context {
    setState<T = any>(key: string, value: T): void;
  }
}