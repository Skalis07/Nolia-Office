# Workflow de desarrollo — Nolia Office

Este proyecto se mantiene con un flujo de trabajo estricto para evitar regresiones y mantener PRs pequeños y reversibles.

## Reglas base (no negociables)
- **Todo cambio entra vía Pull Request.**
- **PRs pequeños:** 1 objetivo por PR.
- **Nada entra a `main` sin CI verde.**
- **Rollback estándar:** revertir el PR completo (no fixes directos en `main`).

## Convenciones
### Ramas
Usa prefijos:
- `chore/` · tareas de mantenimiento
- `ci/` · cambios de CI/CD
- `refactor/` · refactors sin cambio funcional
- `feat/` · nuevas features
- `fix/` · correcciones
- `docs/` · documentación

Ejemplo: `refactor/extract-audio-module`

### Commits
Preferencia: **Conventional Commits**
- `feat: ...`
- `fix: ...`
- `refactor: ...`
- `chore: ...`
- `docs: ...`
- `ci: ...`

## Pull Requests
Cada PR debe incluir (usando el template):
- Objetivo
- Cambios
- Cómo probar (Golden paths)
- Riesgos
- Rollback

### DoD (Definition of Done)
Un PR está “hecho” cuando:
- CI está **verde**
- Golden paths pasados (si aplica)
- Documentación actualizada si cambió el proceso

## QA (Golden Paths)
> Los golden paths son un checklist manual repetible.  
> Fuente de verdad: `docs/qa/golden-paths.md`

Regla práctica:
- Si el PR afecta **runtime/UI** → **sí o sí** correr golden paths.
- Si el PR es **solo docs/ci/chore** y no afecta runtime → golden paths opcional, CI siempre.

## Rollback (revertir un PR)
> Regla: con `main` protegido, el revert **siempre** entra vía PR (no push directo a `main`).

### Opción A — GitHub (recomendado)
1. Abre el PR que ya fue mergeado.
2. Presiona **Revert**.
3. GitHub crea una rama y un PR con el revert.
4. CI corre.
5. Merge del PR de revert.

### Opción B — Terminal + PR (cuando no usas el botón)
> Nota: si el merge fue un “merge commit”, normalmente necesitas `-m 1`.

- Crear rama de revert:
  - `git checkout main`
  - `git pull`
  - `git checkout -b revert/<pr-o-sha>`

- Revertir un merge commit:
  - `git revert -m 1 <SHA_DEL_MERGE_COMMIT>`

- Push y PR:
  - `git push -u origin revert/<pr-o-sha>`
  - Abrir PR hacia `main` y esperar CI

- Revertir varios PRs:
  - Revertir en orden inverso (del más reciente al más antiguo) en la misma rama de revert.
