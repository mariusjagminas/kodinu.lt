# Creative Agency / PSD to HTML

The website design [template](https://www.behance.net/gallery/69297573/Adobe-Xd-free-onepage-layout?tracking_source=search_projects_recommended%7Cadobe%20xd%20free%20web%20template) converted to HTML/CSS/JavaScript using mobile-first approach and [BEM](https://9elements.com/bem-cheat-sheet/) style naming convention for CSS class names.

[Live demo](https://mariusjagminas.github.io/kodinu.lt/)

## Built with:

- HTML
- [SASS](https://sass-lang.com/)
- Vanilla JavaScript
- [Font Awesome](https://fontawesome.com/) icons
- [Parcel.js](https://parceljs.org/) zero configuration web app bundler

## How to develop this project locally

### Prerequisites

You must have [Node.js](https://nodejs.org/en/) installed on your system before running this project locally.

## Installation and development

1. Clone the repository to your local machine.

   ```
   $ git clone https://github.com/mariusjagminas/kodinu.lt-challenge.git
   ```

2. Change directory to `psd-to-html-creative-agency`.

   ```
   $ cd psd-to-html-creative-agency
   ```

3. Install all dependencies.

   ```
   $ npm install
   ```

4. Start development server.

   ```
   $ npm start
   ```

   or

   ```
   $ parcel src/index.html
   ```

## Build

In terminal run

```
$ parcel build src/index.html --public-url ./
```

Parcel.js will create `/dist` folder with production ready files in it.
