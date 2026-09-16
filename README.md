# Bikeshare

Proyecto final de **Desarrollo de Aplicaciones Multiplataforma (2023–2025)**, Centro Educativo **Prat Educació**, realizado por **Cristopher Marrasquin, Raul Ip, Tony Reyna y Luis Vargas**.

BikeShare es una aplicación web y móvil orientada a la movilidad sostenible mediante el alquiler de bicicletas normales y eléctricas. Está pensada tanto para usuarios frecuentes de bicicletas como para quienes quieren empezar a usar este medio de transporte. Con un mapa interactivo, sistema de alquiler y desbloqueo, historial de uso y estadísticas personalizadas, la app facilita el acceso a la bicicleta compartida y fomenta su uso, ayudando a reducir las emisiones de CO₂ y mostrando al usuario el impacto ambiental positivo de sus trayectos.

Este repositorio contiene la app móvil, construida con **Expo / React Native** y **Supabase** (PostgreSQL + Auth) como backend.

La memoria completa del proyecto (objetivos, decisiones técnicas y manual de usuario) está en [`src/docs/B Memoria.pages`](src/docs/B%20Memoria.pages); este README resume y amplía su contenido pensando en quien se incorpore al código.

## Índice

- [Objetivos](#objetivos)
- [Funcionalidades](#funcionalidades)
- [Stack técnico](#stack-técnico)
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Base de datos](#base-de-datos-supabase)
- [Flujos principales](#flujos-principales)
- [Navegación](#navegación)
- [Puesta en marcha](#puesta-en-marcha)
- [Scripts disponibles](#scripts-disponibles)
- [Estado del proyecto](#estado-del-proyecto)

## Objetivos

**Objetivo principal**: que las personas puedan usar la bicicleta como medio de transporte, facilitando la conciencia ecológica mediante una app intuitiva y accesible.

**Objetivos específicos** (según la memoria del proyecto):

- Permitir a los usuarios localizar, reservar y desbloquear bicicletas a través de un mapa interactivo, sin necesidad de interacción física adicional (ir a un mostrador, etc.).
- Registrar el historial de uso: cada vez que un usuario finaliza un viaje, la app guarda automáticamente punto de inicio y fin, distancia recorrida, duración y fecha.
- Calcular el impacto ecológico generado: la app estima las emisiones de CO₂ evitadas en base a la distancia recorrida y se lo muestra al usuario en sus estadísticas, para incentivar una mayor conciencia medioambiental.

## Funcionalidades

- **Autenticación** (`src/screens/Auth`, `src/services/user.ts`): registro, login, recuperación de contraseña. Usa `supabase.auth` y guarda la sesión en `AsyncStorage` para no tener que loguear cada vez que se abre la app.
- **Mapa de bicicletas** (`src/screens/Rent/MapScreen.tsx`): muestra en un mapa (`react-native-maps`) las bicicletas y estaciones/ubicaciones disponibles, usando la posición del usuario (`expo-location`).
- **Alquiler y reserva** (`src/services/rent.ts`): iniciar un alquiler inmediato, reservar una bici con un tiempo límite de 1 hora, finalizar el viaje y liberar la bici.
- **Seguimiento de ruta** (`src/services/route.ts`): cada alquiler guarda su ubicación de inicio y de fin.
- **Perfil de usuario** (`src/screens/Info/ProfileScreen.tsx`, `src/components/totalStats.tsx`): datos del usuario, número total de viajes y una estimación de CO₂ ahorrado.
- **Historial de viajes** (`src/components/recentTrips.tsx`, `src/components/TripItem.tsx`): lista de viajes anteriores con fecha, hora y duración.
- **Planes, promociones y ayuda** (`(options)`): pantallas de planes, viajes gratis, contacto y ayuda.

## Stack técnico

| Área | Tecnología |
| --- | --- |
| Framework | [Expo](https://expo.dev) 52 + React Native 0.76 / React 18 |
| Navegación | [Expo Router](https://docs.expo.dev/router/introduction/) (rutas basadas en ficheros, como Next.js) |
| Backend / BD | [Supabase](https://supabase.com) (PostgreSQL + Auth + API autogenerada) |
| Estado global | [Zustand](https://github.com/pmndrs/zustand) (con persistencia en `AsyncStorage`) |
| Validación de formularios | [Zod](https://zod.dev) |
| Mapas y ubicación | `react-native-maps`, `expo-location` |
| Lenguaje | TypeScript |
| Tests | Jest (`jest-expo`) |

## Arquitectura del proyecto

```
src/
├── app/                 # Rutas de Expo Router (cada archivo = una pantalla)
│   ├── _layout.tsx        # Layout raíz: decide entre (tabs), (auth), (options)
│   ├── (auth)/             # login, register, forgot password
│   ├── (tabs)/              # home, map, account (barra de pestañas inferior)
│   └── (options)/            # perfil, planes, ayuda, contacto, historial...
├── screens/              # Implementación real de cada pantalla (los archivos de app/
│   │                       suelen ser wrappers finos que renderizan estos componentes)
│   ├── Auth/                # LoginScreen, RegisterScreen, ForgotScreen
│   ├── Rent/                 # MapScreen (mapa + alquiler), ReservationScreen
│   ├── Profile/                # profileCard
│   └── Info/                    # ProfileScreen, HelpScreen, ContactScreen, etc.
├── components/            # Piezas de UI reutilizables (tarjetas, listas, stats...)
├── services/               # Toda la comunicación con Supabase, agrupada por tabla/dominio
│   ├── supabase.ts           # Cliente único de Supabase (usa las env vars)
│   ├── user.ts                 # Auth: registro, login, logout, datos de usuario
│   ├── bike.ts                  # Consultar/actualizar bicicletas
│   ├── rent.ts                   # Crear/gestionar alquileres y reservas
│   ├── route.ts                   # Ruta (inicio/fin) de un alquiler
│   └── location.ts                 # Ubicaciones/estaciones
├── stores/                # Estado global con Zustand (p.ej. userStore: usuario logueado)
├── hooks/                  # Hooks personalizados (useFetchData)
├── utils/                   # Funciones puras: distancias, timestamps, validaciones (Zod)
└── constants/                # Textos y mensajes de la app (incluye notificaciones "con humor")
```

**Cómo se relacionan `app/` y `screens/`**: Expo Router exige que cada ruta sea un archivo dentro de `app/`, pero en este proyecto la lógica de cada pantalla vive en `screens/`. El archivo dentro de `app/` normalmente solo importa y renderiza el componente correspondiente de `screens/`. Esto separa "qué URL/ruta existe" de "cómo se implementa la pantalla".

## Base de datos (Supabase)

El backend es un proyecto de Supabase con 5 tablas principales. No hay ficheros `.sql` en el repo (el esquema se gestiona desde el panel de Supabase).

```
user                bike                 location
----                ----                 --------
id (PK, = auth.uid) id (PK)              id (PK)
email                status               location_name
name                 model                 address
dni                   current_location_id ─→ latitude
                        (FK → location.id)    longitude
   │
   │ user_id
   ▼
 rent                              route
 ----                              -----
 id (PK)                           id (PK)
 user_id      (FK → user.id)       rent_id            (FK → rent.id, 1-a-1)
 bike_id      (FK → bike.id) ──┐   start_location_id   (FK → location.id)
 status                        │   final_location_id    (FK → location.id)
 start_date                    │
 end_date                      │
 reservation_start             │
 reservation_end               │
                                └── una bici puede tener muchos alquileres a lo largo
                                    del tiempo, pero solo uno "activo" a la vez
```

### Tablas

- **`user`** — Perfil extendido del usuario. La `id` es la misma que genera `supabase.auth` al registrarse (`auth.users`); esta tabla añade los campos de negocio (`name`, `dni`) que Supabase Auth no guarda por defecto.
- **`bike`** — Cada bicicleta física. Campo clave: `status`, que va cambiando según el ciclo de vida del alquiler (`available` → `reserved`/`in_use` → `available` de nuevo). `current_location_id` apunta a dónde está la bici ahora mismo.
- **`location`** — Catálogo de ubicaciones/estaciones (nombre, dirección, latitud/longitud). La usan tanto `bike.current_location_id` como `route.start_location_id` / `route.final_location_id`.
- **`rent`** — El corazón del negocio: un alquiler o una reserva. `status` puede ser:
  - `reserved` → el usuario ha reservado la bici pero aún no la ha cogido (se guarda `reservation_start`/`reservation_end`, con 1 hora de margen).
  - `ongoing` → el usuario está usando la bici (`start_date` puesto, `end_date` vacío).
  - `completed` → el viaje ha terminado (`end_date` puesto).
- **`route`** — Guarda el punto de inicio y fin de cada alquiler (relación 1 a 1 con `rent` mediante `rent_id`). Sirve para saber de dónde a dónde se movió cada bici.

## Flujos principales

**Alquiler directo** (`createRent` en `src/services/rent.ts`):
1. Se inserta una fila en `rent` con `status: "ongoing"` y `start_date` = ahora.
2. Se cambia `bike.status` a `"in_use"`.
3. Se crea la fila correspondiente en `route` con la ubicación de inicio.

**Reserva** (`createReservation`):
1. Se inserta una fila en `rent` con `status: "reserved"`, `reservation_start` = ahora y `reservation_end` = ahora + 1 hora (`calculateEndTime`).
2. Se cambia `bike.status` a `"reserved"`.
3. Cuando el usuario recoge la bici, `handleRentStatus(id, "reserved")` pasa el alquiler a `ongoing` y fija `start_date`.

**Fin del alquiler** (`endRent`):
1. Se actualiza `rent` con `end_date` = ahora y `status: "completed"`.
2. La bici vuelve a `status: "available"` y su `current_location_id` se actualiza a la ubicación de devolución.
3. Se actualiza `route.final_location_id` con la ubicación final.

## Navegación

La app usa **Expo Router** con tres grupos de rutas (carpetas entre paréntesis, que no aparecen en la URL):

- **`(auth)`** — pila de pantallas sin sesión iniciada: `login`, `register`, `forgot`.
- **`(tabs)`** — pantallas principales con sesión iniciada, en una barra inferior: `index` (home), `map` (mapa/alquiler), `account` (cuenta).
- **`(options)`** — pantallas secundarias a las que se navega desde `account` u otras: perfil (`profileCard`), planes, ayuda, contacto, viajes gratis (`FreeRides`), novedades (`updates`), historial (`recentRents`), detalle de viaje (`Test`).

## Puesta en marcha

### 1. Requisitos previos

- Node.js LTS
- [Expo Go](https://expo.dev/go) en tu móvil, o un emulador Android/iOS
- Un proyecto de [Supabase](https://supabase.com) con las tablas descritas arriba (`user`, `bike`, `rent`, `route`, `location`)

### 2. Instalar dependencias

```bash
npm install
```

### 3. Variables de entorno

Crea un fichero `.env` en la raíz del proyecto:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima
# opcional: ubicación por defecto que se asigna a una bici cuando se devuelve
EXPO_PUBLIC_SIMULATION_LOCATION=id-de-una-location-de-ejemplo
```

Estas variables se leen en `src/services/supabase.ts` (conexión) y `src/utils/generateId.ts` (`simulationLocation`, usada para simular la ubicación de devolución de una bici en `changeLocation`).

### 4. Arrancar la app

```bash
npx expo start
```

Desde la salida del comando podrás abrir la app en:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- Emulador de [Android](https://docs.expo.dev/workflow/android-studio-emulator/) o [iOS](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm start` | Inicia el servidor de desarrollo de Expo |
| `npm run android` | Abre la app en un emulador/dispositivo Android |
| `npm run ios` | Abre la app en un simulador/dispositivo iOS |

## Estado del proyecto

Al ser un proyecto de prácticas/TIC en desarrollo, hay partes pensadas para pruebas o pendientes de pulir:

- `src/screens/TestScreen.tsx`, `TestScreenB.tsx` y `src/services/test.ts` son pantallas/servicios de prueba, no forman parte del flujo final de la app.
- `src/screens/Info/comingSoon.tsx` marca funcionalidades aún no implementadas.
- `src/hooks/useFetchData.ts` está vacío por ahora (hook reservado, sin implementar).
- Los mensajes de notificación (`src/constants/messages.ts`) están escritos con un tono informal/humorístico a propósito, pensado para la experiencia de usuario final.
- Según la propia memoria del proyecto, varias pantallas de `(options)` quedaron **solo a nivel estético**, sin lógica ni datos reales detrás, por falta de tiempo: `FreeRides` (viajes gratis con código promocional), `updates` (novedades), `plans` (planes Gratuito/Básico/Plus/Premium — solo hay un plan real en la base de datos) y `help`/`contact` (FAQ y contacto).

## Recursos

- [Documentación de Expo](https://docs.expo.dev/)
- [Documentación de Supabase](https://supabase.com/docs)
- [Expo Router](https://docs.expo.dev/router/introduction/)
