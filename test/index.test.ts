import * as Handlebars from 'handlebars';
import { register } from '../src';

beforeAll(() => register());

test('jp-get', () => {
  const result = Handlebars.compile(
    // @snippet:start jp-get-example
    `
    <h1>Books</h1>
    <ul>
      {{#each (jp-get "$.store.book[*]")}}
          <li>
            <div class="title">{{title}}</div>
            <div class="author">{{author}}</div>
          </li>
      {{/each}}
    </ul>
    `
    // @snippet:end
  )(data);

  expect(result).toMatchInlineSnapshot(
    // @snippet:start jp-get-example-result
    `
    "
        <h1>Books</h1>
        <ul>
              <li>
                <div class=\\"title\\">Sayings of the Century</div>
                <div class=\\"author\\">Nigel Rees</div>
              </li>
              <li>
                <div class=\\"title\\">Sword of Honour</div>
                <div class=\\"author\\">Evelyn Waugh</div>
              </li>
              <li>
                <div class=\\"title\\">Moby Dick</div>
                <div class=\\"author\\">Herman Melville</div>
              </li>
              <li>
                <div class=\\"title\\">The Lord of the Rings</div>
                <div class=\\"author\\">J. R. R. Tolkien</div>
              </li>
        </ul>
        "
  `
    // @snippet:end
  );
});

test('jp-get-in', () => {
  const result = Handlebars.compile(
    // @snippet:start jp-get-in-example
    `
        <h1>Books</h1>
        <ul>
          {{#each (jp-get-in "book[*]" store)}}
              <li>
                <div class="title">{{title}}</div>
                <div class="author">{{author}}</div>
              </li>
          {{/each}}
        </ul>
    `
    // @snippet:end
  )(data);

  expect(result).toMatchInlineSnapshot(
    // @snippet:start jp-get-in-example-result
    `
    "
            <h1>Books</h1>
            <ul>
                  <li>
                    <div class=\\"title\\">Sayings of the Century</div>
                    <div class=\\"author\\">Nigel Rees</div>
                  </li>
                  <li>
                    <div class=\\"title\\">Sword of Honour</div>
                    <div class=\\"author\\">Evelyn Waugh</div>
                  </li>
                  <li>
                    <div class=\\"title\\">Moby Dick</div>
                    <div class=\\"author\\">Herman Melville</div>
                  </li>
                  <li>
                    <div class=\\"title\\">The Lord of the Rings</div>
                    <div class=\\"author\\">J. R. R. Tolkien</div>
                  </li>
            </ul>
        "
  `
    // @snippet:end
  );
});

test('jp-descend', () => {
  const result = Handlebars.compile(
    // @snippet:start jp-descend-example

    `
        <h1>Authors</h1>
        <ul>
          {{#jp-descend "$.store.book[*].author"}}
              {{#each .}}
                  <li>{{.}}</li>
              {{/each}}
          {{/jp-descend}}
        </ul>
    `
    // @snippet:end
  )(data);

  expect(result).toMatchInlineSnapshot(
    // @snippet:start jp-descend-example-result

    `
    "
            <h1>Authors</h1>
            <ul>
                      <li>Nigel Rees</li>
                      <li>Evelyn Waugh</li>
                      <li>Herman Melville</li>
                      <li>J. R. R. Tolkien</li>
            </ul>
        "
  `
  // @snippet:end
  );
});

test('jp-descend-in', () => {
  const result = Handlebars.compile(
    // @snippet:start jp-descend-in-example

    `
        <h1>Authors</h1>
        <ul>
          {{#jp-descend-in "book[*].author" store}}
              {{#each .}}
                  <li>{{.}}</li>
              {{/each}}
          {{/jp-descend-in}}
        </ul>
    `
    // @snippet:end
  )(data);

  expect(result).toMatchInlineSnapshot(
    // @snippet:start jp-descend-in-example-result

    `
    "
            <h1>Authors</h1>
            <ul>
                      <li>Nigel Rees</li>
                      <li>Evelyn Waugh</li>
                      <li>Herman Melville</li>
                      <li>J. R. R. Tolkien</li>
            </ul>
        "
  `
    // @snippet:end
  );
});

// @snippet:start example-data
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
// @snippet:end
