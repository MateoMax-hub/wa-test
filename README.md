
# WhatsApp Auto-Responder Backend 🤖💬

Este proyecto es un backend desarrollado con **Node.js** y **Express** que permite conectar tu cuenta de WhatsApp y responder automáticamente a los mensajes recibidos. Utiliza la librería **wa-multi-session** para manejar múltiples sesiones y responder a mensajes basados en un diccionario predefinido.

---

## 🎯 Funcionalidades Principales

- **Conexión a WhatsApp**: Maneja múltiples sesiones de WhatsApp.  
- **Auto-respuestas**: Responde automáticamente a mensajes basados en palabras clave definidas en un diccionario.  
- **WebSocket**: Comunicación en tiempo real con clientes mediante **Socket.IO**.  
- **Gestión de etiquetas**: Emite eventos de asociación y edición de etiquetas.  

---

## 🚀 Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.  
- **Express**: Framework para construir APIs y manejar peticiones.  
- **wa-multi-session**: Librería para manejar sesiones de WhatsApp.  
- **Socket.IO**: Comunicación bidireccional en tiempo real entre el servidor y los clientes.  

---

## ⚙️ Instalación

Sigue estos pasos para poner en marcha el proyecto en tu entorno local:

1. Clona el repositorio:  
   ```bash
   git clone https://github.com/MateoMax-hub/wa-test.git
   ```

2. Accede al directorio del proyecto:  
   ```bash
   cd wa-test
   ```

3. Instala las dependencias:  
   ```bash
   npm install
   ```

4. Configura las variables de entorno:  
   - Crea un archivo `.env` en la raíz del proyecto.  
   - Define las siguientes variables si son necesarias:  
     ```env
     PORT=4000
     SESSION_STORAGE=./sessions
     ```

5. Inicia el servidor:  
   ```bash
   npm start
   ```

6. El servidor estará disponible en [http://localhost:4000](http://localhost:4000).  

---

## 🖋️ Diccionario

El archivo de constantes (`./src/constants/dictionary.js`) contiene las palabras clave y las respuestas automáticas. Puedes personalizarlo para agregar tus propias respuestas:  

```javascript
const DICTIONARY = {
    "hola": "¡Hola! ¿Cómo puedo ayudarte?",
    "adios": "¡Hasta luego!",
    // Agrega más palabras clave y respuestas aquí
};

module.exports = DICTIONARY;
```

---

## 📋 Endpoints Principales

- **/api/**: Maneja las rutas principales de la API.  
- **/socket/**: Comunicación en tiempo real mediante WebSocket.  

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas agregar nuevas funcionalidades, corregir errores o mejorar la documentación:  

1. Haz un fork del repositorio.  
2. Crea una rama para tu funcionalidad o corrección:  
   ```bash
   git checkout -b mi-nueva-funcionalidad
   ```
3. Realiza tus cambios y haz un commit:  
   ```bash
   git commit -m "Descripción breve del cambio"
   ```
4. Sube los cambios:  
   ```bash
   git push origin mi-nueva-funcionalidad
   ```
5. Abre un Pull Request.  

---

