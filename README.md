# TADA App - Proyecto Final React Native

## Descripción
TADA es una aplicación móvil de e-commerce desarrollada con React Native como proyecto final para el curso de Desarrollo de Aplicaciones de Coderhouse. La aplicación permite a los usuarios explorar productos por categorías, gestionar un carrito de compras, administrar su perfil y guardar ubicaciones favoritas.

## Características Principales

### Navegación y Estructura
- Implementación de navegación tipo stack y tab usando React Navigation
- Flujo de autenticación con navegación condicional
- Estructura organizada por características (features)

### Manejo de Estado
- Redux Toolkit para gestión centralizada del estado
- RTK Query para manejo de llamadas a API
- Slices separados para:
  - Autenticación (authSlice)
  - Carrito (cartSlice)
  - Tienda (shopSlice)

### Firebase Integration
- Authentication para registro y login de usuarios
- Realtime Database para productos y órdenes
- Almacenamiento de imágenes de perfil

### Interfaces de Dispositivo
- Cámara: Captura de fotos de perfil mediante expo-image-picker
- Ubicación: Integración con mapas y geolocalización usando expo-location y react-native-maps
- Permisos manejados correctamente para ambas interfaces

### Persistencia Local
- SQLite para persistencia de sesiones
- Manejo de tokens y datos de usuario
- Tablas:
  - sessions (localId, email, token)

### Optimización y Reutilización
- Componentes reutilizables:
  - Card/FlatCard para productos
  - CameraIcon para interfaz de cámara
  - Carousel para destacados
- Lista optimizada con FlatList

### Características Adicionales
- Toast messages para feedback
- Manejo de errores
- Carga de estados
- Validaciones de formularios


## Estructura del Proyecto
- `/src`: Contiene todo el código fuente de la aplicación
  - `/components`: Componentes reutilizables
  - `/features`: Funcionalidades principales de la aplicación
  - `/navigation`: Configuración de la navegación
  - `/screens`: Pantallas de la aplicación
  - `/store`: Configuración de Redux y slices
  - `/utils`: Utilidades y helpers

## Tecnologías Usadas
- React Native
- Redux Toolkit
- RTK Query
- Firebase
- Expo
- React Navigation
- SQLite
- Expo Image Picker
- Expo Location
- React Native Maps
