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

### Folder Structure
/code-book(repository)<br>
 - /cbook - React APP
 - README.md
<hr>

### Dependencies
1. esbuild-wasm@0.8.27 (Web assembly module)
2. axios

