# Curso AngularJS · Ayesa · 20 h

REPL de aula: agenda temporizada a la izquierda, editor multiarchivo en el centro,
aplicación AngularJS 1.8.3 ejecutándose a la derecha.

## Calendario

El temario oficial es de 5 tardes, pero la primera semana hubo que dedicar tiempo
a JavaScript, así que las unidades 3–10 se comprimen en dos sesiones.

| Sesión | Fecha | Horario | Página | Módulos |
|---|---|---|---|---|
| 1 | lun 21 sep | 15:30–19:30 | `dia-01.html` | 1 · Introducción · 2 · Fundamentos (+ routing) |
| 2 | jue 24 sep | 15:30–19:30 | `dia-02.html` | 3 · Enlace de datos · 4 · Directivas · `angular.component` · 5 · Servicios y DI |
| 3 | lun 28 sep | 15:30–19:30 | `dia-03.html` | 6 · Ruteo avanzado y anidado · 7 · Formularios · 8 · APIs · 9 · Pruebas · 10 · Proyecto final |

`angular.component` (1.5+) no está en el temario oficial, pero se incluye en la
sesión 2 porque es el estilo que acerca AngularJS a Angular 2+ y el que se usa en
todos los ejemplos de la sesión 3.

## Archivos

- `dia-0N.html` — la página de cada sesión. Se generan con `build/build.ps1`.
- `preview.html` — documento anfitrión del iframe. Recibe el código por `localStorage`
  y se reescribe con `document.write` durante el parseo, de modo que conserva una URL
  real: sin eso el hash routing (`#!/ruta`) no funcionaría dentro del iframe.
- `build/part-1-head.html` — tokens de color, tipografías y todo el CSS.
- `build/part-2-markup.html` — el esqueleto de la página (la cabecera se rellena desde `SESSION`).
- `build/part-3-prism.html` — resaltado de sintaxis, común a todas las sesiones.
- `build/part-3-data-diaN.html` — **el temario de cada sesión**: `SESSION` y `STEPS`
  (notas, archivos de código, soluciones y retos).
- `build/part-4-app.html` — editor, resaltado, ejecución en vivo, consola y navegación.

### Lo que entiende el REPL

- `index.html` es el cuerpo de la página; el resto de `.html` van a `$templateCache`
  con su nombre (valen como `templateUrl`, también en ui-router).
- `.css` se inyecta como estilo; `.js` se ejecuta en el orden de las pestañas;
  `karma.conf.js` se enseña pero no se ejecuta.
- `.json` es una **API REST simulada en memoria** (decorador de `$httpBackend`, 400 ms
  de latencia): `api/cursos.json` define `GET/POST api/cursos` y
  `GET/PUT/PATCH/DELETE api/cursos/:id`. Cualquier otra URL `api/...` da 404 y
  cualquier URL con `error500` da 500. Cada petición se ve en la consola del REPL.
- `libs: [...]` en un paso añade librerías: `uirouter` (1.0.30), `messages`,
  `animate`, `mocks` (1.8.3) y `jasmine` (4.6.0, con el informe HTML en la vista).

## Regenerar las páginas

```powershell
powershell -File builduild.ps1
```

## Abrir en local

Las páginas no funcionan bien con doble clic (`file://` bloquea `localStorage`, y el
REPL cae al modo `srcdoc`, donde el routing por hash puede fallar). Sirve la carpeta:

```
npx http-server . -p 8080
```

En aula se usa la versión publicada, que sí tiene origen propio.

## Publicado

| Sesión | URL | Compartida |
|---|---|---|
| 1 | https://claude.ai/artifact/Q7huigsarBUs4VWfQsM7Cv | cualquiera con el enlace |
| 2 | https://claude.ai/artifact/7fegGMYKf6baZLh3WS4nLd | privada (compartir desde el menú Share) |
| 3 | https://claude.ai/artifact/2cz1Gqsncbrz4VBaCufMLU | privada (compartir desde el menú Share) |

Cada artifact publica `index.html` (la página del día) y `preview.html`. Las
URLs también están en `DAY_LINKS` (`build/part-4-app.html`) para la tira de días
de la cabecera.

## Aviso para futuras sesiones

En cdnjs, `angular-route` es una librería **independiente**:

- correcto: `cdnjs.cloudflare.com/ajax/libs/angular-route/1.8.3/angular-route.min.js`
- 404: `cdnjs.cloudflare.com/ajax/libs/angular.js/1.8.3/angular-route.min.js`

Lo mismo vale para `angular-animate`, `angular-sanitize`, `angular-mocks`, etc.
Verifica cada URL antes de publicar; los scripts de CDN fallan en silencio y lo
único que se ve es un `$injector:nomod`.
