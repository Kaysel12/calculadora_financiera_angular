# Bienvenido al Proyecto de Calculadora Financiera Angular

<p align="center">
    <img alt="Angular Logo" title="Angular Logo" src="https://angular.io/assets/images/logos/angular/angular.svg" width="450">
</p>

## Comenzando

¡Bienvenido al Proyecto de Calculadora Financiera Angular! Este proyecto está construido con Angular y está configurado para ejecutarse con Docker. A continuación, se presentan algunos recursos para ayudarte a comenzar:

### Documentación de Referencia

Para más información, por favor consulta las siguientes secciones:

- [Documentación Oficial de Angular](https://angular.io/docs)
- [Angular CLI](https://angular.io/cli)
- [Docker Documentation](https://docs.docker.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)

### Guías

Las siguientes guías ilustran cómo utilizar algunas características concretas:

- [Guía de Angular CLI](https://angular.io/cli)
- [Documentación sobre Docker y Nginx](https://docs.docker.com/engine/examples/nginx/)
- [Tutorial de Construcción de Aplicaciones Angular](https://angular.io/guide/architecture)

### Ejecutar el Proyecto con Docker

Asegúrate de que Docker y Docker Compose estén instalados y en funcionamiento en tu máquina. Luego, ejecuta el siguiente comando para construir e iniciar los contenedores:

```docker-compose up --build ```
Esto construirá la imagen de Docker para tu aplicación Angular y levantará el contenedor. El contenedor Nginx servirá la aplicación Angular construida en el contenedor de construcción.

**Nota:** Si encuentras problemas al acceder a la aplicación, prueba abrir el enlace en una ventana de incógnito. A veces, la caché del navegador puede interferir con la visualización de los cambios.


### Acceso a la Aplicación

Una vez que el contenedor esté en funcionamiento, puedes acceder a la aplicación en tu navegador en [http://localhost:80/](http://localhost:80/). La aplicación debería estar disponible y lista para interactuar.

### Estructura del Proyecto

- **`Dockerfile`**: Define las etapas de construcción para la aplicación Angular. La primera etapa (`build`) construye la aplicación Angular y la segunda etapa usa Nginx para servir los archivos estáticos.

- **`docker-compose.yml`**: Configura el servicio de la aplicación Angular, especificando la construcción de la imagen y la configuración de puertos y redes.

- **`nginx.conf`**: Configura el servidor Nginx para servir la aplicación. Asegúrate de ajustar este archivo según las necesidades específicas de tu proyecto.

### Más Ayuda

Para obtener más ayuda sobre Angular CLI, usa el siguiente comando:

```ng help ```
