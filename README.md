# Prueba Técnica - Task Management App

Aplicación web de gestión de tareas desarrollada con Angular utilizando arquitectura basada en signals, persistencia local y un tablero tipo Kanban con drag & drop.

---

# Tecnologías utilizadas

* Angular
* TypeScript
* Angular Signals
* Reactive Forms
* Tailwind CSS
* PrimeNG
* PrimeIcons
* HTML5 Drag & Drop / Angular CDK
* LocalStorage
* Vitest

---

# Instalación

## 1. Clonar repositorio

```bash
git clone https://github.com/SaidSuyv/grupo-mariposa-prueba-tecnica.git
cd grupo-mariposa-prueba-tecnica
```

---

## 2. Instalar dependencias

```bash
npm install
```

---

# Ejecución del proyecto

## Desarrollo

```bash
npm start
```

o

```bash
ng serve
```

La aplicación estará disponible en:

> [http://localhost:4200](http://localhost:4200)

---

# Ejecución de tests

```bash
npm run test
```

---

```bash
ng test
```

# Funcionalidades implementadas

* Creación de tareas
* Edición de tareas
* Eliminación de tareas
* Persistencia automática en LocalStorage
* Filtros por prioridad
* Organización por columnas tipo Kanban
* Reordenamiento mediante drag & drop
* Arquitectura reactiva utilizando Signals
* Testing unitario y de integración

# Decisiones técnicas tomadas

## Uso de Angular Signals

Se utilizó la API de Signals como mecanismo principal de manejo de estado en lugar de RxJS o NgRx debido a:

* menor complejidad para una aplicación pequeña
* reactividad más simple y explícita
* mejor integración con Angular moderno
* menor boilerplate
* requerimentos de proyecto

La lógica principal de estado se centralizó en un Store Service (`TaskStore`) para desacoplar la UI de la lógica de negocio.

## Persistencia mediante LocalStorage

Se utilizó LocalStorage para garantizar persistencia de datos tras refresh del navegador sin necesidad de backend.

La sincronización se realiza automáticamente mediante un `effect()` reactivo que detecta cambios en el estado de tareas.

## Uso de InjectionToken para configuración

La key de LocalStorage fue desacoplada utilizando un `InjectionToken` para:

* evitar hardcodes
* permitir separación entre entorno de desarrollo, producción y testing
* evitar contaminación de datos reales durante ejecución de tests

## Uso de TailwindCSS + PrimeNG

Se utilizó una combinación de:

* TailwindCSS para layout, spacing y utilidades rápidas
* PrimeNG para componentes complejos y aceleración de UI

Esto permitió mantener buena velocidad de desarrollo sin perder flexibilidad visual.

## Estrategia de testing

Se implementaron:

### Tests unitarios

Para validar:

* lógica del store
* CRUD de tareas
* filtros
* persistencia
* reordenamiento
* edge cases

### Tests de integración de componentes

Para validar:

* renderizado dinámico
* sincronización UI ↔ state
* interacción mediante drag & drop

# Trade-offs

## No se utilizó backend

La aplicación es completamente frontend y persiste únicamente en LocalStorage.

Ventajas:

* simplicidad
* velocidad de desarrollo
* menor complejidad de despliegue

Desventajas:

* no existe sincronización multiusuario
* los datos dependen del navegador/dispositivo
* no existe autenticación

## No se utilizó una librería global de state management

Se evaluó utilizar NgRx, pero para el tamaño del proyecto se consideró una complejidad innecesaria.

Se optó por Signals + Store Service por:

* simplicidad
* mantenibilidad
* menor boilerplate

## Cobertura de tests enfocada en lógica crítica

Se priorizó:

* lógica de negocio
* persistencia
* edge cases
* integración principal UI/state

En lugar de realizar testing exhaustivo visual o de librerías externas.

# Casos borde cubiertos

* LocalStorage corrupto
* Intento de mover tareas inexistentes
* Índices inválidos en drag & drop
* Strings vacíos
* Persistencia vacía
* Validaciones defensivas
* Reordenamiento con filtros activos

# Lo que no se alcanzó a implementar

## Optimización avanzada de testing E2E

No se implementaron pruebas E2E con herramientas como:

* Cypress
* Playwright

Debido a limitaciones de tiempo y porque el foco principal fue garantizar estabilidad de lógica mediante unit/integration testing.

## Accesibilidad avanzada

Se implementó estructura básica accesible, pero no se realizó auditoría completa de accesibilidad (ARIA, navegación por teclado completa, screen readers, etc), debido a limitaciones de tiempo.

# Arquitectura general

```txt
Components
   ↓
TaskStore (Signals)
   ↓
LocalStorage Persistence
```

La aplicación sigue una arquitectura simple basada en separación de responsabilidades:

* Componentes → UI e interacción
* Store → lógica y estado
* Persistencia → almacenamiento local

# Consideraciones finales

El proyecto fue enfocado en:

* mantenibilidad
* simplicidad
* reactividad moderna
* testing de lógica crítica
* experiencia de usuario fluida

priorizando una arquitectura escalable sin introducir complejidad innecesaria para el alcance planteado.
