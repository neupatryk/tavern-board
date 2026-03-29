# Copilot Instructions – Tavern Board

## Project Overview

This is a monorepo managed with Turborepo.

Tech stack:

- Mobile app: React Native + Expo + TypeScript
- Backend: TBD (design API contracts first)
- Package manager: pnpm
- State management: React Query (server state)
- Architecture: modular, type-safe, API-first

Tavern Board is an app used to organize events within friend groups:

- create events
- invite users
- RSVP
- notifications (reminders)
- calendar-like views

---

## Monorepo Structure

/apps
/mobile → Expo React Native app
/backend → backend service (future)

/packages
/types → shared TypeScript types (source of truth)
/api → API client (fetch wrappers)
/mocks → MSW handlers (mock backend)

/infra (optional later)
→ deployment, CI/CD, scripts

---

## General Principles

- Always use TypeScript (strict mode)
- Prefer composition over inheritance
- Keep components small and reusable
- Avoid unnecessary abstractions
- Write code that is easy to refactor

---

## API Design Rules (CRITICAL)

- Design API contracts BEFORE implementing backend
- All API types must live in `/packages/types`
- Frontend must never define its own API types

Example:

```ts
export type Event = {
  id: string;
  title: string;
  date: string; // ISO string (UTC)
  participants: string[];
};
```

- Always assume network failures
- Always handle loading and error states

---

## API Layer

- All network calls go through `/packages/api`
- Never call `fetch` directly in components

Example:

```ts
export async function getEvents(): Promise<Event[]> {
  const res = await fetch(`${BASE_URL}/events`);
  return res.json();
}
```

---

## Server State Management (React Query)

- Use React Query for all server state
- Do not store server data in local/global state manually
- Use queries for fetching and mutations for writes

Example:

```ts
import { useQuery } from '@tanstack/react-query';

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });
}
```

- Use meaningful query keys (e.g. `['events', eventId]`)
- Invalidate queries after mutations
- Handle loading and error states in UI

---

## Mocking (MSW)

- Use Mock Service Worker for local development

- Mocks must match real API contracts exactly

- Place handlers in `/packages/mocks`

- Simulate:
  - latency
  - errors
  - empty states

---

## React Native / Expo Guidelines

- Use functional components + hooks
- Prefer Expo APIs over custom native modules
- Keep UI and logic separate

Structure:

/features
/events
/components
/hooks
/api

---

## State Management Rules

- Server state → React Query
- UI state → local component state
- Avoid global state unless absolutely necessary

---

## Time & Dates (IMPORTANT)

- Always store dates in UTC (ISO string)
- Convert to local time only in UI
- Never trust device timezone blindly

---

## Notifications

- Design notification payloads early
- Always include eventId in payload
- Handle foreground and background cases

---

## Code Style

- Use descriptive names
- Avoid magic values
- Prefer early returns
- Keep functions small and pure

---

## Avoid

- Calling APIs directly inside components
- Duplicating types between frontend and backend
- Overengineering (no premature abstractions)
- Storing server state outside React Query
- Large unstructured files

---

## Preferred Patterns

- Feature-based folder structure
- API layer abstraction
- Shared types package
- Mock-first development
- React Query for all async data

---

## Copilot Guidance

When generating code:

- Always use existing types from `/packages/types`
- Prefer existing API utilities from `/packages/api`
- Use React Query for all data fetching
- Follow project structure strictly
- Do not introduce new libraries unless necessary
- Ask for clarification if API shape is unclear

---

## Future Backend Integration

- Backend must follow contracts from `/packages/types`
- Avoid breaking changes in API
- Use versioning if needed

---

## Goal

Ship fast, iterate quickly, and keep the codebase clean and maintainable.
