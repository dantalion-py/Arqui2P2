## Tabajo 2 Arqui 12 nov
### **Configuración - Hardware (Johan)**

- **Node-RED**: Configurar Node-RED para interactuar con los dispositivos de hardware.
- **Hestia**: Configurar el servidor Hestia para gestionar el entorno del proyecto.
- **ESP32 with Mosquitto**:
    - **Conexión ESP32 con Mosquitto**: Establecer la conexión entre el ESP32 y el servidor Mosquitto.
    - **Enviar Datos**: Configurar el envío de datos desde el ESP32 a través de MQTT.
    - **Recibir Datos**: Configurar la recepción de datos en el ESP32 desde el servidor Mosquitto.

### **Software - Web**

#### **API (Flask Backend)**

- **MongoDB (Crear/Actualizar) - Daniela**:
    
    - Crear un método en Flask para insertar nuevos registros en MongoDB.
    - Crear un método para actualizar registros existentes en MongoDB.
- **Cliente (Enviar base de datos - Erik)**:
    
    - Crear un método en el cliente (HTML/JS) para enviar todos los registros de MongoDB al servidor usando una API GET.
- **Datos en tiempo real (Jorge y José)**:
    
    - Obtener datos de los sensores en tiempo real.
    - Hacer algunos gráficos simples (plot) para visualizar los datos, aunque sin interfaz completa por ahora.
### **Front-End (Interfaz Visual)**

#### **1. Dashboard (Johan)**

- **Diseño del Layout Principal**: Crear la estructura general del dashboard, asegurándose de que sea limpia, intuitiva y moderna. Esto incluye la disposición de las secciones como el control de sensores, LEDs, y visualización de datos.
- **Estilo Visual**: Usar una paleta de colores moderna y atractiva, manteniendo el diseño simple pero con un toque profesional (puedes inspirarte en HestiaCP para la disposición de los módulos pero hacerla más estilizada con un diseño más amigable y atractivo). Utilizar frameworks como **Bootstrap** o **Tailwind CSS** para una rápida implementación y buena responsividad.
- **Interactividad**: Implementar funcionalidades interactivas con **JavaScript**, como la actualización dinámica de la información (uso de AJAX o Fetch API para obtener datos sin recargar la página).
- **Navegación**: Asegurarse de que la navegación sea fluida, usando menús desplegables o una barra lateral para permitir al usuario moverse entre diferentes secciones de control (sensores, LEDs, etc.).

#### **2. Control de Sensores y LEDs**

- **Sensor 1 (David)**: Crear una sección específica en el dashboard donde se muestren los datos del **Sensor 1** (por ejemplo, temperatura, humedad, etc.). Este módulo debe incluir:
    - **Gráficos** o **indicadores visuales** que muestren los datos en tiempo real, utilizando librerías como **Chart.js** o **Plotly**.
    - **Controles** para ajustar configuraciones relacionadas con el sensor (si aplica).
    - **Alertas** si el valor del sensor supera ciertos umbrales (por ejemplo, temperatura alta).
- **Sensor 2 (Flowers)**: Repetir lo mismo para el **Sensor 2**, con un diseño similar pero adaptado a los datos específicos de este sensor.
- **LED 1 (Mishael)**: Crear un control para **LED 1**, donde el usuario pueda encender/apagar el LED y cambiar su color si es RGB. Usar controles como botones de alternancia o sliders para el control de brillo.
- **LED 2 (Johan)**: Implementar un control similar para **LED 2**, con funcionalidades equivalentes (encender, apagar, ajustar el brillo o color).

#### **3. Visualización de la Base de Datos**

- **Mostrar los Registros de MongoDB**:
    - Crear una **tabla dinámica** que muestre los registros de MongoDB de forma clara. Los usuarios deben poder ver los datos almacenados de los sensores, como valores de temperatura o estado de los LEDs.
    - Incluir funcionalidades como la **búsqueda**, **ordenación** y **paginación** en la tabla para facilitar la navegación por los datos.
    - Asegurarse de que la tabla sea responsive, es decir, que se vea bien en pantallas de distintos tamaños (ordenadores de escritorio, tabletas, móviles).
- **Filtros Avanzados**:
    - Crear un sistema de filtros para que los usuarios puedan seleccionar, por ejemplo, ver solo los registros de un sensor específico o los datos dentro de un rango de fechas.

#### **4. Gráficos y Visualización en Tiempo Real**

- **Gráficos en Tiempo Real**: Usar **Chart.js**, **Plotly** o **D3.js** para mostrar los datos en tiempo real en forma de gráficos interactivos. Estos gráficos deben actualizarse automáticamente, sin necesidad de que el usuario recargue la página.
- **Estilo Atractivo y Funcional**: Los gráficos deben ser no solo informativos, sino también estéticamente agradables. Usar colores suaves para las líneas y barras, y asegurarse de que sean fáciles de leer.

#### **5. Animaciones y Transiciones**

- **Animaciones Suaves**: Implementar transiciones suaves para los elementos del dashboard (como cuando se cambian los datos del sensor o cuando se enciende/apaga un LED). Esto puede hacerse usando **CSS transitions** o **JavaScript**.
- **Interactividad Atractiva**: Los botones y controles de la interfaz deben ser interactivos, con cambios de color o efectos cuando el usuario pase el mouse por encima o haga clic en ellos.

#### **6. Responsive Design**

- Asegurarse de que la interfaz se vea bien y funcione correctamente en dispositivos de diferentes tamaños, como móviles, tabletas y computadoras de escritorio.
- Usar **media queries** en CSS para ajustar el diseño según el tamaño de la pantalla.

### **Tecnologías Utilizadas:**

- **HTML/CSS**: Para la estructura y estilo general de la página.
- **JavaScript**: Para la interactividad y el manejo de datos en tiempo real (AJAX, Fetch API, control de eventos).
- **Bootstrap** o **Tailwind CSS**: Para facilitar el diseño responsive y la construcción de la interfaz.
- **Chart.js / Plotly / D3.js**: Para mostrar los gráficos de datos.
- **MongoDB**: Para almacenar y obtener los datos que se mostrarán en el dashboard.
