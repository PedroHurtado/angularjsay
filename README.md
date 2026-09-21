# Curso AngularJS · Ayesa · 20 h

REPL de aula: agenda temporizada a la izquierda, editor multiarchivo en el centro,
aplicación AngularJS 1.8.3 ejecutándose a la derecha.

## Calendario

| Sesión | Fecha | Horario | Módulos |
|---|---|---|---|
| 1 | lun 21 sep | 15:30–19:30 | 1 · Introducción · 2 · Fundamentos (+ routing) |
| 2 | mar 22 sep | 15:30–19:30 | 3 · Enlace de datos · 4 · Directivas (inicio) |
| 3 | mié 23 sep | 15:30–19:30 | 4 · Directivas · 5 · Servicios y DI |
| 4 | jue 24 sep | 15:30–19:30 | 6 · Ruteo avanzado · 7 · Formularios |
| 5 | lun 28 sep | 15:30–19:30 | 8 · APIs · 9 · Pruebas · 10 · Proyecto final |

## Archivos

- `dia-01.html` — la página de la sesión 1. Se genera concatenando `build/part-*`.
- `preview.html` — documento anfitrión del iframe. Recibe el código por `localStorage`
  y se reescribe con `document.write` durante el parseo, de modo que conserva una URL
  real: sin eso el hash routing (`#!/ruta`) no funcionaría dentro del iframe.
- `build/part-1-head.html` — tokens de color, tipografías y todo el CSS.
- `build/part-2-markup.html` — el esqueleto de la página.
- `build/part-3-data.html` — **el temario**: las 10 unidades de la sesión, con notas,
  archivos de código, soluciones y retos. Es el único archivo que hay que tocar
  para preparar las sesiones siguientes.
- `build/part-4-app.html` — editor, resaltado, ejecución en vivo, consola y navegación.

## Regenerar la página

```powershell
$d = $PWD
$enc = New-Object System.Text.UTF8Encoding($false)
$sb = New-Object System.Text.StringBuilder
foreach ($p in @("part-1-head.html","part-2-markup.html","part-3-data.html","part-4-app.html")) {
  [void]$sb.AppendLine([System.IO.File]::ReadAllText("$d\build\$p", [System.Text.Encoding]::UTF8))
}
[System.IO.File]::WriteAllText("$d\dia-01.html", $sb.ToString(), $enc)
```

## Abrir en local

`dia-01.html` no funciona bien con doble clic (`file://` bloquea `localStorage`, y el
REPL cae al modo `srcdoc`, donde el routing por hash puede fallar). Sirve la carpeta:

```
npx http-server . -p 8080
```

En aula se usa la versión publicada, que sí tiene origen propio.

## Publicado

https://claude.ai/artifact/Q7huigsarBUs4VWfQsM7Cv — compartido con "cualquiera con
el enlace".

## Aviso para futuras sesiones

En cdnjs, `angular-route` es una librería **independiente**:

- correcto: `cdnjs.cloudflare.com/ajax/libs/angular-route/1.8.3/angular-route.min.js`
- 404: `cdnjs.cloudflare.com/ajax/libs/angular.js/1.8.3/angular-route.min.js`

Lo mismo vale para `angular-animate`, `angular-sanitize`, `angular-mocks`, etc.
Verifica cada URL antes de publicar; los scripts de CDN fallan en silencio y lo
único que se ve es un `$injector:nomod`.
