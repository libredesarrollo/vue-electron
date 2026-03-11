# Vue 3 + Electron + Vite + MySQL

Este proyecto es una aplicación de escritorio moderna que combina la potencia de **Electron** con la agilidad de **Vue 3** y **Vite**, utilizando una base de datos **MySQL** para la gestión de datos.

---

## 🚀 Tecnologías Utilizadas

- **Frontend**: [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- **Backend (API)**: [Express](https://expressjs.com/)
- **Desktop**: [Electron](https://www.electronjs.org/)
- **Base de Datos**: [MySQL](https://www.mysql.com/)
- **Estilos**: [Bootstrap 5](https://getbootstrap.com/)

---

## 🛠️ Requisitos Previos

1.  **Node.js**: Asegúrate de tener instalada una versión LTS.
2.  **MySQL**: Debes tener un servidor MySQL corriendo.
3.  **Base de Datos**: Importa el archivo `electron_vue.sql` en tu servidor MySQL para crear las tablas necesarias (`tasks`, `users`, `user_tokens`).

---

## 📦 Instalación

1.  Clona el repositorio:
    ```bash
    git clone [url-del-repositorio]
    cd vue-electron
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Configura la base de datos en `rest/db-mysql.js`:
    ```javascript
    const connection = mysql.createPool({
        'host': '127.0.0.1',
        'user': 'tu_usuario',
        'password': 'tu_password',
        'database': 'taskelectron'
    });
    ```

---

## 🏃‍♂️ Ejecución en Desarrollo

Para ejecutar el proyecto en modo desarrollo, necesitas iniciar el servidor de frontend (Vite) y luego lanzar Electron.

### Paso 1: Iniciar Vite (Frontend)
En una terminal:
```bash
npm run dev
```

### Paso 2: Iniciar Electron
En otra terminal:
```bash
npm start
```

### Paso 3: Express
En otra Terminal
```
node rest/app.js
```

*Nota: El servidor API de Express se inicia automáticamente como parte del proceso de Electron en este proyecto.*

---

## 🏗️ Estructura del Proyecto

- `main.js`: Proceso principal de Electron.
- `auth.js`: Gestión de ventanas de autenticación (Login/Registro).
- `src/`: Código fuente de la interfaz Vue 3.
  - `pages/`: Componentes de página (Lista de tareas, Login, etc.).
  - `router.js`: Configuración de rutas de Vue Router.
- `rest/`:
  - `app.js`: Servidor API con Express.
  - `db-mysql.js`: Conexión y consultas a MySQL.
- `index.html`: Punto de entrada para Vite.
- `vite.config.js`: Configuración de compilación y alias.

---

## 📝 Notas de Implementación

- **Seguridad**: Se utiliza un sistema de tokens almacenados en la base de datos para la sesión del usuario.
- **Conexión Robusta**: El sistema utiliza `mysql2` con un **Pool de conexiones** para evitar cierres inesperados por inactividad.
- **Router**: Utiliza `HashHistory` dentro de Electron para mayor compatibilidad con el sistema de archivos nativo.

---

## 📦 Construcción (Build)

Para empaquetar la aplicación para producción:

1.  Compila el frontend:
    ```bash
    npm run build
    ```
2.  Empaqueta con Electron Builder:
    ```bash
    npm run pro:macos  # O el comando correspondiente a tu SO
    ```
