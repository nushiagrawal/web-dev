/* =========================================================================
   WebCraft Academy — script.js
   1. COURSE DATA   — plain, declarative slide objects. Add a topic's array
                       entry to add a slide; nothing else needs to change.
   2. HIGHLIGHTER   — tiny dependency-free syntax highlighter for HTML/CSS/JS.
   3. RENDERER      — turns a slide object into DOM.
   4. APP           — state, event wiring, keyboard/touch/fullscreen/zoom.
   ========================================================================= */

/* ============================== 1. COURSE DATA ========================== */

// ---- tiny block factories, purely for readability when authoring slides ----
const text     = (t) => ({ type: 'text', text: t });
const bullets  = (items) => ({ type: 'list', ordered: false, items });
const numbered = (items) => ({ type: 'list', ordered: true, items });
const code     = (lang, src) => ({ type: 'code', lang, code: src.replace(/^\n/, '').replace(/\s+$/, '') });
const columns  = (cols) => ({ type: 'columns', cols });
const callout  = (tone, title, t) => ({ type: 'callout', tone, title, text: t });

const courses = {

  /* ============================= HTML ================================== */
  html: [
    {
      icon: '📄', title: 'What is HTML?', subtitle: 'The skeleton of every web page',
      blocks: [
        text('<strong>HTML</strong> (HyperText Markup Language) is the standard language used to create the structure and content of web pages. It tells the browser <em>what</em> each piece of content is — a heading, a paragraph, an image, a link — not how it looks.'),
        columns([
          { title: '🧱 Structure', text: 'HTML is the skeleton: it arranges content into headings, sections, lists and more.' },
          { title: '🎨 Handled by CSS', text: 'Colors, spacing and layout are added separately with CSS, not HTML.' },
          { title: '⚡ Handled by JS', text: 'Interactivity and behavior are added separately with JavaScript.' },
        ]),
        code('html', `
<!-- Your very first HTML -->
<h1>Hello, world!</h1>
<p>This paragraph is written in HTML.</p>
        `),
        callout('tip', 'Good to know', 'Every website you have ever visited — including this slideshow — starts with HTML. It is the one language every browser understands.'),
      ],
    },
    {
      icon: '🏗️', title: 'Document Structure', subtitle: 'The required skeleton of an HTML file',
      blocks: [
        text('Every HTML document follows the same basic skeleton. Browsers expect these pieces in this order.'),
        code('html', `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
</head>
<body>
  <!-- visible content goes here -->
</body>
</html>
        `),
        bullets([
          '<strong>&lt;!DOCTYPE html&gt;</strong> — tells the browser to use modern HTML5 rules.',
          '<strong>&lt;html&gt;</strong> — the root element that wraps the whole page.',
          '<strong>&lt;head&gt;</strong> — metadata: title, character set, linked CSS/JS (not shown to the user).',
          '<strong>&lt;body&gt;</strong> — everything the visitor actually sees.',
        ]),
      ],
    },
    {
      icon: '🏷️', title: 'Elements & Tags', subtitle: 'The building blocks of HTML',
      blocks: [
        text('An HTML <strong>element</strong> is usually made of an opening tag, content, and a closing tag. Tags can also carry extra information called <strong>attributes</strong>.'),
        code('html', `
<p class="intro">This is a paragraph element.</p>
<!--  ^opening tag  ^content   ^closing tag   -->

<img src="cat.jpg" alt="A sleepy cat">
<!-- a "void" element: no closing tag needed -->
        `),
        columns([
          { title: 'Attributes', text: 'Extra info inside the opening tag, written as name="value", e.g. class, id, src, href.' },
          { title: 'Nesting', text: 'Elements can contain other elements, forming a tree of parents and children.' },
        ]),
        callout('warn', 'Watch out', 'Void elements like <code>&lt;img&gt;</code>, <code>&lt;br&gt;</code> and <code>&lt;input&gt;</code> never get a closing tag — they cannot contain content.'),
      ],
    },
    {
      icon: '📝', title: 'Headings & Paragraphs', subtitle: 'Structuring text content',
      blocks: [
        text('Headings (<code>&lt;h1&gt;</code>–<code>&lt;h6&gt;</code>) create a content outline, and <code>&lt;p&gt;</code> holds regular text.'),
        code('html', `
<h1>Page Title</h1>
<h2>Section Heading</h2>
<h3>Sub-section Heading</h3>
<p>
  A paragraph is a block of readable text. You can
  <strong>bold</strong> or <em>italicize</em> words inside it.
</p>
        `),
        bullets([
          'Use exactly one <strong>&lt;h1&gt;</strong> per page — it is the main title.',
          "Don't skip levels just to make text smaller — use CSS for size instead.",
          'A clear heading hierarchy helps both readers and search engines.',
        ]),
      ],
    },
    {
      icon: '🔗', title: 'Links & Images', subtitle: 'Connecting pages and adding media',
      blocks: [
        code('html', `
<!-- Link to another page -->
<a href="https://example.com" target="_blank">Visit Example</a>

<!-- Link to a page on the same site -->
<a href="/about.html">About us</a>

<!-- Image -->
<img src="images/logo.png" alt="Company logo" width="120">
        `),
        columns([
          { title: '<code>href</code>', text: 'The destination URL of a link — absolute (https://…) or relative (/page.html).' },
          { title: '<code>alt</code>', text: 'Describes an image for screen readers and shows if the image fails to load. Required for accessibility.' },
        ]),
        callout('tip', 'Tip', 'target="_blank" opens a link in a new tab — great for external sites so you don\u2019t navigate visitors away.'),
      ],
    },
    {
      icon: '📋', title: 'Lists', subtitle: 'Grouping related items',
      blocks: [
        text('HTML offers unordered, ordered, and description lists for grouping content.'),
        code('html', `
<ul>
  <li>Milk</li>
  <li>Eggs</li>
  <li>Bread</li>
</ul>

<ol>
  <li>Preheat the oven</li>
  <li>Mix the batter</li>
  <li>Bake for 20 minutes</li>
</ol>
        `),
        bullets([
          '<strong>&lt;ul&gt;</strong> — unordered (bulleted) list, order does not matter.',
          '<strong>&lt;ol&gt;</strong> — ordered (numbered) list, sequence matters.',
          '<strong>&lt;li&gt;</strong> — each list item, used inside &lt;ul&gt; or &lt;ol&gt;.',
          'Lists can be nested inside one another to show sub-items.',
        ]),
      ],
    },
    {
      icon: '🧾', title: 'Forms', subtitle: 'Collecting input from users',
      blocks: [
        code('html', `
<form action="/submit" method="POST">
  <label for="name">Your name</label>
  <input type="text" id="name" name="name" required>

  <label for="email">Email</label>
  <input type="email" id="email" name="email">

  <button type="submit">Send</button>
</form>
        `),
        bullets([
          '<strong>&lt;form&gt;</strong> wraps every input and defines where/how data is sent.',
          '<strong>&lt;input type="…"&gt;</strong> — text, email, password, checkbox, radio, date, and more.',
          '<strong>&lt;label for="id"&gt;</strong> connects a caption to its input — click the label to focus it.',
          '<strong>required</strong> and other attributes add built-in validation.',
        ]),
      ],
    },
    {
      icon: '🧭', title: 'Semantic HTML', subtitle: 'Tags that describe meaning, not just appearance',
      blocks: [
        text('Semantic elements clearly describe their purpose to the browser, assistive technology, and other developers — instead of generic <code>&lt;div&gt;</code>s everywhere.'),
        code('html', `
<header>Site logo & navigation</header>
<nav>Main menu links</nav>
<main>
  <article>
    <section>Primary article content</section>
  </article>
  <aside>Related links</aside>
</main>
<footer>Copyright & contact info</footer>
        `),
        columns([
          { title: '♿ Accessibility', text: 'Screen readers use semantic tags to let users jump straight to nav, main content, etc.' },
          { title: '🔍 SEO', text: 'Search engines weigh content inside <code>&lt;article&gt;</code> and headings more meaningfully.' },
        ]),
      ],
    },
  ],

  /* ============================== CSS =================================== */
  css: [
    {
      icon: '🎨', title: 'What is CSS?', subtitle: 'Styling the web',
      blocks: [
        text('<strong>CSS</strong> (Cascading Style Sheets) controls how HTML elements look: colors, spacing, fonts, layout and animation. HTML provides structure — CSS provides design.'),
        code('css', `
/* selector { property: value; } */
p {
  color: #333;
  font-size: 16px;
}
        `),
        bullets([
          'A <strong>rule</strong> targets elements with a <strong>selector</strong> and applies <strong>declarations</strong>.',
          'Each declaration is a property/value pair, ending with a semicolon.',
          'CSS can live in its own file, in a &lt;style&gt; tag, or inline on an element.',
        ]),
      ],
    },
    {
      icon: '🔌', title: 'How CSS Works', subtitle: 'Adding styles & understanding the cascade',
      blocks: [
        columns([
          { title: '1. External', text: '&lt;link rel="stylesheet" href="style.css"&gt; — best practice, keeps files separate.' },
          { title: '2. Internal', text: 'A &lt;style&gt; block inside &lt;head&gt; — fine for a single page.' },
          { title: '3. Inline', text: 'A style="…" attribute on one element — highest priority, hardest to maintain.' },
        ]),
        code('html', `
<head>
  <link rel="stylesheet" href="style.css">
</head>
        `),
        callout('info', 'The Cascade', 'When rules conflict, CSS resolves them using source order, specificity, and inheritance — the "C" in CSS.'),
      ],
    },
    {
      icon: '🎯', title: 'Selectors', subtitle: 'Targeting the elements you want to style',
      blocks: [
        code('css', `
p            { color: navy; }        /* element selector   */
.card        { padding: 16px; }      /* class selector     */
#logo        { width: 120px; }       /* id selector        */
nav a        { text-decoration: none; } /* descendant       */
a:hover      { color: crimson; }     /* pseudo-class       */
h2 + p       { margin-top: 0; }      /* adjacent sibling   */
        `),
        bullets([
          '<strong>.class</strong> selectors are reusable across many elements — most common in real projects.',
          '<strong>#id</strong> selectors target exactly one element and carry high specificity.',
          '<strong>Combinators</strong> (space, &gt;, +, ~) select based on relationships between elements.',
        ]),
      ],
    },
    {
      icon: '🌈', title: 'Colors & Backgrounds', subtitle: 'Painting your page',
      blocks: [
        code('css', `
.box {
  color: #1a1b26;                 /* hex        */
  background-color: rgb(109 94 248); /* rgb      */
  border-color: hsl(255 90% 65%); /* hsl        */
  background-image: linear-gradient(135deg, #6d5ef8, #9333ea);
  background-size: cover;
}
        `),
        columns([
          { title: 'Hex', text: '#ff6b45 — six digits: red, green, blue.' },
          { title: 'RGB', text: 'rgb(255 107 69) — same colors, base-10.' },
          { title: 'HSL', text: 'hsl(14 100% 64%) — hue, saturation, lightness; intuitive to tweak.' },
        ]),
      ],
    },
    {
      icon: '🔤', title: 'Fonts & Text', subtitle: 'Typography in CSS',
      blocks: [
        code('css', `
body {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
}
h1 {
  font-weight: 700;
  letter-spacing: -0.02em;
  text-align: center;
  text-transform: uppercase;
}
        `),
        bullets([
          '<strong>font-family</strong> accepts a fallback list, used in order if a font is unavailable.',
          '<strong>line-height</strong> (unitless) controls space between lines — 1.4–1.7 reads comfortably.',
          '<strong>font-weight</strong>, <strong>text-align</strong> and <strong>letter-spacing</strong> fine-tune the look.',
        ]),
      ],
    },
    {
      icon: '📦', title: 'The Box Model', subtitle: 'How every element is measured',
      blocks: [
        text('Every element is a rectangular box made of four layers, from the inside out:'),
        numbered([
          '<strong>Content</strong> — the text or media itself.',
          '<strong>Padding</strong> — space between content and the border.',
          '<strong>Border</strong> — a visible (or invisible) edge around the padding.',
          '<strong>Margin</strong> — space outside the border, separating it from other elements.',
        ]),
        code('css', `
.card {
  box-sizing: border-box; /* width includes padding & border */
  width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  margin: 16px;
}
        `),
      ],
    },
    {
      icon: '📐', title: 'Flexbox', subtitle: 'One-dimensional layout, made easy',
      blocks: [
        code('css', `
.nav {
  display: flex;
  flex-direction: row;       /* main axis: left → right */
  justify-content: space-between; /* align on main axis  */
  align-items: center;       /* align on cross axis      */
  gap: 16px;
}
        `),
        columns([
          { title: 'justify-content', text: 'Positions items along the main axis: start, center, space-between…' },
          { title: 'align-items', text: 'Positions items along the cross axis: stretch, center, flex-end…' },
          { title: 'flex: 1', text: 'Lets a child grow/shrink to fill available space.' },
        ]),
        callout('tip', 'Tip', 'Flexbox shines for rows or columns of items — navbars, cards, toolbars, centering anything.'),
      ],
    },
    {
      icon: '🧩', title: 'CSS Grid', subtitle: 'Two-dimensional layout',
      blocks: [
        code('css', `
.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
}
.sidebar { grid-column: 1; }
.content { grid-column: 2; }
        `),
        bullets([
          'Grid controls <strong>rows and columns at once</strong> — ideal for whole-page layouts.',
          '<strong>fr</strong> units divide remaining space proportionally (1fr = one share).',
          '<strong>grid-template-areas</strong> lets you name regions like "header" and "sidebar" visually.',
        ]),
        callout('info', 'Flexbox vs Grid', 'Rule of thumb: Flexbox for a single row/column of items, Grid for full two-dimensional layouts.'),
      ],
    },
  ],

  /* ============================ JAVASCRIPT =============================== */
  js: [
    {
      icon: '⚡', title: 'What is JavaScript?', subtitle: 'Making pages interactive',
      blocks: [
        text('<strong>JavaScript</strong> is the programming language of the web. While HTML structures a page and CSS styles it, JavaScript makes it <em>respond</em> — to clicks, input, timers and data.'),
        code('html', `
<script>
  console.log("Hello from JavaScript!");
</script>
        `),
        columns([
          { title: '🖱️ Interactivity', text: 'Respond to clicks, typing, scrolling and more.' },
          { title: '🔄 Dynamic content', text: 'Update the page without reloading it.' },
          { title: '🌐 Everywhere', text: 'Runs in every browser, and on servers via Node.js.' },
        ]),
      ],
    },
    {
      icon: '📦', title: 'Variables', subtitle: 'Storing values with let, const & var',
      blocks: [
        code('js', `
let score = 10;        // can be reassigned later
score = 20;

const name = "Ava";    // cannot be reassigned
// name = "Zoe";        //  ❌ throws an error

var legacy = true;     // older syntax, function-scoped
        `),
        bullets([
          '<strong>const</strong> — use by default; the binding can\u2019t be reassigned.',
          '<strong>let</strong> — use when the value needs to change over time.',
          '<strong>var</strong> — the original keyword; mostly avoided in modern code.',
          'Variable names are case-sensitive and conventionally use camelCase.',
        ]),
      ],
    },
    {
      icon: '🔢', title: 'Data Types', subtitle: 'The kinds of values JavaScript stores',
      blocks: [
        code('js', `
let str   = "Hello";     // string
let num   = 42;          // number
let bool  = true;        // boolean
let empty = null;        // intentional "nothing"
let missing;              // undefined
let list  = [1, 2, 3];   // object (array)
let user  = { name: "Ava" }; // object

typeof num;  // "number"
        `),
        bullets([
          '<strong>Primitives</strong>: string, number, boolean, null, undefined, symbol, bigint.',
          '<strong>Objects</strong> (including arrays and functions) group multiple values together.',
          '<strong>typeof</strong> checks a value\u2019s type at runtime.',
        ]),
      ],
    },
    {
      icon: '🔀', title: 'Conditions', subtitle: 'Making decisions in code',
      blocks: [
        code('js', `
let age = 18;

if (age >= 18) {
  console.log("You can vote");
} else if (age >= 13) {
  console.log("Teenager");
} else {
  console.log("Child");
}

// shorthand ternary
let status = age >= 18 ? "adult" : "minor";
        `),
        bullets([
          '<strong>if / else if / else</strong> run different code branches based on a condition.',
          'Values like 0, "", null, undefined and NaN are <strong>falsy</strong>; most others are <strong>truthy</strong>.',
          '<strong>switch</strong> is handy for many possible exact-match cases.',
        ]),
      ],
    },
    {
      icon: '🔁', title: 'Loops', subtitle: 'Repeating actions',
      blocks: [
        code('js', `
for (let i = 0; i < 3; i++) {
  console.log("Round", i);
}

const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}

let n = 3;
while (n > 0) {
  console.log(n--);
}
        `),
        bullets([
          '<strong>for</strong> — best when you know how many times to repeat.',
          '<strong>for...of</strong> — iterates directly over array values.',
          '<strong>while</strong> — repeats as long as a condition stays true.',
          '<strong>break</strong> exits a loop early; <strong>continue</strong> skips to the next round.',
        ]),
      ],
    },
    {
      icon: '🧩', title: 'Functions', subtitle: 'Reusable blocks of logic',
      blocks: [
        code('js', `
function add(a, b) {
  return a + b;
}

const multiply = function (a, b) {
  return a * b;
};

const square = (x) => x * x;   // arrow function

add(2, 3);      // 5
square(4);      // 16
        `),
        bullets([
          'Functions take <strong>parameters</strong> in and give a <strong>return</strong> value back out.',
          'Arrow functions <code>(x) => x * x</code> are a short, modern syntax, common in callbacks.',
          'A function that calls itself is a <strong>recursive</strong> function.',
        ]),
      ],
    },
    {
      icon: '🗂️', title: 'Arrays & Objects', subtitle: 'Structuring collections of data',
      blocks: [
        code('js', `
const nums = [1, 2, 3, 4];
nums.push(5);                    // add to the end
const doubled = nums.map(n => n * 2);
const evens   = nums.filter(n => n % 2 === 0);

const user = {
  name: "Ava",
  age: 25,
};
console.log(user.name);   // dot notation
console.log(user["age"]); // bracket notation
        `),
        bullets([
          '<strong>Arrays</strong> are ordered lists; <strong>objects</strong> are named key/value pairs.',
          '<strong>.map()</strong> transforms every item; <strong>.filter()</strong> keeps only matching items.',
          'Access object properties with dot notation or bracket notation.',
        ]),
      ],
    },
    {
      icon: '🖥️', title: 'DOM Manipulation', subtitle: 'JavaScript talking to HTML',
      blocks: [
        text('The <strong>DOM</strong> (Document Object Model) is the browser\u2019s live representation of the page. JavaScript can read and change it.'),
        code('js', `
const btn = document.querySelector("#likeButton");

btn.addEventListener("click", () => {
  btn.textContent = "Liked!";
  btn.style.color = "crimson";
});

const item = document.createElement("li");
item.textContent = "New item";
document.querySelector("ul").appendChild(item);
        `),
        bullets([
          '<strong>document.querySelector()</strong> finds an element using a CSS selector.',
          '<strong>addEventListener()</strong> runs code in response to clicks, input, and more.',
          'Elements can be created, styled and inserted entirely from JavaScript.',
        ]),
      ],
    },
  ],
};


