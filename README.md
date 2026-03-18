# 🎯 BreachClock (El Pomodoro del Red Team)

**BreachClock** es una herramienta de productividad gamificada diseñada específicamente para estudiantes de ciberseguridad, analistas SOC y Pentesters. Combina la técnica Pomodoro tradicional con una interfaz de terminal inmersiva para maximizar la concentración durante las sesiones de estudio o auditoría.

🔗 **[ENLACE A LA DEMO DESPLEGADA EN CUBEPATH AQUÍ]**

## 💡 ¿Por qué BreachClock? (UX y Creatividad)
Durante el hackathon, el enfoque principal ha sido crear una **Experiencia de Usuario (UX) impecable y adictiva**. 
* **Estética Inmersiva:** Interfaz limpia sin distracciones, utilizando colores de terminal (`bg-slate-950` y `text-green-500`).
* **Gamificación Pasiva:** Mientras el temporizador corre, una terminal secundaria escupe "logs de ataque" simulados, creando un ambiente de hackeo continuo que desalienta el cambio de pestañas.
* **Easter Egg Profesional:** La aplicación incluye un comando `> whoami` oculto que despliega el perfil profesional del creador, sirviendo como un currículum interactivo.

## 📸 Capturas de Pantalla

*(Añadir aquí un GIF de 10 segundos mostrando cómo se inicia el reloj y los logs moviéndose)*
*(Añadir aquí una captura de pantalla del comando > whoami abierto)*

## 🛠️ Tecnologías Utilizadas
* **Frontend:** React.js (Vite)
* **Estilos:** Tailwind CSS v4
* **Animaciones y Lógica:** Hooks de React (`useState`, `useEffect`)

## 🚀 Despliegue en Cubepath (Requisito del Hackathon)

Esta aplicación ha sido desplegada utilizando la infraestructura de **Cubepath** para garantizar un rendimiento óptimo y alta disponibilidad. 

**Proceso de despliegue realizado:**
1. Se generó el *build* de producción de la aplicación React mediante el comando `npm run build`, optimizando los *assets* estáticos.
2. Los archivos resultantes de la carpeta `dist/` fueron subidos a nuestro entorno en Cubepath.
3. Se configuró el servidor web en Cubepath para servir el archivo `index.html` como punto de entrada de la Single Page Application (SPA), asegurando que el enrutamiento interno de la app funcione correctamente.

---
*Proyecto creado para el Hackathon CubePath 2026. Creado por [Tri Redo].*