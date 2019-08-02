# hbs-jsonpath-helper

A simple handlebars helper that enables you to use jsonpath (to access and traverse nested data) within your templates

## Resources:

- Baeldung's [Introduction to jsonpath](https://www.baeldung.com/guide-to-jayway-jsonpath)
- Online [jsonpath evaluator](https://jsonpath.com/)
- [jsonpath-plus](https://www.npmjs.com/package/jsonpath-plus) npm package (which the helpers defined here delegate to)

## Features

For the following data source

```
const data = {
  store: {
    book: [
      {
        category: 'reference',
        author: 'Nigel Rees',
        title: 'Sayings of the Century',
        price: 8.95,
      },
      {
        category: 'fiction',
        author: 'Evelyn Waugh',
        title: 'Sword of Honour',
        price: 12.99,
      },
      {
        category: 'fiction',
        author: 'Herman Melville',
        title: 'Moby Dick',
        isbn: '0-553-21311-3',
        price: 8.99,
      },
      {
        category: 'fiction',
        author: 'J. R. R. Tolkien',
        title: 'The Lord of the Rings',
        isbn: '0-395-19395-8',
        price: 22.99,
      },
    ],
    bicycle: {
      color: 'red',
      price: 19.95,
    },
  },
};

```


### jp-get

Retrieve a value from current context using jsonpath

*Template:*

```
<h1>Books</h1>
<ul>
  {{#each (jp-get "$.store.book[*]")}}
      <li>
        <div class="title">{{title}}</div>
        <div class="author">{{author}}</div>
      </li>
  {{/each}}
</ul>
```

*Result:*

```
<h1>Books</h1>
<ul>
      <li>
        <div class="title">Sayings of the Century</div>
        <div class="author">Nigel Rees</div>
      </li>
      <li>
        <div class="title">Sword of Honour</div>
        <div class="author">Evelyn Waugh</div>
      </li>
      <li>
        <div class="title">Moby Dick</div>
        <div class="author">Herman Melville</div>
      </li>
      <li>
        <div class="title">The Lord of the Rings</div>
        <div class="author">J. R. R. Tolkien</div>
      </li>
</ul>
```


### jp-get-in

Retrieve a value from specified target using jsonpath

*Template:*

```
<h1>Books</h1>
<ul>
  {{#each (jp-get-in "book[*]" store)}}
      <li>
        <div class="title">{{title}}</div>
        <div class="author">{{author}}</div>
      </li>
  {{/each}}
</ul>
```

*Result:*

```
<h1>Books</h1>
<ul>
      <li>
        <div class="title">Sayings of the Century</div>
        <div class="author">Nigel Rees</div>
      </li>
      <li>
        <div class="title">Sword of Honour</div>
        <div class="author">Evelyn Waugh</div>
      </li>
      <li>
        <div class="title">Moby Dick</div>
        <div class="author">Herman Melville</div>
      </li>
      <li>
        <div class="title">The Lord of the Rings</div>
        <div class="author">J. R. R. Tolkien</div>
      </li>
</ul>
```


### jp-descend

Use the value derived from current context using jsonpath as the context
for embedded block

*Template:*

```
<h1>Authors</h1>
<ul>
  {{#jp-descend "$.store.book[*].author"}}
      {{#each .}}
          <li>{{.}}</li>
      {{/each}}
  {{/jp-descend}}
</ul>
```

*Result:*

```
<h1>Authors</h1>
<ul>
          <li>Nigel Rees</li>
          <li>Evelyn Waugh</li>
          <li>Herman Melville</li>
          <li>J. R. R. Tolkien</li>
</ul>
```


### jp-descend-in

Use the value derived from specified target using jsonpath as the context
for embedded block

*Template:*

```
<h1>Authors</h1>
<ul>
  {{#jp-descend-in "book[*].author" store}}
      {{#each .}}
          <li>{{.}}</li>
      {{/each}}
  {{/jp-descend-in}}
</ul>
```

*Result:*

```
<h1>Authors</h1>
<ul>
          <li>Nigel Rees</li>
          <li>Evelyn Waugh</li>
          <li>Herman Melville</li>
          <li>J. R. R. Tolkien</li>
</ul>
```


## License

MIT