/* ============================== 2. HIGHLIGHTER =========================== */
/* Small, dependency-free syntax highlighter. Escapes HTML first, then wraps
   recognizable tokens in <span> classes styled in style.css. Good enough for
   readable teaching snippets — not a full tokenizer/parser. */

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const JS_KEYWORDS = /\b(const|let|var|function|return|if|else|for|of|in|while|do|break|continue|switch|case|default|class|new|this|typeof|instanceof|true|false|null|undefined|import|export|from|async|await|try|catch|finally|throw|extends|super|yield|static|get|set)\b/g;

function highlightJS(src) {
  let out = escapeHtml(src);
  // comments first (protect them from further token matching)
  const tokens = [];
  const stash = (match, cls) => {
    tokens.push(`<span class="${cls}">${match}</span>`);
    return `\u0000${tokens.length - 1}\u0000`;
  };
  out = out.replace(/\/\/.*$/gm, (m) => stash(m, 'tok-com'));
  out = out.replace(/(&quot;|"|')(?:(?!\1).)*\1|`(?:[^`\\]|\\.)*`/g, (m) => stash(m, 'tok-str'));
  out = out.replace(JS_KEYWORDS, (m) => stash(m, 'tok-kw'));
  out = out.replace(/(?<!\u0000)\b(\d+(\.\d+)?)\b(?!\u0000)/g, (m) => stash(m, 'tok-num'));
  out = out.replace(/\b([a-zA-Z_$][\w$]*)(?=\()/g, (m) => stash(m, 'tok-fn'));
  out = out.replace(/\u0000(\d+)\u0000/g, (_, i) => tokens[i]);
  return out;
}

function highlightCSS(src) {
  let out = escapeHtml(src);
  const tokens = [];
  // NOTE: every regex below that runs after the first stash() call must not
  // be able to match INTO an already-stashed "\u0000<index>\u0000" placeholder
  // (its digits alone look like a CSS number/property to later regexes), so
  // each one is guarded with (?<!\u0000) / (?!\u0000) around the match.
  const stash = (match, cls) => {
    tokens.push(`<span class="${cls}">${match}</span>`);
    return `\u0000${tokens.length - 1}\u0000`;
  };
  out = out.replace(/\/\*[\s\S]*?\*\//g, (m) => stash(m, 'tok-com'));
  out = out.replace(/(&quot;|"|')(?:(?!\1).)*\1/g, (m) => stash(m, 'tok-str'));
  // selectors: text before a { on its own
  out = out.replace(/(?<!\u0000)^([^{}\n]+)(?=\{)(?!\u0000)/gm, (m) => stash(m, 'tok-sel'));
  // properties: word directly before a colon
  out = out.replace(/(?<!\u0000)([\w-]+)(?=\s*:)(?!\u0000)/g, (m) => stash(m, 'tok-prop'));
  out = out.replace(/(?<!\u0000)\b(\d+(\.\d+)?(px|em|rem|%|vh|vw|deg|s|ms|fr)?)\b(?!\u0000)/g, (m) => stash(m, 'tok-num'));
  out = out.replace(/\u0000(\d+)\u0000/g, (_, i) => tokens[i]);
  return out;
}

function highlightHTML(src) {
  let out = escapeHtml(src);
  const tokens = [];
  const stash = (match, cls) => {
    tokens.push(`<span class="${cls}">${match}</span>`);
    return `\u0000${tokens.length - 1}\u0000`;
  };
  out = out.replace(/&lt;!--[\s\S]*?--&gt;/g, (m) => stash(m, 'tok-com'));
  // tags with attributes
  out = out.replace(/(&lt;\/?)([a-zA-Z0-9-]+)([^&]*?)(\/?&gt;)/g, (full, open, tagName, attrs, close) => {
    let attrHtml = attrs.replace(/([a-zA-Z-:]+)(=)(&quot;|"|')([^"']*)\3/g, (m2, an, eq, q, av) =>
      `<span class="tok-attr">${an}</span>${eq}<span class="tok-val">${q}${av}${q}</span>`
    );
    return `<span class="tok-tag">${open}${tagName}</span>${attrHtml}<span class="tok-tag">${close}</span>`;
  });
  out = out.replace(/\u0000(\d+)\u0000/g, (_, i) => tokens[i]);
  return out;
}

function highlight(lang, src) {
  if (lang === 'js') return highlightJS(src);
  if (lang === 'css') return highlightCSS(src);
  if (lang === 'html') return highlightHTML(src);
  return escapeHtml(src);
}


/* ================================ 3. RENDERER ============================ */

function renderBlock(block) {
  switch (block.type) {
    case 'text':
      return `<p class="block-text">${block.text}</p>`;

    case 'list': {
      const tag = block.ordered ? 'ol' : 'ul';
      const cls = block.ordered ? 'is-ordered' : 'is-bullet';
      const items = block.items.map((i) => `<li>${i}</li>`).join('');
      return `<${tag} class="block-list ${cls}">${items}</${tag}>`;
    }

    case 'columns': {
      const cards = block.cols.map((c) => `
        <div class="col-card">
          <h4>${c.title}</h4>
          <p>${c.text}</p>
        </div>`).join('');
      return `<div class="block-columns" style="--cols:${block.cols.length}">${cards}</div>`;
    }

    case 'callout':
      return `
        <div class="block-callout tone-${block.tone}">
          <span class="callout-icon">${block.tone === 'tip' ? '💡' : block.tone === 'warn' ? '⚠️' : 'ℹ️'}</span>
          <div><strong>${block.title}</strong>${block.text}</div>
        </div>`;

    case 'code':
      return `
        <div class="block-code">
          <div class="code-head">
            <span class="code-dot"></span><span class="code-dot"></span><span class="code-dot"></span>
            <span class="code-lang">${block.lang}</span>
          </div>
          <pre><code>${highlight(block.lang, block.code)}</code></pre>
        </div>`;

    default:
      return '';
  }
}

function renderSlide(slide, index, total) {
  const blocksHtml = slide.blocks.map(renderBlock).join('');
  return `
    <div class="slide-content">
      <div class="slide-eyebrow"><span class="dot"></span>Slide ${index + 1} of ${total}</div>
      <div class="slide-icon">${slide.icon}</div>
      <h2 class="slide-title">${slide.title}</h2>
      <p class="slide-subtitle">${slide.subtitle}</p>
      <div class="slide-body">${blocksHtml}</div>
    </div>`;
}


/* ================================= 4. APP ================================= */

const els = {
  html: document.documentElement,
  tabs: document.querySelectorAll('.tab-btn'),
  slideView: document.getElementById('slideView'),
  zoomWrap: document.getElementById('zoomWrap'),
  slideStage: document.getElementById('slideStage'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  stagePrev: document.getElementById('stagePrev'),
  stageNext: document.getElementById('stageNext'),
  slideCounter: document.getElementById('slideCounter'),
  zoomInBtn: document.getElementById('zoomInBtn'),
  zoomOutBtn: document.getElementById('zoomOutBtn'),
  zoomLevel: document.getElementById('zoomLevel'),
  fullscreenBtn: document.getElementById('fullscreenBtn'),
  thumbStrip: document.getElementById('thumbStrip'),
  presentation: document.getElementById('presentation'),
};

const state = {
  topic: 'html',
  index: { html: 0, css: 0, js: 0 }, // remembered per-topic slide position
  zoom: 1,
};

const ZOOM_MIN = 0.7;
const ZOOM_MAX = 1.5;
const ZOOM_STEP = 0.1;

function currentSlides() {
  return courses[state.topic];
}

function clampIndex(i, topic) {
  const total = courses[topic].length;
  return Math.max(0, Math.min(total - 1, i));
}

function goTo(i) {
  const slides = currentSlides();
  state.index[state.topic] = clampIndex(i, state.topic);
  renderCurrentSlide();
  updateThumbnails();
  updateControls();
}

function next() { goTo(state.index[state.topic] + 1); }
function prev() { goTo(state.index[state.topic] - 1); }

function renderCurrentSlide() {
  const slides = currentSlides();
  const idx = state.index[state.topic];
  els.slideView.innerHTML = renderSlide(slides[idx], idx, slides.length);
  // Force every scroll position back to the top-left. Without this, a
  // vertically-centered overflowing flex container (common when a slide's
  // content is taller than the viewport, e.g. on mobile) can leave the
  // browser scrolled to the middle of the slide instead of its start.
  els.slideView.scrollTop = 0;
  els.zoomWrap.scrollTop = 0;
  els.zoomWrap.scrollLeft = 0;
  const body = els.slideView.querySelector('.slide-body');
  if (body) body.scrollTop = 0;
}

function updateControls() {
  const slides = currentSlides();
  const idx = state.index[state.topic];
  els.slideCounter.textContent = `${idx + 1} / ${slides.length}`;
  const atStart = idx === 0;
  const atEnd = idx === slides.length - 1;
  els.prevBtn.disabled = atStart;
  els.stagePrev.disabled = atStart;
  els.nextBtn.disabled = atEnd;
  els.stageNext.disabled = atEnd;
  els.zoomLevel.textContent = `${Math.round(state.zoom * 100)}%`;
  els.zoomOutBtn.disabled = state.zoom <= ZOOM_MIN;
  els.zoomInBtn.disabled = state.zoom >= ZOOM_MAX;
}

function buildThumbnails() {
  const slides = currentSlides();
  els.thumbStrip.innerHTML = slides.map((s, i) => `
    <button class="thumb" data-index="${i}" role="tab" aria-label="Go to slide ${i + 1}: ${s.title}">
      <span class="thumb-preview"><span class="thumb-num">${i + 1}</span>${s.icon}</span>
      <span class="thumb-label">${s.title}</span>
    </button>
  `).join('');

  els.thumbStrip.querySelectorAll('.thumb').forEach((btn) => {
    btn.addEventListener('click', () => goTo(Number(btn.dataset.index)));
  });
  updateThumbnails();
}

function updateThumbnails() {
  const idx = state.index[state.topic];
  els.thumbStrip.querySelectorAll('.thumb').forEach((btn, i) => {
    const active = i === idx;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', String(active));
    if (active) {
      btn.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    }
  });
}

function setZoom(z) {
  state.zoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, Math.round(z * 100) / 100));
  els.slideView.style.setProperty('--zoom', state.zoom);
  updateControls();
}

function switchTopic(topic) {
  if (topic === state.topic) return;
  state.topic = topic;
  els.html.setAttribute('data-topic', topic);

  els.tabs.forEach((tab) => {
    const isActive = tab.dataset.topic === topic;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  buildThumbnails();
  renderCurrentSlide();
  updateControls();
}

/* ---- tab wiring ---- */
els.tabs.forEach((tab) => {
  tab.addEventListener('click', () => switchTopic(tab.dataset.topic));
});

/* ---- prev / next wiring ---- */
[els.prevBtn, els.stagePrev].forEach((b) => b.addEventListener('click', prev));
[els.nextBtn, els.stageNext].forEach((b) => b.addEventListener('click', next));

/* ---- zoom wiring ---- */
els.zoomInBtn.addEventListener('click', () => setZoom(state.zoom + ZOOM_STEP));
els.zoomOutBtn.addEventListener('click', () => setZoom(state.zoom - ZOOM_STEP));

/* ---- fullscreen wiring ---- */
function isFullscreen() {
  return !!(document.fullscreenElement || document.webkitFullscreenElement);
}
function toggleFullscreen() {
  if (!isFullscreen()) {
    const el = els.presentation;
    (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el);
  } else {
    (document.exitFullscreen || document.webkitExitFullscreen)?.call(document);
  }
}
els.fullscreenBtn.addEventListener('click', toggleFullscreen);
function onFullscreenChange() {
  const fs = isFullscreen();
  els.fullscreenBtn.classList.toggle('is-on', fs);
  document.body.classList.toggle('is-fullscreen', fs);
}
document.addEventListener('fullscreenchange', onFullscreenChange);
document.addEventListener('webkitfullscreenchange', onFullscreenChange);

/* ---- keyboard navigation ---- */
const NEXT_KEYS = new Set(['ArrowRight', 'ArrowDown', 'd', 'D', 's', 'S', ' ']);
const PREV_KEYS = new Set(['ArrowLeft', 'ArrowUp', 'a', 'A', 'w', 'W', 'Backspace']);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (isFullscreen()) toggleFullscreen();
    return;
  }
  if (NEXT_KEYS.has(e.key) || PREV_KEYS.has(e.key)) {
    e.preventDefault(); // stop page/arrow-key scrolling while navigating slides
    if (NEXT_KEYS.has(e.key)) next(); else prev();
  }
});

/* ---- touch swipe (mobile) ---- */
let touchStartX = null;
let touchStartY = null;
els.slideStage.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

els.slideStage.addEventListener('touchend', (e) => {
  if (touchStartX === null) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  const SWIPE_THRESHOLD = 45;
  if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) next(); else prev();
  }
  touchStartX = null;
  touchStartY = null;
}, { passive: true });

/* ---- init ---- */
function init() {
  els.html.setAttribute('data-topic', state.topic);
  setZoom(1);
  buildThumbnails();
  renderCurrentSlide();
  updateControls();
}

init();
