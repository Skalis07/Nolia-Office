/* global YT */
import { AUDIO_CONFIG } from "./config/audio.js";
import { ICONS } from "./config/icons.js";

// App principal: mueve la lógica del script inline a un módulo.
// Recibe la lista de GIFs desde el HTML (build-time) y arranca la UI.
export function initApp({ gifUrls = [] } = {}) {
  
    /* ---------------------------------------------------------------------------
       CONSTANTES DE CONFIGURACIÓN E ÍCONOS
       - Definidas en scripts externos cargados antes de este bloque.
      --------------------------------------------------------------------------- */
    const DEFAULT_RAIN_VOL = AUDIO_CONFIG.DEFAULT_RAIN_VOL;

    const ICON_PLAY = ICONS.ICON_PLAY;
    const ICON_PAUSE = ICONS.ICON_PAUSE;
    const ICON_CLOUD = ICONS.ICON_CLOUD;
    const ICON_CLOUD_RAIN = ICONS.ICON_CLOUD_RAIN;

    // Normaliza la lista recibida desde main.js (data-gifs) para evitar errores.
    const GIF_URLS = Array.isArray(gifUrls) ? gifUrls : [];

    /* ---------------------------------------------------------------------------
      BASE_URL (Astro) - helper ÚNICO para rutas (local + GitHub Pages)
      - Usa data-base={import.meta.env.BASE_URL} que ya pusiste en <div class="page">
      - asset("x.png") => URL absoluta correcta, incluso si el sitio vive en /Nolia-Office/
      --------------------------------------------------------------------------- */
    const baseRaw = document.querySelector('.page')?.dataset.base || '/'; // BASE desde Astro (fallback "/")
    const BASE = baseRaw.endsWith('/') ? baseRaw : baseRaw + '/';         // Asegura slash final
    const asset = (path) =>                                               // Helper para assets
      new URL(String(path).replace(/^\//, ''), location.origin + BASE).href;

    /* ===========================================================================
       VARIABLES DE ESTADO (MÚSICA Y LLUVIA)
       =========================================================================== */

    let playerMusic;           // Instancia del reproductor YouTube (solo audio)
    let isMusicPlaying = false; // Estado de reproducción de música
    let isRainPlaying  = false; // Estado del sonido de lluvia
    let rainAudio;             // Referencia al elemento <audio> de lluvia

    /* ===========================================================================
       REFERENCIAS A ELEMENTOS DEL DOM
       - Se asignan una sola vez cuando el player está listo.
       =========================================================================== */
    let btnMusic;    // Botón play/pause
    let btnRain;     // Botón lluvia
    let volMusic;    // Slider de volumen
    let btnShuffle;  // Botón cambiar GIF
    let gifImg;      // Imagen del GIF principal

    /* ===========================================================================
       CARGA DINÁMICA DE LA API DE YOUTUBE
       - Inserta el script oficial de YouTube IFrame API.
       - Necesario para crear YT.Player.
       =========================================================================== */

    const ytScript = document.createElement('script'); // Crea <script>
    ytScript.src = 'https://www.youtube.com/iframe_api'; // API oficial
    document.head.appendChild(ytScript); // Se agrega al <head>

    /* ===========================================================================
       CALLBACK GLOBAL REQUERIDO POR YOUTUBE
       - YouTube llama automáticamente a esta función cuando la API está lista.
       =========================================================================== */
    window.onYouTubeIframeAPIReady = function () {

      /* Crear reproductor de YouTube SOLO PARA AUDIO */
      playerMusic = new YT.Player('ytplayerMusic', {
        videoId: '8kBlKM71pjc', // ID del video de YouTube (música)
        playerVars: {
          autoplay: 0,   // No reproducir automáticamente
          controls: 0,   // Ocultar controles nativos
          rel: 0,        // No mostrar videos relacionados
          playsinline: 1 // Reproducir inline en móviles
        },
        events: {
          onReady: onPlayersReady // Se dispara cuando el player está listo
        }
      });
    };


    /* ===========================================================================
       CALLBACK: onPlayersReady
       - Se ejecuta cuando el reproductor de YouTube queda listo.
       - Aplica volúmenes iniciales.
       - Conecta (una sola vez) los controles de la UI.
       - Inicializa helpers del GIF.
       =========================================================================== */
    function onPlayersReady() {

      /* -------------------------------------------------------------------------
         1) APLICAR SIEMPRE EL VOLUMEN ACTUAL AL PLAYER DE YOUTUBE
         - Esto se ejecuta cada vez que algún player “ready-ea”.
         - Se protege con try/catch para evitar errores silenciosos.
         ------------------------------------------------------------------------- */
      try {
        const volEl = document.getElementById('volumeMusic'); // Slider de volumen
        const volValue = volEl ? Number(volEl.value) : 100;   // Fallback a 100%

        // Verifica que el player exista y tenga el método setVolume
        if (playerMusic && typeof playerMusic.setVolume === 'function') {
          playerMusic.setVolume(volValue); // Aplica volumen a YouTube
        }
    } catch {
        // Error ignorado intencionalmente (no rompe la UI si algo falla)
      }

      /* -------------------------------------------------------------------------
         2) VOLUMEN INICIAL DEL AUDIO LOCAL DE LLUVIA
         - Se convierte el porcentaje (0–100) a rango 0.0–1.0.
         ------------------------------------------------------------------------- */
      rainAudio = document.getElementById('rainAudio'); // <audio> de lluvia
      if (rainAudio) {
        rainAudio.volume = DEFAULT_RAIN_VOL / 100; // Ej: 60 → 0.6
      }

      /* -------------------------------------------------------------------------
         3) EVITAR REGISTRAR EVENTOS MÁS DE UNA VEZ
         - Si btnMusic ya existe, significa que el wiring ya ocurrió.
         - Previene listeners duplicados si YouTube re-inicializa el player.
         ------------------------------------------------------------------------- */

      if (btnMusic) return;

      /* -------------------------------------------------------------------------
         4) CACHEAR REFERENCIAS AL DOM (UNA SOLA VEZ)
         - Mejora performance y claridad.
         ------------------------------------------------------------------------- */
      btnMusic   = document.getElementById('musicToggle'); // Botón música
      btnRain    = document.getElementById('rainToggle');  // Botón lluvia
      volMusic   = document.getElementById('volumeMusic'); // Slider volumen
      btnShuffle = document.getElementById('gifShuffle');  // Botón cambiar GIF
      gifImg     = document.getElementById('mainGif');     // Imagen principal GIF

      // Guardia: evita crash si algún elemento falta (IDs cambiados, embed, etc.)
      if (!btnMusic || !btnRain || !volMusic || !btnShuffle || !gifImg) return;

      /* -------------------------------------------------------------------------
         HELPERS DE ESTADO (UI)
         - Centraliza cambios de icono/aria/estado sin tocar la lógica.
         ------------------------------------------------------------------------- */
      function setMusicState(playing) {
        btnMusic.innerHTML = playing ? ICON_PAUSE : ICON_PLAY;
        btnMusic.setAttribute('aria-label', playing ? 'Pausar música' : 'Reproducir música');
        isMusicPlaying = playing;
      }

      function setRainState(playing) {
        if (playing) {
          btnRain.classList.add('active');
          btnRain.innerHTML = ICON_CLOUD_RAIN;
          btnRain.setAttribute('aria-label','Apagar lluvia');
        } else {
          btnRain.classList.remove('active');
          btnRain.innerHTML = ICON_CLOUD;
          btnRain.setAttribute('aria-label','Activar lluvia');
        }
        isRainPlaying = playing;
      }


      /* ===========================================================================
         EVENTOS DE INTERFAZ
         =========================================================================== */

      /* -------------------------------------------------------------------------
         BOTÓN PLAY / PAUSE DE LA MÚSICA (YouTube)
         ------------------------------------------------------------------------- */
      btnMusic.addEventListener('click', () => {
        if (!isMusicPlaying) {
          playerMusic.playVideo();                          // Reproduce música
          setMusicState(true);                              // Actualiza estado/UI
        } else {
          playerMusic.pauseVideo();                         // Pausa música
          setMusicState(false);
        }
      });

      /* -------------------------------------------------------------------------
         SLIDER DE VOLUMEN DE LA MÚSICA (YouTube)
         - Se ejecuta mientras el usuario arrastra el control.
         ------------------------------------------------------------------------- */
      volMusic.addEventListener('input', () => {
        if (playerMusic && typeof playerMusic.setVolume === 'function') {
          playerMusic.setVolume(Number(volMusic.value)); // Aplica nuevo volumen
        }
      });

      /* -------------------------------------------------------------------------
         BOTÓN DE LLUVIA (AUDIO LOCAL)
         - Play / Pause del sonido ambiental.
         - Cambia icono, clase y aria-label.
         ------------------------------------------------------------------------- */
      btnRain.addEventListener('click', () => {
        if (!rainAudio) return; // Seguridad: si no existe, no hacemos nada

        if (!isRainPlaying) {
          // En móviles, el primer play requiere gesto del usuario (este click)
          rainAudio.currentTime = 0;            // (Opcional) reinicia audio
          rainAudio.play();                     // Reproduce lluvia
          setRainState(true);                   // Actualiza estado/UI
        } else {
          rainAudio.pause();                    // Pausa lluvia
          setRainState(false);
        }
      });

      /* -------------------------------------------------------------------------
         INICIALIZACIONES FINALES
         - Bloquea proporción del contenedor según el GIF.
         - Activa el rotador de GIFs.
         ------------------------------------------------------------------------- */
      lockAspectFrom(gifImg);                   // Fija aspect-ratio inicial
      setupGifRotator(btnShuffle, gifImg);      // Habilita cambio de GIFs
    }


    /* ===========================================================================
       MODO OSCURITO (TIRITA SOL / LUNA)
       - Controla el cambio entre modo día y modo noche.
       - Usa una “tirita” vertical fija con una bolita (thumb).
       - Aplica una capa oscura + estilos visuales.
       - Incluye sonido al alternar.
       =========================================================================== */
    (function(){

      /* -------------------------------------------------------------------------
         REFERENCIAS AL DOM
         ------------------------------------------------------------------------- */

      const handle   = document.getElementById('rightHandle'); // Contenedor fijo de toda la tirita
      const track    = document.getElementById('rightTrack');  // Riel vertical clickeable
      const thumb    = document.getElementById('modeThumb');   // Bolita sol/luna
      const overlay  = document.getElementById('dimOverlay');  // Capa de oscurecido de la página

      // Seguridad: si falta algún elemento crítico, abortamos todo el bloque
      if (!handle || !track || !thumb || !overlay) return;

      /* -------------------------------------------------------------------------
         ICONOS SVG (INLINE) PARA LA BOLITA
         ------------------------------------------------------------------------- */

      // Icono de Sol (modo día)
      const ICON_SUN =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
        '<path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zm9-10v-2h-3v2h3zm-2.93 7.07l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM12 6a6 6 0 100 12 6 6 0 000-12zm7.24-1.16l-1.8-1.79-1.79 1.79 1.79 1.79 1.8-1.79zM4.84 17.24l-1.79 1.79 1.79 1.79 1.79-1.79-1.79-1.79z"/>' +
        '</svg>';

      // Icono de Luna (modo noche)
      const ICON_MOON =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
        '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>' +
        '</svg>';

      /* -------------------------------------------------------------------------
         SONIDO DEL INTERRUPTOR (CLICK DE LA TIRITA)
         ------------------------------------------------------------------------- */

      // Construye la URL del sonido respetando subcarpetas (local / GitHub Pages)
      const SWITCH_URL = asset('audio/light_switch.mp3');

      const switchSfx = new Audio(SWITCH_URL); // Audio del interruptor
      switchSfx.preload = 'auto';              // Precarga el sonido
      switchSfx.volume = 0.7;                  // Volumen del efecto (0.0 a 1.0)
      switchSfx.playbackRate = 1.0;             // Velocidad normal

      // Reproduce el sonido del interruptor de forma segura
      function playSwitch() {
        try {
          switchSfx.currentTime = 0;            // Reinicia para permitir clics rápidos
          const p = switchSfx.play();           // Reproduce el sonido
          if (p && typeof p.catch === 'function') {
            p.catch(() => {});                  // Ignora bloqueos de autoplay
          }
        } catch {
          // Error ignorado intencionalmente
        }
      }

      /* -------------------------------------------------------------------------
         ESTADO INTERNO
         ------------------------------------------------------------------------- */

      let oscuro = false; // false = Día (Sol), true = Noche (Luna)

      /* -------------------------------------------------------------------------
         APLICAR ESTADO VISUAL SEGÚN EL MODO
         ------------------------------------------------------------------------- */
      function aplicarEstado() {
        overlay.classList.toggle('activo', oscuro);          // Activa/desactiva oscurecido
        handle.classList.toggle('activo', oscuro);           // Cambia apariencia de la tirita
        document.body.classList.toggle('oscuro', oscuro);    // Estilos globales (barra música)
        thumb.setAttribute('aria-pressed', String(oscuro));  // Accesibilidad
        thumb.innerHTML = oscuro ? ICON_MOON : ICON_SUN;     // Icono correcto
      }

      /* -------------------------------------------------------------------------
         ANIMACIÓN BREVE DE “ESTIRAMIENTO” DEL RIEL
         ------------------------------------------------------------------------- */
      function estirarTirita() {
        track.classList.add('stretch');                       // Agrega clase animada
        setTimeout(() => track.classList.remove('stretch'), 230);
      }

      /* -------------------------------------------------------------------------
         CAMBIAR ENTRE MODO DÍA / NOCHE
         ------------------------------------------------------------------------- */
      function alternar() {
        oscuro = !oscuro;                                    // Invierte el estado
        aplicarEstado();                                     // Aplica cambios visuales
        estirarTirita();                                     // Animación del riel
        playSwitch();                                        // Sonido del interruptor
      }

      /* -------------------------------------------------------------------------
         EVENTOS DE INTERACCIÓN
         ------------------------------------------------------------------------- */

      // Click en el riel completo (excepto la bolita)
      track.addEventListener('click', (e) => {
        if (e.target === thumb) return; // Evita doble activación
        alternar();
      });

      // Click directo en la bolita
      thumb.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el evento suba al riel
        alternar();
      });

      // Estado inicial al cargar: modo día
      aplicarEstado();

    })();


    /* ===========================================================================
       BLOQUEAR PROPORCIÓN SEGÚN EL PRIMER GIF
       - Lee el tamaño natural del <img> inicial.
       - Fija aspect-ratio en el contenedor .img-redondeada.
       - Evita saltos de layout al cambiar GIFs.
       - En móviles deja que el CSS (vh) mande.
       =========================================================================== */
    function lockAspectFrom(imgEl) {

      // Seguridad: si no hay imagen, salimos
      if (!imgEl) return;

      // Busca el contenedor del GIF
      const container = imgEl.closest('.img-redondeada');
      if (!container) return;

      // Función que aplica el comportamiento correcto
      const apply = () => {

        /* -----------------------------------------------------------------------
           MÓVILES: NO fijar aspect-ratio
           - El CSS define la altura con vh (ej: 72vh).
           ----------------------------------------------------------------------- */
        if (window.matchMedia('(max-width: 520px)').matches) {
          container.style.aspectRatio = '';    // Limpia ratio inline si existía
          setCover(imgEl);                      // Imagen cubre el contenedor
          return;
        }

        /* -----------------------------------------------------------------------
           ESCRITORIO: fijar aspect-ratio según el primer GIF
           ----------------------------------------------------------------------- */
        const w = imgEl.naturalWidth;           // Ancho real del GIF
        const h = imgEl.naturalHeight;          // Alto real del GIF
        if (!w || !h) return;                   // Seguridad

        container.style.height = '';            // Limpia height previo
        container.style.aspectRatio = `${w} / ${h}`; // Fija proporción
        setCover(imgEl);
      };

      // Si la imagen ya cargó, aplica de inmediato
      if (imgEl.complete) {
        apply();
      } else {
        // Si no, espera al evento load (una sola vez)
        imgEl.addEventListener('load', apply, { once: true });
      }
    }


    // Aplica el modo "cover" al <img> de forma consistente
    function setCover(imgEl) {
      if (!imgEl) return;
      imgEl.style.width = "100%";
      imgEl.style.height = "100%";
      imgEl.style.objectFit = "cover";
    }

    /* ===================================================================
      ROTADOR DE GIFs — V3 (PRO)
      - La lista se genera en build con import.meta.glob (Astro)
      - No hay fetch ni manifiesto externo
      - Todos los GIFs se precargan
      - Cambio de GIF SIEMPRE instantáneo
      =================================================================== */
    function setupGifRotator(btn, imgEl) {
      if (!btn || !imgEl) return;

      const urls = Array.isArray(GIF_URLS) ? GIF_URLS.slice() : []; // GIF_URLS viene de data-gifs (Astro build-time)
      const urlsAbs = urls.map((url) => new URL(url, location.href).href);

      let actual = 0;
      let ready = urls.length > 0;

      // Deshabilita el botón si no hay GIFs
      btn.disabled = !ready;
      btn.style.opacity = ready ? "1" : "0.5";

      if (!ready) {
        console.warn("GIF rotator: lista de GIFs vacía");
        return;
      }

      // Detectar GIF actual
      const current = new URL(imgEl.getAttribute("src"), location.href).href;
      const idx = urlsAbs.indexOf(current);
      actual = idx >= 0 ? idx : 0;

      // 🔥 PRE-CARGA REAL
      urls.forEach((url) => {
        const img = new Image();
        img.src = url;
      });

      // Click → siguiente GIF
      btn.addEventListener("click", () => {
        actual = (actual + 1) % urls.length;
        imgEl.src = urls[actual];
        setCover(imgEl);
      });
    }



    /* ===========================================================================
       AJUSTE AUTOMÁTICO DEL TÍTULO A UNA SOLA LÍNEA (VERSIÓN SUAVIZADA)
       - Escala el título horizontalmente para que nunca haga salto de línea.
       - Ajusta dinámicamente la altura del contenedor.
       - Usa ResizeObserver + requestAnimationFrame para rendimiento suave.
       - Se desactiva en embeds de Notion.
       =========================================================================== */
    (() => {
      try {

        /* -----------------------------------------------------------------------
           SALIDA TEMPRANA PARA NOTION EMBED
           ----------------------------------------------------------------------- */
        if (document.documentElement.classList.contains('embed-notion')) return;

        /* -----------------------------------------------------------------------
           REFERENCIAS AL DOM
           ----------------------------------------------------------------------- */
        const root  = document.documentElement;             // <html> (clases globales)
        const wrap  = document.querySelector('.title-wrap'); // Contenedor del título
        const title = document.getElementById('pageTitle');  // <h1> principal
        if (!wrap || !title) return;                         // Seguridad

        /* -----------------------------------------------------------------------
           VARIABLES DE CONTROL Y CACHÉ
           ----------------------------------------------------------------------- */
        let rafId = 0;            // ID del requestAnimationFrame activo

        let lastAvail  = NaN;     // Último ancho disponible medido
        let lastScale  = NaN;     // Última escala aplicada
        let lastSpacing = NaN;    // Última separación entre letras aplicada
        let lastHeight = NaN;     // Última altura aplicada al contenedor
        let lastFull   = null;    // Último estado fullscreen (browser-fullscreen)

        /* -----------------------------------------------------------------------
           CÁLCULO Y APLICACIÓN DEL ESCALADO
           ----------------------------------------------------------------------- */
        function computeAndApply() {
          rafId = 0;                                  // Libera el RAF actual

          const avail = wrap.clientWidth || 0;        // Ancho disponible
          const isFull = root.classList.contains('browser-fullscreen');

          // Evita recalcular si el ancho no cambió y el modo no cambió
          const modeUnchanged = lastFull !== null && isFull === lastFull;
          if (modeUnchanged && isFinite(lastAvail) && Math.abs(avail - lastAvail) < 1) return;
          lastAvail = avail;
          lastFull = isFull;

          // Medida base sin letter-spacing para calcular expansión sin distorsión
          const prevLetter = title.style.letterSpacing;
          title.style.letterSpacing = '0px';
          const base = title.scrollWidth || 1;        // Ancho real del texto (sin spacing)
          title.style.letterSpacing = prevLetter;
          if (!isFinite(base)) return;

          const textLen = (title.textContent || '').length;
          const gaps = Math.max(1, textLen - 1);

          let spacing = 0;
          let scale = 1;
          let origin = 'left top';

          if (avail >= base) {
            // En fullscreen, abrimos con letter-spacing y luego ajustamos con un scale leve
            if (isFull) {
              const neededSpacing = (avail - base) / gaps;
              const spacingWeight = 0.45; // reparte expansión entre spacing y scale
              const maxSpacing = 3.5; // px: evita separación excesiva
              spacing = Math.min(maxSpacing, Math.max(0, neededSpacing * spacingWeight));

              const expanded = base + spacing * gaps;
              if (expanded > 0 && expanded < avail) {
                const maxExpandScale = 1.18; // expansión leve, sin deformar demasiado
                scale = Math.min(maxExpandScale, avail / expanded);
                if (scale > 1) origin = 'center top';
              }
            }
          } else {
            // Si no cabe, reducimos con scaleX (no hay alternativa sin romper línea)
            spacing = 0;
            scale = Math.max(0.25, avail / base);
          }

          // Solo aplica si el cambio es perceptible
          if (!isFinite(lastScale) || Math.abs(scale - lastScale) > 0.005 || Math.abs(spacing - lastSpacing) > 0.25) {
            title.style.letterSpacing = spacing ? `${spacing}px` : '0px';
            title.style.transformOrigin = origin;
            title.style.transform = `scaleX(${scale})`;
            lastScale = scale;
            lastSpacing = spacing;

            // Ajusta la altura del wrapper según el título escalado
            const h = title.getBoundingClientRect().height;
            if (!isFinite(lastHeight) || Math.abs(h - lastHeight) > 0.5) {
              wrap.style.height = h + 'px';
              lastHeight = h;
            }
          }
        }

        /* -----------------------------------------------------------------------
           PLANIFICACIÓN SUAVIZADA DEL RECÁLCULO
           ----------------------------------------------------------------------- */
        function schedule() {
          if (rafId) return;                       // Evita múltiples RAF simultáneos
          rafId = requestAnimationFrame(computeAndApply);
        }

        /* -----------------------------------------------------------------------
           OBSERVADORES DE CAMBIO DE TAMAÑO
           ----------------------------------------------------------------------- */
        if (typeof ResizeObserver !== 'undefined') {
          const ro = new ResizeObserver(schedule); // Observa cambios de tamaño
          ro.observe(wrap);
        }

        window.addEventListener('resize', schedule, { passive: true }); // Fallback
        document.addEventListener('fullscreenchange', schedule);        // API fullscreen

        // Si cambia la clase en <html>, recalcula (ej: F11 detectado por script)
        if (typeof MutationObserver !== 'undefined') {
          const mo = new MutationObserver(() => schedule());
          mo.observe(root, { attributes: true, attributeFilter: ['class'] });
        }

        // Primera ejecución inicial
        schedule();

      } catch (err) {
        console.error('Title fit error:', err); // Log defensivo
      }
    })();
}
