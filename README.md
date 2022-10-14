# ToolBox FullStack Challenge (CLIENT)

Este cliente fue creado con React JS 18 bajo la version `16 de Node JS` para consumir un API que retorna una lista de archivos en formato JSON.     
Para las llamadas HTTP se uso fetch, context API para manejar el state y hooks de react.


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
