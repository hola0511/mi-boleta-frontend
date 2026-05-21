# Mi Boleta Frontend

Frontend web para la aplicación **Mi Boleta**, una plataforma para registrar, consultar y administrar boletas, rifas, loterías y sorteos.

Este proyecto consume una API REST externa desarrollada con Node.js, Express, TypeScript, Prisma y JWT.

> Nota: el backend no se modifica desde este repositorio. Este repositorio contiene únicamente la solución frontend.

---

## Tabla de contenido

- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Funcionalidades principales](#funcionalidades-principales)
- [Requisitos previos](#requisitos-previos)
- [Instalación del proyecto](#instalación-del-proyecto)
- [Configuración de variables de entorno](#configuración-de-variables-de-entorno)
- [Ejecución del proyecto](#ejecución-del-proyecto)
- [Configuración del backend](#configuración-del-backend)
- [Endpoints consumidos](#endpoints-consumidos)
- [Flujo de uso](#flujo-de-uso)
- [Usuario administrador](#usuario-administrador)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Scripts disponibles](#scripts-disponibles)
- [Notas importantes](#notas-importantes)

---

## Tecnologías utilizadas

- Next.js
- React
- TypeScript
- CSS
- API REST
- JWT Authentication
- LocalStorage para manejo de sesión

---

## Funcionalidades principales

- Registro de usuarios
- Inicio de sesión
- Cierre de sesión
- Manejo de token JWT
- Dashboard de usuario
- Creación de boletas
- Listado de boletas
- Edición de boletas
- Eliminación de boletas
- Resumen de juegos registrados
- Visualización de próximos sorteos
- Panel de administrador
- Filtros por estado, tipo de juego y búsqueda
- Diseño responsive básico

---

## Requisitos previos

Antes de instalar y ejecutar este proyecto, debes tener instalado:

- Node.js
- npm
- Git

También debes tener el backend de **Mi Boleta API** ejecutándose localmente en:

```txt
http://localhost:4000/api/v1
```

---

## Instalación del proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/mi-boleta-frontend.git
```

> Cambia `TU_USUARIO` por tu usuario real de GitHub.

---

### 2. Entrar a la carpeta del proyecto

```bash
cd mi-boleta-frontend
```

---

### 3. Instalar dependencias

```bash
npm install
```

---

## Configuración de variables de entorno

Crea un archivo llamado **`.env.local`** en la raíz del proyecto.

La estructura debe quedar así:

```txt
mi-boleta-frontend/
├── .env.local
├── package.json
├── src/
```

Dentro del archivo `.env.local`, agrega la siguiente variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

Esta variable indica la URL base del backend que consume el frontend.

> Importante: el archivo `.env.local` no debe subirse al repositorio.

---

## Ejecución del proyecto

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

Luego abre el navegador en:

```txt
http://localhost:3000
```

Si todo está correctamente configurado, deberías poder ver la pantalla inicial del frontend.

---

## Configuración del backend

Este frontend depende de que el backend esté funcionando correctamente.

El backend debe tener configurada su base de datos PostgreSQL y sus migraciones de Prisma ejecutadas.

Ejemplo de variable esperada en el backend:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/boletas_db?schema=public"
JWT_SECRET="mi_clave_secreta"
PORT=4000
```

Para ejecutar las migraciones en el backend:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

Para levantar el backend:

```bash
npm run dev
```

El backend debe quedar disponible en:

```txt
http://localhost:4000/api/v1
```

---

## Endpoints consumidos

El frontend consume los siguientes endpoints del backend.

### Autenticación

```txt
POST /auth/register
POST /auth/login
```

### Tickets

```txt
GET    /tickets
POST   /tickets
GET    /tickets/:id
PUT    /tickets/:id
DELETE /tickets/:id
```

### Administrador

```txt
GET /admin/tickets
```

Los endpoints de tickets y administrador requieren autenticación mediante Bearer Token.

---

## Flujo de uso

1. El usuario crea una cuenta desde la pantalla de registro.
2. Luego inicia sesión.
3. El backend responde con un token JWT.
4. El frontend guarda el token en `localStorage`.
5. El token se envía en cada petición protegida mediante el header `Authorization`.
6. El usuario puede crear, editar, consultar y eliminar sus boletas.
7. Si el usuario tiene rol `admin`, puede acceder al panel administrativo.

---

## Usuario administrador

Para usar el panel de administrador, primero se debe registrar un usuario normalmente.

Luego, en la base de datos del backend, se debe actualizar su rol:

```sql
UPDATE users 
SET role = 'admin' 
WHERE email = 'correo@ejemplo.com';
```

Después de hacer este cambio, el usuario debe cerrar sesión e iniciar sesión nuevamente para obtener un nuevo token JWT con el rol actualizado.

---

## Estructura del proyecto

```txt
src/
├── app/
│   ├── admin/
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── TicketForm.tsx
│   └── TicketTable.tsx
├── context/
│   └── AuthContext.tsx
├── lib/
│   └── api.ts
└── types/
    └── index.ts
```

---

## Scripts disponibles

### Ejecutar en desarrollo

```bash
npm run dev
```

Inicia el servidor local de desarrollo en:

```txt
http://localhost:3000
```

---

### Compilar para producción

```bash
npm run build
```

Este comando genera la versión optimizada del proyecto.

---

### Ejecutar versión de producción

```bash
npm start
```

Este comando ejecuta la aplicación previamente compilada con `npm run build`.

---

### Ejecutar validación de lint

```bash
npm run lint
```

Este comando revisa posibles errores de estilo o sintaxis en el código.
