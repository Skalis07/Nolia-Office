# Golden Paths (QA manual) — Nolia Office

Estos golden paths son el checklist que se repite en cada PR para asegurar que el comportamiento base no se rompe.

## Antes de empezar
- Ejecuta `npm run lint` (debe pasar)
- Ejecuta `npm run build` (debe pasar)
- Ejecuta `npm run dev` y prueba en la app

## 1) Carga inicial
- [ ] La página carga sin errores visibles.
- [ ] No hay pantalla en blanco.
- [ ] (Si miras la consola) no aparecen errores evidentes al cargar.

## 2) YouTube
- [ ] Play funciona.
- [ ] Pausa funciona.
- [ ] El volumen responde al control.
- [ ] Al cambiar modo (día/noche o escena) el estado queda consistente (no se rompe ni queda en estado raro).

## 3) Ambiente (lluvia)
- [ ] On/Off funciona.
- [ ] El volumen responde.
- [ ] No hay duplicación de sonido:
  - Prueba togglear varias veces (on/off) y verifica que no suenan “dos lluvias” superpuestas.

## 4) Cambio de GIF / escena
- [ ] Cambiar escena/GIF actualiza correctamente.
- [ ] No quedan elementos “pegados” de la escena anterior.

## 5) Modo día / noche
- [ ] El cambio día/noche funciona.
- [ ] No rompe otros estados (YouTube/lluvia).

## 6) Responsive básico
- [ ] Mobile (~360×800): usable, sin overflow grave.
- [ ] Desktop (~1366×768): layout correcto.

## 7) Embed Notion (si aplica)
- [ ] Si el PR toca Notion, el embed carga y no rompe el layout.

---

## Nota
- Si un PR no toca runtime/UI (solo docs o CI), puedes marcar QA manual como “N/A” en el PR.
