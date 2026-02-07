# TaskMaster - Proyecto Final de React

![TaskMaster Preview](https://img.shields.io/badge/Status-Desplegado-success?style=for-the-badge&logo=github)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-purple?style=for-the-badge&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)

**TaskMaster** es una aplicación de gestión de tareas (To-Do List) moderna y elegante, desarrollada como proyecto final para el modulo 3 del Diplomado en Fullstack de la Universidad Privada de Oruro. La aplicación se integra con una API REST externa para gestionar la persistencia de datos y ofrece una experiencia de usuario fluida con un diseño "Premium" basado en Glassmorphism.

## 🚀 Enlace del Proyecto
Puedes ver la aplicación funcionando aquí:
👉 **[TaskMaster Live](https://janc55.github.io/dip-proyecto-final-react/)**

---

## ✨ Características Principales

- **Gestión Completa de Tareas (CRUD)**: Crear, leer, actualizar y eliminar tareas.
- **Autenticación de Usuarios**: Sistema de registro e inicio de sesión con JWT persistente en `localStorage`.
- **Diseño Premium (UI/UX)**:
  - Estética **Glassmorphism** con efectos de desenfado y transparencias.
  - Totalmente **Responsivo**: Adaptado para móviles, tablets y escritorio.
  - **Animaciones fluidas** realizadas con `Framer Motion`.
  - Iconos modernos y estilizados con `Lucide React`.
- **Estado en Tiempo Real**: Notificaciones de éxito y manejo de errores detallado (ej. sesión expirada).
- **Traducción Completa**: Interfaz 100% en español.

## 🛠️ Tecnologías Utilizadas

- **React 19**: Biblioteca principal para la interfaz.
- **Vite 7**: Herramienta de construcción rápida y optimizada.
- **Tailwind CSS v4**: Framework de estilos de última generación.
- **Axios**: Cliente HTTP para el consumo de la API.
- **React Router Dom**: Gestión de navegación y rutas privadas.
- **Framer Motion**: Animaciones y micro-interacciones.
- **Lucide React**: Biblioteca de iconos vectoriales.

---

## 📦 Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto localmente:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/janc55/dip-proyecto-final-react.git
   cd dip-proyecto-final-react
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```

4. **Construir para producción**:
   ```bash
   npm run build
   ```

---

## 🌐 API Reference

Este proyecto consume la API proporcionada por Carlos Trigo:
- **Base URL**: `https://carlos-trigo.onrender.com`
- **Endpoints Utilizados**:
  - `POST /api/users`: Registro de nuevos usuarios.
  - `POST /api/login`: Inicio de sesión y obtención de Token.
  - `GET /api/tasks`: Obtener todas las tareas del usuario.
  - `POST /api/tasks`: Crear una nueva tarea.
  - `PUT /api/tasks/:id`: Editar el nombre de una tarea.
  - `PATCH /api/tasks/:id`: Cambiar el estado (completado/pendiente).
  - `DELETE /api/tasks/:id`: Eliminar una tarea.

---

## 👨‍💻 Autor
**Diplomante: José Alfredo Negretti Cortés**

---

## 📄 Licencia
Este proyecto fue creado con fines educativos para el diplomado.
