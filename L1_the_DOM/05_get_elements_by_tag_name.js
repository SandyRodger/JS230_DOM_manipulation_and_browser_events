// my solution:

function walk(node, callback) {
  callback(node);

  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index], callback);
  }
}

function collectParagraphElements(document) {
  let output = [];
  walk(document, node => {
    if (node.nodeName === 'P') {
      output.push(node)
    }
  })
  return output;
}

function getElementsByTagName(document, name) {  
  let paras = collectParagraphElements(document);
  let filteredParas = paras.filter((n) => n.nodeName === name);
  return filteredParas.map((n) => n.classList.add('article-text'));
}

getElementsByTagName(document, 'P');

// LS solution:

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

// with document.getElementsByTagName()

function myGetElementsByTagName(tagName) {
  return document.getElementsByTagName(tagName);
}

myGetElementsByTagName("p").forEach((paragraph) =>
  paragraph.classList.add("article-text")
);

// 2.

let paragraphs = document.getElementsByTagName("p");
for (let index = 0; index < paragraphs.length; index += 1) {
  // if (paragrpah[index].toString() === 'Div')
  // console.log(paragrpah[index].toString())
  paragraphs[index].classList.add("article-text");
}