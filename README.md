en la raíz de tu frontend y pega esto:

# Mi Boleta Frontend

Frontend web para la aplicación **Mi Boleta**, una plataforma para registrar, consultar y administrar boletas, rifas, loterías y sorteos.

Este proyecto consume una API REST externa desarrollada con Node.js, Express, TypeScript, Prisma y JWT.  
El backend no se modifica desde este repositorio.

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

Antes de ejecutar este proyecto, debes tener instalado:

- Node.js
- npm
- Git

También debes tener el backend de **Mi Boleta API** ejecutándose localmente en:

```txt
http://localhost:4000/api/v1
Instalación

Clona este repositorio:

git clone https://github.com/TU_USUARIO/mi-boleta-frontend.git

Entra a la carpeta del proyecto:

cd mi-boleta-frontend

Instala las dependencias:

npm install
Variables de entorno

Crea un archivo .env.local en la raíz del proyecto:

mi-boleta-frontend/
├── .env.local
├── package.json
├── src/

Agrega la siguiente variable:

NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1

Importante: el archivo .env.local no debe subirse al repositorio.

Ejecutar el proyecto

Para iniciar el servidor de desarrollo:

npm run dev

Luego abre en el navegador:

http://localhost:3000
Endpoints consumidos

El frontend consume los siguientes endpoints del backend:

Autenticación
POST /auth/register
POST /auth/login
Tickets
GET    /tickets
POST   /tickets
GET    /tickets/:id
PUT    /tickets/:id
DELETE /tickets/:id
Administrador
GET /admin/tickets

Los endpoints de tickets y administrador requieren autenticación mediante Bearer Token.

Flujo de uso
El usuario crea una cuenta desde la pantalla de registro.
Luego inicia sesión.
El backend responde con un token JWT.
El frontend guarda el token en localStorage.
El token se envía en cada petición protegida.
El usuario puede crear, editar, consultar y eliminar sus boletas.
Si el usuario tiene rol admin, puede acceder al panel administrativo.
Estructura del proyecto
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
Configuración del backend

Este frontend depende de que el backend esté funcionando correctamente.

El backend debe tener configurada su base de datos PostgreSQL y sus migraciones de Prisma ejecutadas.

Ejemplo de variable esperada en el backend:

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/boletas_db?schema=public"
JWT_SECRET="mi_clave_secreta"
PORT=4000

Para ejecutar migraciones en el backend:

npm run prisma:generate
npm run prisma:migrate -- --name init
npm run dev
Usuario administrador

Para usar el panel de administrador, primero se debe registrar un usuario normalmente.

Luego, en la base de datos del backend, se debe actualizar su rol:

UPDATE users 
SET role = 'admin' 
WHERE email = 'correo@ejemplo.com';

Después de hacer este cambio, el usuario debe cerrar sesión e iniciar sesión nuevamente para obtener un nuevo token JWT con el rol actualizado.

Scripts disponibles

Ejecutar en desarrollo:

npm run dev

Compilar para producción:

npm run build

Ejecutar versión compilada:

npm start

Ejecutar validación de lint:

npm run lint
Notas importantes
El backend no forma parte de este repositorio.
No se debe subir .env.local.
La URL de la API debe configurarse mediante NEXT_PUBLIC_API_URL.
Si aparece una ruta como /undefined/auth/register, significa que la variable de entorno no está configurada correctamente.
Si el backend devuelve errores de Prisma como ECONNREFUSED o P1000, el problema está en la conexión con PostgreSQL, no en el frontend.
