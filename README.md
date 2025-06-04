# JS230_DOM_manipulation_and_browser_events

## 1	[The DOM](https://launchschool.com/lessons/f0659709)

### [1	Introduction](https://launchschool.com/lessons/f0659709/assignments/86724a17)

- You need a "solid" understanding of html/css for this course.
- We're looking at:
  -  user behaviour interfacing with out javascript
  -  the DOM:
    -  how devs use it to change a web-page
  -  how to update the interface as a response to actions triggered by the user or the browser.
-  the goal is to create dynamic/responsive web-pages

#### [LS202 (lessons 1 - 5)](https://github.com/SandyRodger/LS202_html_and_css/edit/main/README.md)

### [2	The Document Object Model (DOM)](https://launchschool.com/lessons/f0659709/assignments/019f725c)

- an in-memory object representation of an HTML document.
- [What the DOM is and isn't article](https://css-tricks.com/dom/)
  
### [3 A Hierarchy of Nodes](https://launchschool.com/lessons/f0659709/assignments/f7a161b7)

- Browsers insert missing elements because a fundamental tenet of the web is permisiveness, ie the browser will do its best to display what you provide even if it means adding bits.
- and in fact the DOM includes more nodes than the html tags. like for #text inside the tags and tags containing only white-space AKA empty nodes.
- Devs often forget about these empty nodes, like those between lines, and it can cause bugs.
- Just remember they aren't visible in the web-browser, but they are there.
- Empty nodes are technically just text noes, but devs like to make a distinction.
- In the following example there is a new line empty node between `</h1>` and `<p>` adn then after the closing `</p>` tag:

```
<html>
  <h1>Hello, world!</h1>
  <p>This is a small <em>web page</em>.</p>
</html>
```

<img width="370" alt="Screenshot 2025-06-01 at 15 45 34" src="https://github.com/user-attachments/assets/92337ced-f501-45d5-acd8-13a3a029bf41" />

##### DOM levels

- referes to which features are available where. You don't need to know this.

### Problems:

- fine (I didn't do the drawing, but I think I would have gotten the same answer)
- 2nd pass (1.6.25):
  - 1. false (correct)
    2. true (correct)
    3. basically every new line is an empty text node:
```html
<html>
  <head>
    #T1
    <title>Newsletter Signup</title>
    #T2
  </head>
  #T3
  <body>
    #T5
    <!-- A short comment -->
    #T6
    <h1>Newsletter Signup</h1>
    #T6
    <p class="intro" id="simple">
      To receive our weekly emails, enter your email address below.
      <a href="info.html">Get more info</a>
      #T (for some reason it's orange with a \n, isn't this an empty node?)
    </p>
    #T7
    <div class="form">
      #T8
      <form>
        #T16
        <label>
          Enter your email:
          <input name="email" placeholder="user.name@domain.test"/>
          #T18
        </label>
        #T11
        <p class="controls">
          #T13
          <button id="cancelButton">Cancel</button>
          #T14
          <button type="submit" id="submitButton">Subscribe</button>
          #T15
        </p>
        #T12
      </form>
      #T10
    </div>
    #T9
  </body>
  #T17
</html>
```

4. Yah i KNow

### [4	Node Properties](https://launchschool.com/lessons/f0659709/assignments/b40afb49)

- document.toString() => '[object HTMLDocument]'
- `let p = document.querySelector("p");`

#### Node properties
##### Node Name

- this property contains a string representation of the node-type in upper-case.
- for text nodes it's always `#text`, for comments -> `#comment`.

##### Node Type

- is a number coresponding to a type.
- These are the most common:

|Constant|	Value|	Description|
| :--: | :--: | :--: | 
|Node.ELEMENT_NODE|	1|	An Element representing an HTML tag
|Node.TEXT_NODE|	3|	A Text node|
|Node.COMMENT_NODE|	8|	A Comment node|
|Node.DOCUMENT_NODE|	9|	A Document node|

- but try and refer to them by constant names instead so that the code is readable. ike this:
  - `p.nodeType === Node.ELEMENT_NODE`
  - `document.nodeType === Node.DOCUMENT_NODE`
##### Node value

- element nodes don't have values. `p.nodeValue` === null.
- text nodes do:
  - `let t = p.childNodes[0]`
  - `t.nodename;` => #text
  - `t.toString();` => "[object Text]"

##### text content

- when we need the text within an element we use `textContent`
- `textContent` represents the text of all nodes inside the Element.
- the result has too much white-space because of all the empty tags

example -> ... but I know why this happens. It's obvious ?

### [5	Determining the Type of a Node](https://launchschool.com/lessons/f0659709/assignments/5436a8bd)

#### Nodes and elements

- DOM objects come in different types: nodes, elements, text etc. Elements have lots of sub-types. Figuring out what the object type is can be tricky. But you can always say the following:
  - ALL DOM objects are nodes
  - ALL DOM objects have a type (and properties and methods) that inherits from Node
  - The most common DOM object types are:
    - element
    - text

Why do I need to give a shit about Node type?
  - because if you know what it is then you know what properties and methods are available to you. Knowing its name gives you power over it.

#### Inheritance in the DOM

- The types of node exist in a heirarchy. They inherit from their superiors.
- Here's a partial list:

- EventTarget
  - Node
    - Text
    - Comment
    - Document
    - Element
      - HTMLElement
        - HTMLAnchorElement
        - HTMLBodyElement
        - HTMLButtonElement
        - HTMLCanvasElement
        - HTMLDivElement
        - HTMLFormElement
        - HTMLHeadingElement
        - HTMLHtmlElement
        - HTMLInputElement
        - HTMLLIElement
        - HTMLLabelElement
        - and on and on and on  
      - SVGColorElement
      - SVGRectElement
      - and on and on.

- Almost all HTML tags have their own Element subtype.

#### Determining the Node Type

-   THIS COULD BE A TRICK QUESTION ON THE ASSESSMENT:
  -   How do you determine the node type in interactive console sessions?
    -   `p.toString();
  - ... and on Chrome?
  - `document.querySelector('a').constructor;`

- `Object.getPrototypeOf()` is the easiest.
  - `Object.getPrototypeOf(p)`
##### ... on a console

- on a console it's better to use `toString` or String constructor on the node, which usually returns the node's type's name.

```javascript
p.toString();
"[object HTMLParagraphElement]"
```

- some elements don't return the node's type name when you use `toString()`. This can be confusing. An example is here given with the `<a>` tag which returns "http://domain.com/page"

```javascript
let a = document.querySelector('a');
a.toString() // "http://domain.com/page"
```
- if you need to work-around this inconsistency you can look at the constructor property of the node, which will reference a function that creates the type of object you're looking for. So:

`document.querySelector('a').constructor.name; === "HTMLAnchorElement"`

- although it might look different in different browsers.

##### ... from code

- `instanceof` or `tagName` property.

- so there's 6 different ways FFS:
  1. `Object.getPrototypeOf(p);` -> easiest
  2. 'p.toString();' -> best on the console, but sometimes returns something else like for <a> tags
  3. `document.querySelector('a').constructor;` for Chrome, edge and Safari (although the output is different)
  4. `document.querySelector('a').constructor.name;` for firefox
  5. `> document.querySelector('a').constructor;` if your writing a program
= function HTMLAnchorElement() { [native code] }` for Edge
6. `p instanceof HTMLParagraphElement;` -> if you already have an idea what it probably is.
7. `p.tagName` -> if you don't need to know the type-name

### [6	Inheritance and Finding Documentation](https://launchschool.com/lessons/f0659709/assignments/ddf624ee)

- video - 4 mins
  - "it's important to know what methods you can call on a DOM object:
    - find the obejct
    - get it's type name
    - put that in google with "MDN"
- The MDN page will show you what the object inherits from, and it will obviously have access to all those methods/properties too.
- Make sure to check the compatibility tables so you know that the method/property you're using is available in your browser.

### [7 Traversing Nodes](https://launchschool.com/lessons/f0659709/assignments/4e29e7ea)

- DOM nodes have properties that point to their related nodes. Properties like:
  - `childNodes`
  - `firstChild`
  - `lastChild`
  - ParentNode
  - nextSibling
  - previousSibling
- **live collection** is one that automatically updates to reflect changes in the DOM.
- A list of common node proeprties that I saved as ANKI cards.

#### Walking the Tree
- recursion (this looks a lot like the DSA course) This section of the course appears to assume one has nto completed JS220 (DSA). I have, and therefore I can skim this.

- non recursive:

```javascript
function iterateAndLog(array) {
  for (let index = 0; index < array.length; index += 1) {
    console.log(array[index]);
  }
}
```

-recursive

```javascript
function recurseAndLog(array) {
  if (array.length > 0) {
    console.log(array[0]);
    recurseAndLog(array.slice(1));
  }
}
```

- When walking the tree in the DOM the collection we recursively traverse is not an array, but is DOM nodes where the smaller argument is one of its children:

```javascript
function walk(node) {
  console.log(node.nodeName);
  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index]);
  }
}

walk(document.body)
```

- It's better practice to separate the walking and the action performed on each value into 2 different methods. Like the following:

```javascript
function walk(node, callback) {
  callback(node);
  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index], callback);
  }
}

walk(document.body, node => {
  console.log(node.nodeName);
})
```

### [8	Element Attributes](https://launchschool.com/lessons/f0659709/assignments/38681590)
#### Getting and Setting Attributes

```javascript
> p.hasAttribute('class');
= true
> p.getAttribute('class');
= "intro"
> p.getAttribute('id');
= "simple"
> p.setAttribute('id', 'complex');
> p
= <p class="intro" id="complex">...</p>
```

#### Attribute Properties

- So, yes, you can use get and set Attribute for all attributes, but there is a second way:
  - As properties of the element: `id`, `name`, `title`, `value` and you can get and set these as you would normally. ie:

```javascript
p; => <p class="intro" id="simple">...</p>
p.id => "simple"
p.id = 'complex
p; => <p class="intro" id="complex">...</p>
```

- Beware that not every element type has these properties. `name` and `value` are especially uncommon.
- You can also play with `className`.

#### classList

- Sometimes elements have more than one class which means using `className` to access the class of an element is a bit jimmy-jammy. I mean look at this bullshit:

`<button class="btn btn-lg btn-primary">Proceed</button>`

- you see that the class name is a space-delineated set of names interacting with `className` can be freaky. Imagine replacing one part! You have to get the string from `className`, use replace to change it, use the result to set a new value for `button.className`:

```javascript
> let newClass = button.className.replace('btn-primary', 'btn-disabled');
> button.className = newClass;
= "btn btn-lg btn-disabled"
> button;
= <button class="btn btn-lg btn-disabled">...</button>
```

- ANd another thing! -> how do are we meant to determine that `button` belongs to the `btn` class? (I mean `class` may contain class names in any order. SOn you have to split it then search it. And if you're doing it often this is absolute bullshit.
- This is why modern browsers have `classList`: a property that references a special array-like `DOMTokenList` object with the following properties and methods:
  - `add(name)`
  - `remove(name)`
  - `toggle(name)`
  - `contains(name)`
  - `length`

#### style

- Here we're going to talk about the `style` attribute of element nodes. It's kinda funky.
- It references a `CSSStyleDeclaration` object.
- You can change a property with it like this:
  - `h1.style.color = 'red';
- And remove a CSS property like this:
  - `h1.style.color = null;
- If a CSS property contains dashes then you have to access it with a camelCased version of that. SO for `line-height` it's `h1.style.lineHeight = '3em';

### [9	Chrome Debugging Tools for Front End Development](https://launchschool.com/lessons/f0659709/assignments/8d41d105)

- THe dev tools are an important part of your kit. With it you can:
  - inspect HTML
  - edit CSS
  - Stop Javascript execution within a private function
  - inspect local variables
  - etc...

YOUTUBE VIDEO: https://www.youtube.com/watch?v=VYyQv0CSZOE

- this is boring As Fuuuuuuuuuuuuck (cool beard though)
- 2019
- Kayce Basques
- Core Work flows
- Dev tools: is it doing good?
- Debugging CSS: it's usually faster to debug than staring at your code
- "command menu" a useful way to speed up routine tasks
- basic debugging:
- right click, inspect 
- inspect-mode
- The DOM tree has a 'search UI" (control f)
- animations tab: change speed, timing, 
- rendering tab (enable paint flashing)
- 'high performance animations' doc
- prototyping CSS
- Pseudo-classes.
- Automatic syncing
- contrast ratio
- KBD elements?
- screen shots
- debugging: either programs not executing in the right order or the the values aren't set as you meant them to
- condo option J -> straight to console
- open the draw with escape
- if you wrap an object in curly braces it prints the name of the variable followed by the value.
- console.trace to get a call Stack trace to find out where something came from.
- scope -> tells you the scope, like closure scope
- 'live expressions'
- just write 'debugger' in your code (it's a breakpoint)
- another breakpoint is to just click a line of code and then the code pauses there. Others are DOM mutation break-point and Event listener breakpoints

_ this video would be more helpful if I was familiar with dev tools. If I used it a lot and had a bunch of preferred practices
- maybe I will come back to it further into the course. 3rd pass maybe (this is written on 2nd pass)

### [10 Practice Problems: Traversing and Accessing Attributes](https://launchschool.com/lessons/f0659709/assignments/d01702c5)

_ I am not able to solve these problems. Where was the information that I missed which would enable me to solve these? (was it LS2020...)

- 2nd go, I can solve them now.
1. 2nd pass, I didn't quite solve.
- for some reason, `childNodes[0]` returns `/n` and `firstChild` returns `<head>` interesting.
- The thing that is throwing me off is that there is an empty node between the closing `<body>   tag and the opening `<h1>` tag on the following line.
- then no space between 48 and px, its '48px'

2.  got it

```javascript
function newWalk(node, callback) {
    callback(node);
    for (let i = 0; i < node.childNodes.length; i++) {
        newWalk(node.childNodes[i], callback)
    }
}
undefined
let c = 0;
undefined
newWalk(document, n => {
    if (n.nodeName === 'P') {
        c++;
    }
})
undefined
c
5
```

3. 
```javascript
let first = true;
newWalk(document, n => {
  if (n.nodeName === 'P') {
    if (first) {
      first = false;
    } else {
      n.setAttribute('class', 'stanza');
    }
  }
});
```

4. My mistake was asking for nodeType rather than nodeName. nodeName => IMG.
- also bearing in mind the 2nd part of the question, I should have found all the images and then filtered for PNGs.


5. my solution is different:

```javascript
let pngCount = 0;
walk(document, node => {
    if (node.nodeName === 'IMG' && node.src.slice(-4) === '.png') {
        pngCount += 1;
    }
})
undefined
pngCount;
23
```

Fuck yes boiiiii, I am smashing this:

6.
```javascript
walk(document, node => {
    if (node.nodeName === 'A') {
        node.style.color = 'red';
    }
})
```

### [11Finding DOM Nodes](https://launchschool.com/lessons/f0659709/assignments/bec976e6)

#### Finding An Element By Id

- We often need to do this. We use `getElementByID` on `document` 

##### Finding More Than One Element

#### problems group 1

1. My solution:

```javascript
function findParas(document) {
    let output = [];
    walk(document, node => {
        if (node.nodeName === 'P') {
            output.push(node);
        }
    })
    return output;
}
undefined
function(document);
VM477:1 Uncaught SyntaxError: Function statements require a function nameUnderstand this error
findParas(document);
(2) [p, p]
```

LS solution (same result):

```javascript
function findAllParagraphs() {
  let matches = [];
  let nodes = document.body.childNodes;

  for (let index = 0; index < nodes.length; index += 1) {
    if (nodes[index] instanceof HTMLParagraphElement) {
      matches.push(nodes[index]);
    }
  }

  return matches;
}

console.log(findAllParagraphs());
```

2.  (am I not meant to be using the walk method? - seems too easy)

```javascript
function walk(node, callback) {
  callback(node);

  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index], callback);
  }
}
function addingPTags(document) {
    walk(document, node => {
        if (node.nodeName === 'P') {
            node.classList.add('article-text')
        }
    })
}
```

LS solutiom:

```javascript
function addClassToParagraphs(node) {
  if (node instanceof HTMLParagraphElement) {
    node.classList.add("article-text");
  }

  let nodes = node.childNodes;
  for (let index = 0; index < nodes.length; index += 1) {
    addClassToParagraphs(nodes[index]);
  }
}

addClassToParagraphs(document.body);
```

##### Incredibly useful getElementsbyTagName function

```javascript
function getElementsByTagName(tagName) {
  let matches = [];

  walk(document.body, (node) => {
    if (node.nodeName.toLowerCase() === tagName) {
      matches.push(node);
    }
  });

  return matches;
}

getElementsByTagName("p").forEach((paragraph) =>
  paragraph.classList.add("article-text")
);
```

- the DOM provides similar built in mthods like:
  - `document.getElementsByTagName(tagName)`
  - `document.getElementsByClassName(className)`

#### Problems group 2

1. My solution:

```javascript
function myGetElementsByTagName(tagName) {
  return document.getElementsByTagName(tagName);
}

myGetElementsByTagName("p").forEach((paragraph) =>
  paragraph.classList.add("article-text")
);
```

LS solution:

```javascript
let paragraphs = document.getElementsByTagName("p");
for (let index = 0; index < paragraphs.length; index += 1) {
  paragraphs[index].classList.add("article-text");
}
```

- OK so the take away is if you want all the h2s use query selector all and then convert it into an awway with Array.prototype.slice.call(h2s)
2.

- `document.getElementsByClassName('toctitle');`
  -LS solution: `document.getElementById('toc');`
- `document.getElementsByTagName('h2')[0]`
  - LS solution: `document.querySelector('#toc');`
- `document.querySelector('.toctitle')`
  - LS solution: `document.querySelectorAll('.toc')[0];`

1
```javascript
let paragraphs = document.getElementsByTagName("p");
for (let index = 0; index < paragraphs.length; index += 1) {
  // if (paragrpah[index].toString() === 'Div')
  if (paragraphs[index].parentNode.classList.value === 'intro') { paragraphs[index].classList.add("article-text");
  }
  
}
```
#### Finding More Than One Element
#### Built-In Functions
#### Using CSS Selectors

- it's often easier to seek by css selector.

`document.querySelector(selectors)`
`document.querySelectorAll(selectors)`


- like this:

```html
<div id="divOne"></div>
<div id="divTwo"></div>
```

```javascript
> document.querySelector('#divTwo, #divOne');
= <div id="divOne"></div>    // returns the first matching element;
                             // div with an id of `divOne` matched first
> document.querySelectorAll('#divTwo, #divOne');
= NodeList(2) [div#divOne, div#divTwo]
```

### [12Traversing Elements](https://launchschool.com/lessons/f0659709/assignments/55319aee)

#### textContent

- This part is about how to access the text nodes, because it's different, because DOM properties don't include non-element nodes. Like this:
  - `document.querySelector('a').textContent;` => "go back"
  - `document.querySelector('a').textContent = 'step backward;'
  - but it replaces all childNodes in the element with the text node, so be careful.
  - The way to do this operation safely is to place the text you need to update inside an element.

```html
<!doctype html>
<html lang="en-US">
  <head>
    <title>My Site</title>
  </head>
  <body>
    <div>
      Welcome to the site!<br>
      The time is <span class="time">9:15 am</span>.<br>
      You are logged in as <a href="/account">Kabu</a>.
    </div>
  </body>
</html>
```

```javascript
document.querySelector('.time').textContent = '9:16 am';
```

### [13Practice Problems: Finding Nodes and Traversing Elements](https://launchschool.com/lessons/f0659709/assignments/982b7c72)

- 2nd pass
1. solved:

```
let h2s = document.querySelectorAll('h2');
let h2sArray = Array.prototype.slice.call(h2s);
h2sArray.map(h => {
    let text = h.textContent.trim();
    return text.split(' ').length;
})
```

2. 
```
document.getElementById('toc');
document.getElementsByClassName('toc');
document.querySelectorAll('.toc')[0]
document.querySelector('.toc')
document.querySelector('#toc')
```
3. I'm not sure why my solutions seem to be referencing the wrong thing. Here is the LS solution:

```javascript
for (let i = 0; i < links.length; i ++) {
    if (i % 2 === 1) {
        links[i].style.color = 'green';
    }
}
```

4. I think I got the wrong thing. Perhaps I misunderstood what a thumbnail caption is...

my solution:

```javascript
let imgs = document.querySelectorAll('img');
let imgsArr = Array.prototype.slice.call(imgs);
imgsArr.map(e => e.alt);
```

LS solution:
```
let nodes = document.querySelectorAll('.thumbcaption');
let captions = [];

for (let index = 0; index < nodes.length; index += 1) {
  captions.push(nodes[index].textContent.trim());
}

console.log(captions);
```

combination of the two:

```javascript
let nodes = document.querySelectorAll(`.thumbcaption`);
let nodesArr = Array.prototype.slice.call(nodes);
nodesArr.map(e => e.textContent.trim())
```

4. Where the fuck was 'infobox' meant to come from?! I can see it, but it's such a large portion of the page, why not just use document?
- this line is particularly opaque to me: `link = cell.nextElementSibling.firstElementChild;`


### [14Creating and Moving DOM Nodes](https://launchschool.com/lessons/f0659709/assignments/05416748)

- example adding a paragraph to a DOM:

```javascript
let paragraph = document.createElement('p');
paragraph.textContent = 'This is a test.';
document.body.appendChild(paragraph);
```

or

```javascript
let text = document.createTextNode('This is a test.');
let paragraph = document.createElement('p');
paragraph.appendChild(text);
document.body.appendChild(paragraph);
```

#### Creating New Nodes
- One can either:
  -  create a new empty node with `document.create` methods:
    - `document.createElement(tagName)`	 => A new Element node
    - `document.createTextNode(text)`	=> A new Text node
  -  or clone an existing node hierarchy like this:
    - `node.cloneNode(deepClone)` => copy of a node
 
  - The argument to `.cloneNode` is a boolean. `true` means deep copy, so all the children as well, `false` os a shallow copy, so just that node:

```javascript
let paragraph2 = paragraph.cloneNode(true);
document.body.appendChild(paragraph2);
```

#### Adding Nodes to the DOM

- one can append/ insert or replace them:
  - NB: append child should use .body, as in `document.body.appendChild`
  - P(b)AC your PIB to the PRC
- No node may appear twice in the DOM. If you attempt to add a node that already exists it gets deleted from its original location, making the operation one of transfer rather than copying.
- Here are the Epstein's Island methods which insert nodes before/after/within an element. Note that the text one creates a new node with that text. The argument `position` can only be one of the following:
  - `beforebegin`
  - `afterbegin`
  - `beforeend`
  - `afterend`
 
#### Removing Nodes

- When you remove a node from the DOM it becomes eligible for garbage collection unless you keep a reference to the node in a variable.
- `node.remove()`
- `parent.removeChild(node)`

### [15The Browser Object Model (BOM)](https://launchschool.com/lessons/f0659709/assignments/629ea0ff)

- In this lesson we're looking mainly at the DOM, but you can access other things like the windows used to display the web-pages, like the browser's history, like sensors and that stuff is the BOM, but we don't go into that here.

### [16Practice Problems: the DOM](https://launchschool.com/lessons/f0659709/assignments/3ef4cf4e)

- 3/6/25
1.
```javascript
let h = document.querySelector('h1');
h.setAttribute('class','heading');
```

2.
```javascript
let u = document.querySelector('ul');
u.className = 'bulleted';
```

3. Does anyone get this first time?!
```javascript
document.getElementById('toggle').onclick = e => {
  e.preventDefault();
  let notice = document.getElementById('notice');
  if (notice.getAttribute('class') === 'hidden') {
    notice.setAttribute('class', 'visible');
  } else {
    notice.setAttribute('class', 'hidden');
  }
}
```

4. got it
```javascript
document.getElementById('notice').onclick = e => {
  document.getElementById('notice').setAttribute('class', 'hidden');
};
```

or

```javascript
document.getElementById('notice').onclick = e => {
  e.currentTarget.setAttribute('class', 'hidden');
};
```

5. nailed it
```javascript
document.getElementById('multiplication').textContent = (13 * 9).toString();
```

6. Somehow this worked:
`$0.id = 'styled';` -> because there was a note on the browser saying to refer to the body as `$0`. What to make of that?
LS solution: `document.body.setAttribute('id', 'styled');`

### [17Assignment: DOM Shuffling](https://launchschool.com/lessons/f0659709/assignments/2c9d1e4f)

- well, i certainly moved stuff around, and superficially it looked like it was in the right place, but the red colours showed I was not there.
- Solution has some good points:
  - uses P(b)IB, where i was using Epstein's island
  - `let h1 = document.querySelector("main > h1");`

### [18Summary](https://launchschool.com/lessons/f0659709/assignments/d863bc06)

- great

### [exercises](https://launchschool.com/exercises/02085795)

5. coloring. I'm a little stuck here. My bfs isn't working. I'll come back to it:

```javascript
function colorGeneration(target) {
  let level = 0;
  let queue = [document.body];

  while (queue.length && level < target) {
    console.log(`at level ${level}, queue is ${queue}`);
    let curr = queue.shift();
    for (let i = curr.children.length; i > 0; i--) {  
      queue.push(curr.children[i-1]);
    }
    level ++;
  }

  queue.map(e => e.setAttribute('class', 'generation-color'))
}
```

### [19 Quiz](https://launchschool.com/quizzes/50a33f83)

- 1st go (super rushed -> 50%)
- 2nd go (24.5.25) -> 50%, but less guessing, so better?

1. C Tcik
2. C no, D. so "\n" is indeed a valid DOM type.
3. D, no A. Element nodes don't have values, ya dingus.
4. B Tick.
5. B Tick
6. A Tick
7. B, C -> and D, so `Element.classList.add` is a valid way of adding a class to an element:
`Element.className = Element.className + ' someClass';`
8. failed to even try. In the end the way to find the answer was by writing code rather than counting manually. Correct, but no tick
9. A, B, C, D - Tick
10. D, but just because I ran the code. -> actually B. BEcause when we clone the `.intro` it makes an element with the same `id` tag, which is not allowed.

- 3rd: 4.6.25: 7/10 (70%) -> getting better, still too unsure.
1. C -> tick
2. D (very uncertain) -> tick
3. D (very uncertain) -> no, A -> ELEMENT NODES DON'T HAVE VALUES, THEY ARE NULL

Given the following HTML, what is the nodeValue of the p element?

```html
<body>
  <h1>Greetings!!</h1>
  <p><span>Hello</span>, world</p>
</body>
```

4. B (very uncertain) -> tick
5. B -> tick
6. A -> tick
7. B, C, D -> tick
8. I counter 13, I was waaaaaay off. 38(A)? I really have no idea. -> no, D. THe answer uses the `walk` method to count the children, it doesn't do it by eye as you tried.
9. A, C, D, no, and B (You can traverse the DOM in any direction)
10. I really have no idea, B? -> tick

## [2	Event-Driven Programming](https://launchschool.com/lessons/0e674886/assignments)
- 2nd pass (4.6.25)
### [1	Introduction](https://launchschool.com/lessons/0e674886/assignments/f9875c44)

- Instead of controlling the flow of the program, we set up **event listeners** that respond to actions or system events.

### [2	User Interfaces and Events](https://launchschool.com/lessons/0e674886/assignments/bc1afaa4)

- An event is an object that represents some occurence. It contains information about what happened and where.
- web apps can be broken down into 2 jobs:
  - set up the interface and display it
  - handle events from user/ browser actions.

##### User Interfaces Do a Lot of Waiting

-example with an input field that takes a number and returns the nth number in a fibonacci sequence.

### [3	A Simple Example](https://launchschool.com/lessons/0e674886/assignments/cee99839)

```javascript
<!doctype html>
<html lang="en-US">
  <head>
    <title>title</title>
    <meta charset="UTF-8">
    <script>
      document.addEventListener('DOMContentLoaded', event => {
        let addButton = document.getElementById('add');
        let output = document.getElementById('output');
        let count = 0;

        addButton.addEventListener('click', event => {
          count += 1;
          output.textContent = String(count);
        });
      });
    </script>
  </head>

  <body>
    <p>
      <span id="output">0</span>
      <button id="add">Add One</button>
    </p>
  </body>
</html>
```

1. Browser loads page, evaluates Javascript within `script` tag. 
- this registers a callback to handle the `DOMContentLoaded` event when it **fires** on document.
2. The browser waits for an event to fire.
3. The browser fully loads the HTML, builds the DOM and then fires the `DOMContentLoaded` event
4. The browser invokes the event handler for `DOMContentLoaded`. This uses `document.getElementById` to get references to two DOM elements and initializes the variable `count`.
- Plus it registers an event listener for `click` events on `addButton`
5. The browser waits for an event to fire.
6. WHen the user clocks the button the `click` event fires and the browser runs the handler. The callback increments the value of `count` and updates the `textContent` of the `#output` `pan`
7. Again the browser waits for an event to fire.

### [4	Page Lifecycle Events](https://launchschool.com/lessons/0e674886/assignments/99544445)

<img width="598" alt="Screenshot 2025-05-24 at 12 11 56" src="https://github.com/user-attachments/assets/d26c77c2-3244-491a-baff-80e2e86122e4" />

### [5	User Events](https://launchschool.com/lessons/0e674886/assignments/99544445)

- some different event examples:
  - Keyboard
    - keydown
    - keyup
  - Mouse
    - mouseenter, mouseleave, mousedown, mouseup, click
  - Touch
    - touchstart, touched, touchmove
  - Window
    - scroll, resize
  - Form
    - submit

### [6	Adding Event Listeners](https://launchschool.com/lessons/0e674886/assignments/1feb3d1e)

- AKA event handlers
- 4 stes to set up an event handler:
  -  identify the event you need to handle. (user actions, the page lifecycle, ...)
    -  "We want something to happen when the user clicks the 'alert' button, so we need to handle teh 'click' event."
  -  Identify the element that will receive the event (button? input field? other element?)
    -  "We'll use the `button` as that's where the interaction occurs"
  -  Define a function to call when this event occurs (the function is passed 1 arg, an `Event` object.
    -  "This function will display an alert using the contents of the `textArea`:

```javascript
function displayAlert(event) {
  let message = document.getElementById("message").value;
  alert(message);
}
```

  -  Register the function as an event listener. This step ties steps 1 - 3 together:
    -  "We can call `addEventListener` on a reference to the button":

```javascript
document.addEventListener("DOMContentLoaded", () => {
  let button = document.getElementById("alert");
  button.addEventListener("click", displayAlert);
});
```

- OK here is something I don't quite get, but must grok at some point:
  - "notice that we register `displayAlert` as the `click` listener within the `DOMContentLoaded` event handler. As we saw [earlier] we can't access the `button` element until _after_ the DOM is ready, so we mmust postpone the step until then."
- and if you're working from dev tools then you dont need to wait because the page is already loaded... duh.

#### Event Listeners and Handlers

- the terms _event listener_ and _event handler_ are treated interchangeably even though there's a difference:
  - the `addEventListener` method sets up an event listener for a specific type on an element. This is the overall system that listens for events.
  - The 2nd argument to the method above is the event handler.

### [7	The Event Object](https://launchschool.com/lessons/0e674886/assignments/ecdb4ea9)

- `event.type` -> the name of the event (ie. 'click')
- `event.currentTarget` -> the current object that the event object is on
- `event.target` -> the object on which the event occured (ie. the element you clicked)

- in this example the `target` changes every time you click, but the `currentTarget` stays the same because it's always defined in the same place (on `body`). (I would say that these two names should be swapped, but what do I know)
- Also bear in mind they can be the same object.

#### Mouse Events

- `button` -> which button was pressed
- `clientX` -> the horizontal position of the mouse when the event occured.
- `clientY` -> vertical (relative to the visible area of the page)

#### Keyboard Events

- `key` -> string of the pressed key (not on older browsers)
- `shiftKey` -> Boolean value , did you press Shift
- `altKey` -> as above
- `ctrlKey` -> as above
- `metaKey` -> aka command

#### Problems

1. OK, I peeked after a good attempt. The bit that was stumping me was how to adapt the cs styles. Turns out `querySelector` searches the css too!
2. 'mousemove' - fucking hell
3. OK, I'm glad I peeked, this one had some rough turns:

```javascript
document.addEventListener('mousemove', event => {
  let x = document.querySelector('.x');
  x.style.left = event.clientX.toString() + 'px';
  x.style.top = event.clientY.toString() + 'px';
});

document.addEventListener('keyup', event => {
  let key = event.key;
  let color;

  if (key === 'r') {
    color = 'red';
  } else if (key === 'g') {
    color = 'green';
  } else if (key === 'b') {
    color = 'blue';
  }

  if (color) {
    let x = document.querySelector('.x');
    for (let index = 0; index < x.children.length; index += 1) {
      var child = x.children[index];
      child.style.background = color;
    }
  }
});
```

4. Yeesh, this one was a lot:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  let composer = document.querySelector('.composer');
  let textarea = composer.querySelector('textarea');
  let counter = composer.querySelector('.counter');
  let button = composer.querySelector('button');
  
  function updateCounter() {
    let length = textarea.value.length;
    let remaining = 140 - length;
    let message = `${remaining.toString()} characters remaining`;
    let invalid = remaining < 0;
    
    textarea.classList.toggle('invalid', invalid);
    button.disabled = invalid;

    counter.textContent = message;    
  }
  
  textarea.addEventListener('keyup', updateCounter);
  
  updateCounter();
});
```

- 2nd attempt 4.6.25

1. Didn't get it
2. I didn't get it (also some dumb typos
3. Key aspects of soluton:
  - start by identifying all the objects we need to work with. These are composer, textarea, counter and button. 2 of these we get by class, two we get with their tag-name.
  - `let invalid = remaining < 0;` this line is deceptively simple, but useful.
  - `textarea.classList.toggle('invalid', invalid);` this line adds or removes the class depending on whether the 2nd argument resolves to true or not.

### [8	Capturing and Bubbling](https://launchschool.com/lessons/0e674886/assignments/4b0e007c)

- Downsides to event handling:
  - you have to wait until the DOM is ready (ie until the `DOMContentLoaded` event fires).
  - after that you have to add event handlers manually when you add new elements to the page.
  - adding handlers to a lot of elements can be slow and complicated.

#### Capturing & bubbling

- There are 4 distinct nested elements.

- Scenario 1: Adding the Event Listener to the Innermost Element
  - basic: the innermost element has an event listenter that alerts when it is clicked.  
- Scenario 2: Adding the Event Listener to an Outer Element:
  - When we add the same event listener to elem2, it works for both of the elems nested inside it. So even though it is only defined on elem2, it can be invoked for elem 3 and elem 4.
- Scenario 3: Adding the Event Listener to the Innermost and Outermost Element
  - There is one event, but two alert boxes, because there are two event handlers.

- Capturing and bubbling are phases that an event goes through after it initially fires:
**capturing**
1. The event gets dispatched to global `window` object
2. then to the `document object
3. Then to the target element (the element on which the event was originally fired)
  - outer elements to inner elements
----------process reverses-------------(target phase, between capturing and bubbling)
**bubbling**
4. inner elements to outer elements
5. document
6. window
##### When is the Event Handler Invoked?
- By default the listener is set to fire during bubbling. To toggle this to capturing add `true` as a 3rd argument. 

```javascript
elem1.addEventListener('click', callbackFunction, true);
// Notice the third argument. It's set to `true`. When it's set to true, the event listener will listen during the capturing phase. If not specified, `useCapture` defaults to `false`, and the event listener listens during the bubbling phase.
```

##### target v currentTarget

- seems straightforward. currentTarget is what the handler is defined on and target is the last click or whatnot.

##### value of `this` within the handler when using a function expression

- it's currentTarget. which is what i would have guessed.

- Capturing and bubbling are phases that an event goes through after it initially fires
- So is it like a variable lookup path?
- Each variable is visited twice, once going down (capturing) and once coming up (bubbling)
- To set the handler to listen on the capturing phase, (rather than the bubbling phase), you provide a 3rd argument:



#### Problems

1. add `true` as the third argument to the first event capture.
- 2nd pass also correct
2. OK I get this.
- 2nd pass as well
3. Seemed straightforward, but they tricked you, because elem 0 was not part of the nest, it was closed, therefore not part of the bubble

- ok this I get 100%

### [9	Practice Problems: Capturing and Bubbling](https://launchschool.com/lessons/0e674886/assignments/110f9c82)

1. 4, 1 - because we are following normal bubbling capturing and the 2 events are defined on elem1, the difference being that one fires on `target` (elem4`) and the other on `currentTarget` (elem1, where the even listener is defined). So we capture down to the inner-most nested element: 4, then bubble back up and trigger on the bubbling phase, therefore 4, 1
  - You got the order and logic correct, but missed that what is printed is the tag name, rather than the id or text content, so the outcome is 'MAIN', 'DIV'

2. "capturing", "bubbling". Again the two listener events are both defined on elem1, but the 2nd method has `true` provided as a 3rd argument, meaning it will fire during the capturing phase, ie the first phase.This is why "capturing" will be printed first.
  - correct

3. "Elem1 Listener triggered!" will print, the other will not, regardlesss of whether `on capture` is set to true or not.
  - correct.

### [10	Preventing Propagation and Default Behaviors](https://launchschool.com/lessons/0e674886/assignments/b22cabb4)

- `event.stopPropagation`
- `event.preventDefault`

#### Stopping Propagation

- `event.stopPropagation` halts bubbling/capturing.

#### Preventing Default Behaviors

- `event.preventDefault`

### [11	Event Delegation](https://launchschool.com/lessons/0e674886/assignments/5bd2ade1)

- Drawbacks of adding listeners everywhere they're needed
  - You must wait for the DOM to finish loading before adding event handlers. (do you? Or is it just this particular way. In which case why ?)
  - Modern web pages often add elements after the page finishes loading, but any elements added later wont have those event handlers, so the dev must explicitly add listeners to new elements as the application adds them.
  - Attaching many listeners to a document costs performance and memory

- **event delegation**: defining your event listener on an ancestor object so that, so it doesn't have to be defined on a million buttons.

- It doesn't have to be the defined on the `document`, although often that's useful.

##### When To Use Event Delegation

- At the beginning of a project bind the event handlers directly to elements. Then as the code grows in size/complexity reduce the number of event handlers required.

### [12	Assignment: Guessing Game](https://launchschool.com/lessons/0e674886/assignments/55b5d527)

- pretty straight-forward (once i'd had a night of rest)
- 2nd pass (4.6.25)

### [13	Assignment: Build an Input Box](https://launchschool.com/lessons/0e674886/assignments/033bf169)

- 2nd pass 4.6.25
1. nailed it.
3. My convoluted solution:

```javascript
    setInterval(() => {
      if (!textField.classList.contains('cursor')) {
        textField.classList.add('cursor');
      } else {
        textField.classList.remove('cursor');
      }
    }, 500);
  });
