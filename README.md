# BestClock
Analog Clock Made with Pure JavaScript using Canvas API.
A simple analog clock using HTML5 canvas and javascript

##  Include files

In the page's footer, just before <code>&lt;/body&gt;</code>, include the required JavaScript file

```html
<script src="bestClockOOP.min.js"></script>
```

Add the markup to your HTML where you want the clock to appear on your page.
```html
<div id="myClock"></div>
```
Finally you can create your Clock by using the following Javascript:
```javascript

var myClock = new BestClock('myClock');
    
```


## Options

The BestClock has customizable feature.

```javascript

var myClock = new BestClock(id,
    {
        option1: value1,
        option2: value2,
    }
);

```

The Parameters are :

1. BestClock's id, should be String.

2. An object to custom BestClock including available options which are listed below. A null object means default options.

| Option | Type | Default | Description |
|:---|:---:|:---:|:---|
| colorRect | String |"#dddee2" | The color of the rectangle. |
| colorFigureSix | String |"black" | The Color of figure six. |
| colorHourHand | String |"black" | The color of hour hand. |
| colorMinuteHand | String | "black" | The color of Minute hand. |
| colorSecondHand | String | "#dc0406" | The color of second hand. |
| colorNumber | String | "dc0406" | The color of Number. |
| colorText | String | "#003061" | The color of text. |
| text | String | "Quartz" | The color of hands. |
| width | Number | 600 | The width of canvas.  |
| height | Number | 600 | The height of canvas. |

## Methods
#### setSize
Resize the clock.
```javascript
    myClock.setSize(width,height);
```
The Parameters are :

1. width : The new Width of the canvas , should be Number.

2. height : The new height of the canvas , should be Number.


### demo  [BestClock](https://codepen.io/Dr_rakcha/pen/BGRzag)

### License [MIT License](https://opensource.org/licenses/MIT)

