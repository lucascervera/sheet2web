# sheet2web User Documentation
	- ## Overview
		- `sheet2web` is a simple web application designed to convert a spreadsheet into an easily embeddable directory for any website. This guide will help you set up and use the application to publish data from a spreadsheet in a web directory format.
	- ## Table of Contents
		- [Requirements](#requirements)
		- [Setup Instructions](#setup-instructions)
		- [Configuration](#configuration)
		- [Embedding the Directory](#embedding-the-directory)
		- [Usage](#usage)
		- [Annex: Hosting on GitHub Pages](#annex-hosting-on-github-pages)
	- ## Requirements
		- Before using `sheet2web`, ensure you have the following:
			- A CSV file containing the data you want to display.
			- A web server to host the HTML file.
			- Basic knowledge of HTML and web hosting.
	- ## Setup Instructions
		- ### Prepare Your Data
			- ### Datos en una hoja de cálculo de Google Sheets
				- Publicar una hoja de cálculo de Google Sheets en formato CSV y que esté accesible a través de internet es un proceso sencillo. A continuación, te detallo los pasos para hacerlo:
					- **Abre tu hoja de cálculo en Google Sheets**: Ingresa a Google Drive, encuentra y abre la hoja de cálculo que deseas compartir.
					- **Selecciona la hoja específica**: Si tu documento tiene varias hojas (pestañas en la parte inferior), asegúrate de estar en la hoja que quieres compartir como CSV.
					- **Haz clic en Archivo**: En la barra de menú superior, selecciona el menú "Archivo".
					- **Selecciona 'Publicar en la web'**: Dentro del menú "Archivo", encontrarás la opción "Publicar en la web". Haz clic allí.
						- ![image.png](../assets/image_1715713580410_0.png)
						-
					- **Configura la publicación**:
						- En el cuadro de diálogo que aparece, verás un campo desplegable donde puedes seleccionar la hoja específica que deseas publicar.
						- Asegúrate de seleccionar correctamente la hoja que quieres convertir a CSV.
						- Luego, debajo de "Vincular", selecciona el formato "Valores separados por comas (.csv)".
						- ![image.png](../assets/image_1715713702707_0.png)
					- **Publica la hoja**:
						- Haz clic en el botón "Publicar".
						- Te pedirá confirmar la acción, indicando que cualquier persona en Internet podrá ver tu hoja de cálculo. Confirma haciendo clic en "Aceptar".
							- ![image.png](../assets/image_1715714261054_0.png)
							- ![image.png](../assets/image_1715714362961_0.png)
					- **Obtén el enlace del archivo CSV**: Una vez publicada, se te proporcionará un enlace URL directo al archivo CSV. Puedes copiar y compartir este enlace con quien desees, y ellos podrán acceder al archivo CSV directamente desde ese enlace.
					- **Acceso y actualizaciones**:
					- Cualquiera con el enlace podrá descargar la versión más reciente del CSV cada vez que acceda al enlace.
					- Si realizas cambios en la hoja de Google Sheets, estos se reflejarán automáticamente en el archivo CSV descargable.
				- Recuerda que, al publicar información en Internet, debes asegurarte de que no estés compartiendo datos sensibles o privados sin las debidas precauciones.
			- ### Datos En un fichero CSV
				- Ensure your data is in a CSV format. The first row should contain the headers. For example:
					- ```csv
					  ID,TITLE,DESCRIPTION,IMAGE,TAGS,CONTENT
					  1,Sample Item,This is a sample description.,https://example.com/image.jpg,tag1,tag2,<iframe src="https://example.com"></iframe>
					  ```
		- ### Step 2: Upload Files to Your Server
			- Aloja tu directorio en github pages (recomendado)
			- Aloja Tu directorio en tu propio hosting.
				- Upload `sheet2web.html` to your web server.
				- Upload `config.yaml` to the same directory as `sheet2web.html`.
		- ### Step 3: Update Configuration File
			- Edit the `config.yaml` file to configure your application. Below is a sample configuration:
				- ```yaml
				  dataSourceUrl: "https://example.com/data.csv"
				  descriptionLength: 100
				  activeFacets:
				    - TAGS
				    - CATEGORY
				  ```
			- `dataSourceUrl`: URL to your CSV data source.
			- `descriptionLength`: Maximum length for item descriptions (optional).
			- `activeFacets`: List of facets to enable filtering (optional).
			- Actualizar configuración en github pages
			- Actualizar configuración en tu propio hosting
	- ## Usage
	  collapsed:: true
		- Once the application is set up and configured:
			- **Loading Data**: The application will automatically load data from the CSV file specified in the `dataSourceUrl`.
			- **Filtering Data**: Use the filter buttons to refine the list of displayed items.
			- **Viewing Details**: Click on an item to view more details in a modal window.
		- ### User Interface
			- **Filter Buttons**: Located at the top, used to filter items based on facets.
			- **Item Cards**: Display basic information about each item.
			- **Modal Window**: Shows detailed information and embedded content when an item is clicked.
		- ### Customization
			- You can customize the look and feel of the application by editing the HTML and CSS in `sheet2web.html`. For advanced functionality, modify the Vue.js components as needed.
	- ## Embedding the Directory
	  collapsed:: true
		- To embed the directory into another website, use an iframe. For example:
			- ```html
			  <iframe src="https://yourwebsite.com/sheet2web.html" width="100%" height="600px" style="border:none;"></iframe>
			  ```
		- Replace `https://yourwebsite.com/sheet2web.html` with the actual URL of your hosted `sheet2web.html`.
	- ## Annex: Hosting on GitHub Pages
		- ### Step 1: Create a GitHub Repository
			- Go to [GitHub](https://github.com) and sign in to your account.
			- Click on the "+" icon in the top right corner and select "New repository".
			- Name your repository (e.g., `sheet2web-directory`), add a description (optional), and choose "Public".
			- Click "Create repository".
		- ### Step 2: Upload Your Files
			- Once the repository is created, click on "Add file" and select "Upload files".
			- Upload `sheet2web.html`, `config.yaml`, and your data CSV file.
			- Commit the changes by clicking on "Commit changes" at the bottom of the page.
		- ### Step 3: Configure GitHub Pages
			- In your repository, go to "Settings".
			- Scroll down to the "Pages" section in the left sidebar.
			- Under "Source", select the branch you want to use (e.g., `main`) and the folder (e.g., `/root` for the main directory).
			- Click "Save".
			- GitHub will provide a URL where your site is published (e.g., `https://yourusername.github.io/sheet2web-directory`).
		- ### Step 4: Edit Files via GitHub Web Interface
			- Navigate to the file you want to edit in your repository.
			- Click on the file name to open it.
			- Click the pencil icon (edit this file) in the top right corner.
			- Make your changes and click "Commit changes" at the bottom of the page.
		- Your `sheet2web` directory is now hosted on GitHub Pages and can be embedded or shared using the provided URL. You can also edit the files directly from GitHub's web interface, making it easy to update your data or configuration without needing to use additional tools.