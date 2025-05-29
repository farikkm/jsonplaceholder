export function createTodo(title, body) {
  const todoHtmlLayout = `
  <div class="post">
  <h3>${title}</h3>
  <p>
    ${body}
  </p>
  </div>
  `;

  return todoHtmlLayout;
}