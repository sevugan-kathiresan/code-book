# code-book
A React application which acts as a simple browser based IDE
<hr>

### Description
This project is a simple react based CLI which lets users lauch a Integrated Development Environment for JavaScript in their browsers (similar to Jupyter Notebook but for JavaScript). Some key features are:<br>

1. Initially the IDE will be a plain notebook but the users can add text/code cell using the UI buttons. You can add multiple cells.
2. Text Cell
    - Opens up a markdown editor where you can write and format any documentation for you code.
3. Code Cell
    - Open up a code editor where you can wirte you code.
    - This also has a preview window on its right.
    - In addition to Plain JavaScript you can also code React Components
    - In addition to writing code you can also import any arbitrary npm modules.
    - You can also import CSS files from npm. E.g. bulma
4. Capable of persisting data by saving your code and documentation by saving it as a JavaScript file `.js` in to your hard drive.
<hr>

### Key Technical Features
1. In Browser Bundling and Transpiling of user entered code in the code cell of the notebook.
    - Achieved using the esbuild
    - Wrote a custom plugin for esbild to dynamically fetch the npm modules from 'unpkg' repository.
    - Dynamic fetctching will work expected even in case nested modules.
2. Custom Caching Layer - To reduce the number fo request made to unpkg repo.
     - Acheived using IndexedDB, utlized localforage library from npm to make the process of working with IndexedDB a little easier.
3. CSS imports - esbuild does supports bundling of CSS files but in a scenario where we are working with the bundling of both JS and CSS, esbuild will produce two different bundled files one for JS and one for JS. For this functionality we might need to give esbuild access to file system unfortunately Browsers don't have file system but our app runs inside browser,
    - wrote a small conditional case with customs Javascript to wrap the CSS content and insert it into the main JS output file.
<hr>

### Folder Structure
/code-book(repository)<br>
 - /cbook - React APP
 - README.md
<hr>

### Dependencies
1. esbuild-wasm@0.8.27 (Web assembly module)
2. axios
3. localforage - to work with IndexedDB

