# Cómo estudiar cualquier framework frontend

Da igual que sea AngularJS, Angular, Vue, React o Lit: todos resuelven los mismos cinco
problemas. Si entiendes cómo lo resuelve cada uno, entiendes el framework.

1. [Template syntax](#1-template-syntax)
2. [Ciclo de vida](#2-ciclo-de-vida)
3. [Router](#3-router)
4. [HTTP](#4-http)
5. [Inyección de dependencias y estado](#5-inyección-de-dependencias-y-estado)

Esta carpeta es una mini-SPA escrita en JavaScript puro (sin framework) que implementa
cada una de esas piezas a mano. Así se ve qué es lo que un framework nos da hecho.

| Archivo | Papel en la app |
|---|---|
| [index.html](index.html) | Página única: menú de navegación, `#outlet` y carga de `main.js` como módulo |
| [main.js](main.js) | Punto de entrada: importa el menú (router) y otros módulos |
| [pages/menu.js](pages/menu.js) | Router: escucha clics y carga la página con `import()` dinámico |
| [pages/page1.js](pages/page1.js) | Página 1: pide `data.json` por HTTP y pinta la lista en el DOM |
| [pages/page2.js](pages/page2.js) | Página 2: solo escribe en consola |
| [pages/page3.js](pages/page3.js) | Página 3: solo escribe en consola |
| [data.json](data.json) | El "backend": lista de personas `{id, name}` |

---

## 1. Template syntax

Todos los frameworks (Angular, Vue, React…) separan **qué se pinta** de **con qué datos**:

```html
<div>{{name}}</div>          <!-- Vista (V) -->
```
```js
{ "name": "Pedro" }          // Modelo (M)
```

Y el **Controlador (C)** reacciona a eventos (`click` →) y cambia el modelo. Si el modelo
es una lista:

```
1. Pedro
2. Antonio
```

el framework genera la vista sin que toquemos el DOM:

```html
<div>Pedro</div>
<div>Antonio</div>
```

Esto es el patrón **MVC** (Modelo, Vista, Controlador) y su evolución **MVVM**
(Modelo, Vista, VistaModelo), donde el enlace entre modelo y vista es automático
(*data binding*).

### En el código

En [pages/page1.js:8-11](pages/page1.js#L8-L11) está, como comentario, la plantilla
que escribiríamos con un framework:

```html
<div class="list" ngfor="let item of items">
    <div>{{item.id}}</div>
    <div>{{item.name}}</div>
</div>
```

Y en [pages/page1.js:13-25](pages/page1.js#L13-L25) está lo que realmente hay que hacer
sin framework: crear cada `div` con `document.createElement`, asignar `textContent`,
anidar con `appendChild` y colgarlo del `#outlet`. Cuatro líneas de plantilla contra
doce de DOM imperativo: ese es el trabajo que ahorra la template syntax.

La clase `.list` que usa la plantilla está definida en
[index.html:8-13](index.html#L8-L13) (grid de dos columnas: id y nombre).

**Qué buscar al estudiar un framework:** cómo interpola (`{{ }}`, `{ }`, `${ }`),
cómo itera (`ng-repeat`, `*ngFor`, `v-for`, `.map()`), cómo condiciona y cómo enlaza
eventos.

---

## 2. Ciclo de vida

Todo componente pasa por las mismas fases, aunque cada framework las llame distinto
(AngularJS, Angular, Vue, React, Lit…):

```
constructor  →  init  →  destroy
```

El estándar de la plataforma, los **Web Components** (sobre los que se apoya Lit),
lo muestra sin magia:

```js
class Elemento extends HTMLElement {
  constructor() {
    super();
    // TODO: preparar estado; aún no está en el DOM
  }
  connectedCallback() {
    // El componente entra en el árbol DOM → parentNode !== null
  }
  disconnectedCallback() {
    // El componente sale del DOM → parentNode === null. Limpiar listeners, timers…
  }
}
```

### En el código

Cada página exporta una función por defecto que hace de **init**: el router la
llama cuando la página "entra":

- [pages/page1.js:33-35](pages/page1.js#L33-L35) — `pagina1()` lanza `getData()`.
- [pages/page2.js:1-3](pages/page2.js#L1-L3) — `pagina2()` solo hace `console.log`.
- [pages/page3.js:1-3](pages/page3.js#L1-L3) — `pagina3()` solo hace `console.log`.

Lo que **falta** es la fase **destroy**: nadie vacía el `#outlet` al cambiar de página.
Si pulsas "pagina1" dos veces, la lista aparece duplicada. Un framework se encarga de
destruir la vista anterior; aquí tendríamos que hacerlo nosotros (por ejemplo,
`outlet.replaceChildren()` antes de pintar).

**Qué buscar:** `$onInit`/`$onDestroy` (AngularJS), `ngOnInit`/`ngOnDestroy` (Angular),
`mounted`/`unmounted` (Vue), `useEffect` y su función de limpieza (React),
`connectedCallback`/`disconnectedCallback` (Lit / Web Components).

---

## 3. Router

Dos formas de renderizar:

- **SPA** (*Single Page Application*): la renderización se hace en el **browser**.
  Es el modelo de AngularJS y Angular.
- **SSR** (*Server Side Rendering*): se viaja al **servidor** para renderizar (Node).
  En el mundo de Web Components / web "de siempre" el servidor puede estar escrito en
  cualquier lenguaje: C#, Rust, Go, C, C++, Python…

En una SPA el router necesita dos cosas:

1. **Metadata**: la tabla que asocia una ruta a un componente.
   ```js
   { path: "/", component: Home }
   ```
2. **Outlet**: el hueco donde se pinta el componente activo.
   ```html
   <outlet></outlet>
   ```

> Cuando escribo una **ruta**, lo que estoy definiendo es el **controlador** que
> atenderá esa URL. Cuando creo algo en Razor (o en cualquier motor de plantillas),
> estoy creando la **vista**.

### En el código

- **Metadata**: los enlaces de [index.html:17-21](index.html#L17-L21) llevan
  `data-page="1|2|3"` (atributos `data-*` de HTML5). Ese número es la "ruta".
- **Outlet**: [index.html:22](index.html#L22) → `<div id="outlet"></div>`, que
  [pages/page1.js:1](pages/page1.js#L1) recupera para pintar dentro.
- **Router**: [pages/menu.js](pages/menu.js):
  - función autoejecutable (`!function menu(){ … }()`),
  - *event delegation*: un único listener en `document` en lugar de uno por enlace,
  - `ev.composedPath()` para encontrar el nodo con `data-page`,
  - `import()` **dinámico** de `./page${page}.js` y llamada a `module.default()`
    ([pages/menu.js:7-10](pages/menu.js#L7-L10)): carga perezosa (*lazy loading*),
    igual que hacen los routers de los frameworks.

Diferencias con un router real: no cambia la URL (no hay `#!/ruta` ni History API),
así que no funcionan atrás/adelante ni los enlaces directos. Además `preventDefault()`
se aplica a **todos** los clics del documento, no solo a los del menú.

**Qué buscar:** `ngRoute` / `ui-router` (AngularJS), `RouterModule` y
`<router-outlet>` (Angular), `vue-router` y `<router-view>`, `react-router` y `<Outlet>`.

---

## 4. HTTP

- `XMLHttpRequest` → la API antigua, basada en callbacks.
- `fetch` → la actual, basada en promesas:
  - `response.text()` → devuelve el cuerpo como **texto**.
  - `response.json()` → parsea ese texto y devuelve un **objeto JS**.

### En el código

[pages/page1.js:27-31](pages/page1.js#L27-L31):

```js
async function getData(){
    const response = await fetch("data.json");
    drawData(await response.json())
}
```

`fetch` pide [data.json](data.json), `response.json()` lo convierte en un array de
personas y `drawData` lo pinta (sección 1). Falta el control de errores
(`response.ok`, `try/catch`), que un servicio de framework suele centralizar.

**Qué buscar:** `$http` (AngularJS), `HttpClient` + interceptores (Angular),
`fetch`/`axios` en Vue y React.

---

## 5. Inyección de dependencias y estado

La **inyección de dependencias** (DI) consiste en que un componente no crea sus
dependencias, sino que se las dan. Su gran ventaja es el **testing**: en una prueba
se inyecta un doble (un `fetch` falso, un servicio simulado) en lugar del real.
AngularJS y Angular (2+) la traen de serie.

El problema que aparece cuando **no** hay DI ni un estado compartido es el
**prop drilling**: pasar una propiedad de padre a hijo, de hijo a nieto y de nieto a
bisnieto, solo para que el último la use.

La idea de fondo: en JS el estado es un **objeto**; ese objeto vive en algún sitio
(un servicio, un store) y los **componentes** lo consumen.

```
js → objeto → estado → componente
```

### En el código

[pages/page1.js](pages/page1.js) no tiene DI: usa directamente `fetch` y
`document.getElementById('outlet')`. Para probar `pagina1()` habría que tener un
DOM real y un servidor sirviendo `data.json`. Con DI, recibiría ambas cosas como
parámetros (o las pediría a un inyector) y en el test se pasarían versiones falsas.

En [main.js](main.js) se ven las piezas sobre las que se construye todo esto: módulos
ES (`import`/`export`), importación con alias (`suma as sum`) y de espacio de nombres
(`* as op`) desde [operaciones.js](operaciones.js). Un inyector de dependencias no es
más que un registro que decide **qué** módulo/objeto entregar a **quién**.

**Qué buscar:** `angular.module().service/factory` e inyección por nombre (AngularJS),
`@Injectable` e `inject()` (Angular), `provide/inject` (Vue), Context (React).

---

## Resumen: checklist para cualquier framework

| Pieza | Pregunta | En esta carpeta |
|---|---|---|
| Template syntax | ¿Cómo paso del modelo a la vista? | [pages/page1.js](pages/page1.js) (DOM a mano) |
| Ciclo de vida | ¿Dónde inicializo y dónde limpio? | `export default` de [page1](pages/page1.js), [page2](pages/page2.js), [page3](pages/page3.js) — sin destroy |
| Router | ¿Cómo asocio ruta → componente → outlet? | [pages/menu.js](pages/menu.js) + [index.html](index.html) |
| HTTP | ¿Cómo pido datos y los convierto? | `fetch` en [pages/page1.js](pages/page1.js) |
| DI / estado | ¿Cómo comparto servicios y estado sin prop drilling? | No existe todavía |

## Ejecutar

`index.html` carga `main.js` con `type="module"`, y los módulos ES no funcionan con
`file://`. Sirve la carpeta:

```
npx http-server modules -p 8080
```