```

LS solution:   `setInterval(() => textField.classList.toggle('cursor'), 500);`

7. Why is my solution not better?
  `clearInterval(cursorInterval);`
LS solution:
  line 10: `cursorInterval = cursorInterval || setInterval(() => textField.classList.toggle('cursor'), 500);` (when you click on the text box)
  line 26: `cursorInterval = null;` (when you click elsewhere)

### 14	Summary

4. Here says "Event listeners are callbacks that the browser will invoke when a matching event occurs.", but I'm fairly sure LS told me that that is event handlers, and the listener is the method that takes the handler as its 2nd argument... ?

### 15	Quiz

- 1st go (0%)
- 2nd go (26.5.25) -> 7/8 = 88%
1. A Tick
2. C Tick
3. B Tick
4. A, B, C Tick
5. C; Tick
6. A, C, D -> not D. ALmsot, but ew should be checking `event.target` not `event.currentTarget`.
7. B Tick
8. B Tick

## [3	Creating Responsive Webpages](https://launchschool.com/lessons/6169e7e7/assignments)
### [1	Introduction](https://launchschool.com/lessons/6169e7e7/assignments/7bd7d615)
- breaking down problems
- organizing code
- handling user interactions effectively

### [2	HTML Data Attributes](https://launchschool.com/lessons/6169e7e7/assignments/4d45d956)

- the point is JS needs to be able to find them even if they get moved around. So, not -> 'find me the first child', but 'find me the contents button, wherever it is'

##### Data Attributes in HTML

- sometimes ID attributes are used to achieve this, but that's not really their job.
  - instead you should create your own attributes on the tabs and set their values to match the custom attributes on the contents blocks.
    - that's what Launchschool says. I have questions:
      - What is the content's block?
      - SHow me an attribute? To remind me what that looks like and how it differs from other parts of the tag?
- With the introduction of HTML5 came the ability to create custom data attributes.
  - These are just for storing data for you, they don't do anything else. Which means their like little post it notes for you that the engine also knows where they are. Like air-tags for finding your keys i guess.
- They must have 'data-' followed by at least 1 character.
- The problem with using ID attributes to do this job is that it might be confusing the css, which is also relying on that tag to know what to style. So with data attributes you can change them willy-nilly and it won't confuse the css.
- There is no limit to the number of data attributes you can add to an element.

##### Reading and Writing Data Attributes in JavaScript

- You can access data attributes using the `dataset` property on an element.
- The following retrieves the `data-block` value from the selected `<a>` element

```javascript
const goldTab = document.querySelector('a[data-block="gold"]');

