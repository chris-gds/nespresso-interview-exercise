# 📦 Nespresso UI Exercise

## The exercise

Inside `src/template.html` you will find some simple markup, you have to add the neccessary HTML markup and style it according to what you can see in `example-desktop-tab-1.png`, `example-desktop-tab-2.png` and `example-mobile-tab-1.png` , `example-mobile-tab-2.png` files inside the root folder of the repository.

### Expected Mobile view
Description Tab Selected | Details Tab Selected  
:-------------------------:|:-------------------------:
![](example-mobile-tab-1.png)  |  ![](example-mobile-tab-2.png)

### Expected Desktop view
Description Tab Selected | Details Tab Selected  
:-------------------------:|:-------------------------:
![](example-desktop-tab-1.png)  |  ![](example-desktop-tab-2.png)

## We want to add the following characteristics to the template:

### Both mobile and desktop
- When you click any of the tabs, you have to fetch data from `https://dummyjson.com/products/{id}` (where `id` should be random number "from 1 to 50") and display the "description" in the first selected tab (description tab). When the second tab (details) is clicked you should show the "dimensions" and the "returnPolicy" fields inside the tab content.
- You should limit the clicking of the tabs to only fetch data at most once per second (so if you click a lot of times on any of the tabs in quick succession, it should only fetch data once per second).
- When the page loads, or you click on a tab, its related content should be visible (if no tab has been clicked then the default "description" field should be rendered on the tab content area).
- The tab button should stay highlighted when clicked/active or hovered/focused (as you can see in the `example-desktop-tab-1.png` and `example-desktop-tab-2.png`).
- Final Template html should have zero WCAG 2.1 errors (when audited with any of common tool such AXE or WAVE chrome extensions)
- It should be accessible when using Keyboard navigation (at least using tab key and if posssible direction arrows on the tabs).
- When using keyboard navigation after selecting any tab the focus should change to their respective tab content.
- (bonus) Animations should be added to the "active" and "hover" states of the tabs and a fade in effect to the tab content every time its updated.

### Mobile
- Follow the desktop requirements but the click behaviour should be replaced by tap.

### Feel free to do it however you want, just try to follow these rules:

- You are able to modify the HTML, SCSS and JS files.
- The result of the Rendered Markup should be Keyboard Accessible.
- CSS syntax should follow a "Mobile First" approach.
- The template need to be as close as possible to the attached Expected Desktop and Mobile views.

## Installation

```bash
npm i
```

### Development server

```bash
npm start
```

You can view the development server at http://localhost:8080.

### Production build

```bash
npm run build
```

### Design Review

- The tab design is not a `Tab` it almost looks like `radio` I would add a border to the top and sides and integrate into the main tab content.
