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
- Jut remember they aren't visible in the web-browser, but they are there.
##### DOM levels

- referes to which features are available where. You don't need to know this.

### Problems:

- fine (I didn't do the drawing, but I think I would have gotten the same answer)

### [4	Node Properties](https://launchschool.com/lessons/f0659709/assignments/b40afb49)

`let p = document.querySelector("p");`

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


### [10Practice Problems: Traversing and Accessing Attributes](https://launchschool.com/lessons/f0659709/assignments/d01702c5)
### [11Finding DOM Nodes](https://launchschool.com/lessons/f0659709/assignments/bec976e6)
#### Finding An Element By Id
#### Finding More Than One Element
#### Built-In Functions
#### Using CSS Selectors

### [12Traversing Elements](https://launchschool.com/lessons/f0659709/assignments/55319aee)
#### textContent

### [13Practice Problems: Finding Nodes and Traversing Elements](https://launchschool.com/lessons/f0659709/assignments/982b7c72)
### [14Creating and Moving DOM Nodes](https://launchschool.com/lessons/f0659709/assignments/05416748)
#### Creating New Nodes
Node Creation Method	Returns
document.createElement(tagName)	A new Element node
document.createTextNode(text)	A new Text node
node.cloneNode(deepClone)
#### Adding Nodes to the DOM
#### Removing Nodes

### [15The Browser Object Model (BOM)](https://launchschool.com/lessons/f0659709/assignments/629ea0ff)
### [16Practice Problems: the DOM](https://launchschool.com/lessons/f0659709/assignments/3ef4cf4e)
### [17Assignment: DOM Shuffling](https://launchschool.com/lessons/f0659709/assignments/2c9d1e4f)
### [18Summary](https://launchschool.com/lessons/f0659709/assignments/d863bc06)
### 19 Quiz

## [2	Event-Driven Programming](https://launchschool.com/lessons/0e674886/assignments)

### [1	Introduction](https://launchschool.com/lessons/0e674886/assignments/f9875c44)

### [2	User Interfaces and Events](https://launchschool.com/lessons/0e674886/assignments/bc1afaa4)
##### User Interfaces Do a Lot of Waiting
### [3	A Simple Example](https://launchschool.com/lessons/0e674886/assignments/cee99839)
### [4	Page Lifecycle Events](https://launchschool.com/lessons/0e674886/assignments/99544445)
### [5	User Events](https://launchschool.com/lessons/0e674886/assignments/99544445)
### [6	Adding Event Listeners](https://launchschool.com/lessons/0e674886/assignments/1feb3d1e)
#### Event Listeners and Handlers
### [7	The Event Object](https://launchschool.com/lessons/0e674886/assignments/ecdb4ea9)
#### Mouse Events
#### Keyboard Events
#### Problems
### [8	Capturing and Bubbling](https://launchschool.com/lessons/0e674886/assignments/4b0e007c)
##### When is the Event Handler Invoked?

### [9	Practice Problems: Capturing and Bubbling](https://launchschool.com/lessons/0e674886/assignments/110f9c82)
### [10	Preventing Propagation and Default Behaviors](https://launchschool.com/lessons/0e674886/assignments/b22cabb4)
#### Stopping Propagation
#### Preventing Default Behaviors
### [11	Event Delegation](https://launchschool.com/lessons/0e674886/assignments/5bd2ade1)
##### When To Use Event Delegation
### [12	Assignment: Guessing Game](https://launchschool.com/lessons/0e674886/assignments/55b5d527)

### [13	Assignment: Build an Input Box](https://launchschool.com/lessons/0e674886/assignments/033bf169)
### 14	Summary
### 15	Quiz

## [3	Creating Responsive Webpages](https://launchschool.com/lessons/6169e7e7/assignments)

### 1	Introduction
### [2	HTML Data Attributes](https://launchschool.com/lessons/6169e7e7/assignments/4d45d956)
##### Data Attributes in HTML
##### Reading and Writing Data Attributes in JavaScript
##### Naming Conventions for Data Attributes
### [3	Assignment: Arithmetic Calculator](https://launchschool.com/lessons/6169e7e7/assignments/37105b2e)
### [4	Assignment: Grocery List](https://launchschool.com/lessons/6169e7e7/assignments/9b6bffb7)

### [5	Project: Guess a Word, Part 1: Game Logic](https://launchschool.com/lessons/6169e7e7/assignments/28a0459e)
### [6	Project: Guess a Word, Part 2: User Interface](https://launchschool.com/lessons/6169e7e7/assignments/15e6c115)
### 7	More Exercises
### [8	JS230 Course Feedback](https://launchschool.com/lessons/6169e7e7/assignments/8df635c3)
