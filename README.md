# ToolBox FullStack Challenge (CLIENT)
Esta app de `React JS` sirve como cliente para consumir el API propuesta en el challenge de ToolBox para la vacante de FullStack developer, la cual entrega una lista de archivos en formato JSON.

## Construido con
* Node JS 16
* React JS 18
<br>

### Instalar dependencias
```
npm i
```

### Iniciar servidor de desarrollo
```
npm start
```

### Estructura
```
└-------- + src/
          |
          └---- App.js      # Componente principal
          └---- index.js    # Archivo de entrada
          └---- helpers.js  # Funciones helpers
          |
          └---- + components/
          |     └---- Header.js     # Cabecera de la app
          |     └---- RenderIf.js   # Componente que renderiza solo sin la condicion pasada por parametro se cunple
          |     └---- index.js      # Exporta todos los componentes
          |
          └---- + context/          # Contiene los arcihvos para el state
          |
          └---- + hooks/
          |     └---- useFile.js    # Contiene hook para obtener la lista de archivos a mostrar
          |
          └---- + services/
                └----- files.js     # Contiene la funcino que obtiene los datos desde el API
```