console.log(goldTab.dataset.block); // "gold"
```

- You can also modify data attributes dynamically:
  - `goldTab.dataset.block = "platinum"; // Updates the attribute value`
- we can look at all of an element's data attributes with `console.table`:
  - `console.table(godTab.dataset`
- finally you can remove a data attribute using the `delete` operator;
  - `delete goldTab.dataset.block;`

##### Naming Conventions for Data Attributes

- when using `dataset` attribute names with hyphens are converted to camelCase, like below:

`<div data-date-of-birth="1999-09-09"></div>`
is accessed thusly:
`document.querySelector('div').dataset.dateOfBirth;

- (because hyphens are not allowed in Javascript property names)


### [3	Assignment: Arithmetic Calculator](https://launchschool.com/lessons/6169e7e7/assignments/37105b2e)


- I peeked fairly early.
- Interesting things I learnt:
  - coercing a string result into a number by just prepending +
  - the dispatch table (neat)
  - Earlier the course implied tha referencing tags by their id was not as good as referencing them by data-attributes, but here that's what we do...

### [4	Assignment: Grocery List](https://launchschool.com/lessons/6169e7e7/assignments/9b6bffb7)

- 

### [5	Project: Guess a Word, Part 1: Game Logic](https://launchschool.com/lessons/6169e7e7/assignments/28a0459e)

### [6	Project: Guess a Word, Part 2: User Interface](https://launchschool.com/lessons/6169e7e7/assignments/15e6c115)

### 7	More Exercises

### [8	JS230 Course Feedback](https://launchschool.com/lessons/6169e7e7/assignments/8df635c3)
