# [4-2]

# URL Params

---

## Review concepts

---

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Animated-gif-about-fashion-in-u-n-i-c-o-r-n-by-many-cute-animal-doodles-png-798_607.gif/788px-Animated-gif-about-fashion-in-u-n-i-c-o-r-n-by-many-cute-animal-doodles-png-798_607.gif" />

---

## Express

- What express _routing method_ have we used?

```js
// answer
```

---

- What are its parameters?

```js
// answer
```

---

- What is the minimum amount of code to set up an express server?

```js
// Example
```

---

`https://mysite.com/contact-info?name=Fred&age=32`

```js
// Review
app.get('/contact-info', (req, res) => {
  const name =   // ...
  const age =    // ...

  res.json({ status: 200 });
})
```

---

## Code Cleanup

---

Yesterday we did this:

```js
.get('/cat-message', (req, res) => {
  const message = { author: 'cat', text: 'meow' };
  const randomTime = Math.floor(Math.random() * 3000);
  res.status(200).json({ status: 200, message });
})
```

- That is an anonymous function.
- If it were any longer, it would make our code harder to read.

_Let's turn it into an expression._

---

```js
// declare the function above (near top of file)
const handleCatMessage = (req, res) => {
  const message = { author: "cat", text: "meow" };
  const randomTime = Math.floor(Math.random() * 3000);
  res.status(200).json({ status: 200, message });
};

// pass function to express method
app.get("/cat-message", handleCatMessage);
```

---

This works and helps to keep our `server.js` file more legible.

But what happens if I have many many endpoints to manage? That would mean lots of functions in the same file.

_There must be a better way._

---

At some point it will become necessary to move our function expressions to their _own_ file.

```js
// new file called handlers
const handleCatMessage = (req, res) => {
  const message = { author: "cat", text: "meow" };
  const randomTime = Math.floor(Math.random() * 3000);
  res.status(200).json({ status: 200, message });
};

module.exports = { handleCatMessage };
```

```js
// server.js file
const { handleCatMessage } = require("./handlers");

app.get("/cat-message", handleCatMessage);
```

---

This is a pattern that will come up more and more as we transition to a more component-based way of thinking about our code.
