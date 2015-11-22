#FormBar.js

Progress bar for form completion and more...

##Usage
Insert `formbar-min.js` in your web page.  Define the DOM element that will host your bar and that is all.

```html
<body>
  <div id="mybar"></div>
  <form method="post">
    <input type="text" name="name" placeholder="Name">
    <input type="text" name="alias" placeholder="Alias">
    <input type="password" name="password" placeholder="Password">
  </form>

  <script src="formbar-min.js"></script>
  <script>
      //Create the bar
      var myBar = new FormBar({
        node: '#mybar'
      });
      
      //Render the bar
      myBar.render();
  </script>
</body>
```

If you want to exclude a field add a class named `ignore` to it. 

To keep formbar filesize small (>4k) `formbar-min.js` file only ships the **solid plugin**. To use another plugin insert **formbar-[pluginName]-min.js** file instead that contains **solid plugin** and the selected plugin. But if you think that you need all the plugins in your page then insert **formbar-all-min.js** file.

##Configuration
FormBar have many configuration options that makes easier fits it to your web page design. All this configuration options are accesible through your formBar object too.

 ```javascript
      var myBar = new FormBar({
        node: '#mybar',
        colors: ['#F00'],
        totalSteps: 3,
        currentStep: 1
      });
      
      //Access to configuration properties
      myBar.colors = ['#0FF', '#F0F']; 
      myBar.currentStep = 2;
      
      myBar.render();
     
 ```

* **node:** (CSS Selector) DOM node where the bar will be redered.
* **formNode:** (CSS Selector) Form DOM node container. (default: 'body' - observes all page forms fields)
* **barHeight:** (CSS height unit) Bar height. You can pass a string with a CSS height unit or a number. If you pass a number it will represent the height in pixels.
* **colors:** (Array of CSS colors) Example: `['#F00', '#0F0','#0FF']`. This colors are share by all plugins, see below the configuration of each plugin to know how it use this colors.
* **background:** (CSS background) A color or background CSS value. Sets de bar's background.

###Bar border options
 
* **showBorder:** (Boolean value) Show/Hide a border around the bar.
* **borderColor:** (CSS Color) Border color.

###Bar text options
* **showText:** (Boolean value) Show/Hide the percentage number in the bar.
* **textSize:** (CSS size) Text size. If you pass a number it will represent the size in pixels. 
* **textTop:** (CSS size) Text top position. If you pass a number it will represent the value in pixels. 
* **textColors:** (CSS Color) Text color.

###MultiStep forms
Options if your form have multiple pages or steps.

* **totalSteps:** (Number) Number of steps/pages your form is divided.
* **currentStep:** (Number) Current step/page of your multistep form.

Then you can use the `nextStep()` method to increment currentStep one up.

###Callbacks events
* **onComplete:** (Function) Callback that will be called when the bar is completed.
* **onChange:** (Function) Callback that will be called when the bar change (the percentage change).

###Plugin
* **plugin:** (String) Plugin that you want use to render your bar. Default: 'solid'


##Plugins:

 * [Solid](#)**(default)** - Draw a bar with only one color (the first color in the configuration **colors** array). This is the default option if you don't define any plugin in the configuration object.
 ```javascript
      var myBar = new FormBar({
        node: '#mybar',
        colors: ['#F00'],
        plugin: 'solid' //optional. Solid is the default plugin
      });
      
      myBar.render();
 ```
 
 * [Dotted](#)- Same as **solid plugin** but it draws a dotted line instead.
 ```javascript
      var myBar = new FormBar({
        node: '#mybar',
        colors: ['#F00'],
        plugin: 'dotted'
      });
      
      myBar.render();
 ```
 * [Dashed](#)- Same as **solid plugin** but it draws a dashed line instead. 
 ```javascript
      var myBar = new FormBar({
        node: '#mybar',
        colors: ['#F00'],
        plugin: 'dashed'
      });
      
      myBar.render();
 ```
 
 * [Gradient](#) - Draw a bar with a gradient from **colors[0] to colors[1]**.
 ```javascript
      var myBar = new FormBar({
        node: '#mybar',
        colors: ['#F00', '#500'],
        plugin: 'gradient'
      });
      
      myBar.render();
 ```
 
 
 * [Sections](#) Draw a bar with multiple sections with different color. Each section take a color from the configuration array colors. 
  ```javascript
      var myBar = new FormBar({
        node: '#mybar',
        colors: ['#F00', '#0F0','#00F', '#0FF', '#FF0'],
        plugin: 'sections'
      });
      
      myBar.render();
 ```

 * [Chameleon](#) - Draw a bar with a solid color that change while it progress. Use all the colors provided by the configuration array colors.
  ```javascript
      var myBar = new FormBar({
        node: '#mybar',
        colors: ['#F00', '#FF0', '#0FF'],
        plugin: 'chameleon'
      });
      
      myBar.render();
 ```
 
 * [Merge](#) - Create two opposite bars with one solid color that grows until they met at the middle. This plugins use colors[0] as the bar color and colors[1] as the mask color. The mask must be the same color as your page background. 
 ```javascript
      var myBar = new FormBar({
        node: '#mybar',
        colors: ['#F00', 'white'], //white background
        plugin: 'merge'
      });
      
      myBar.render();
 ```


##Browser Support
 * Safari 7.0 
 * Opera 21 
 * Mozila Firefox 29 and up
 * Google Chrome 34 and up
 * Internet Exporer 8.0 and up 
 

##License
FormBar.js is licensed under the BSD license (http://opensource.org/licenses/BSD-3-Clause)

##Acknowledgements
[**Fort.js**](http://idriskhenchil.me/fort) To inspirate this project. 
