# Contributing — Nolia Office #test

Este es un proyecto personal, pero sigue un flujo de trabajo profesional para mantener calidad y evitar regresiones.

## Flujo de trabajo
1. Crea una rama con prefijo:
   - `feat/`, `fix/`, `refactor/`, `ci/`, `docs/`, `chore/`
2. Abre un Pull Request.
3. Completa el template del PR (Objetivo, Cambios, Cómo probar, Riesgos, Rollback).
4. CI debe quedar verde.
5. Ejecuta Golden Paths si aplica:
   - Ver `docs/qa/golden-paths.md`.

## Commits
Preferencia: Conventional Commits:
- `feat: ...`
- `fix: ...`
- `refactor: ...`
- `docs: ...`
- `ci: ...`
- `chore: ...`

## Rollback
- El rollback estándar es revertir el PR completo (GitHub "Revert" o `git revert`).
- No se aplican fixes directos sobre `main`.
