# Minha Lista de Tarefas

Atividade prática de introdução ao React. Digite uma tarefa e clique em **Adicionar** ou pressione **Enter**. O campo é limpo após a inclusão e a lista volta ao estado inicial quando a página é recarregada.

## Como executar

Com o Node.js instalado, abra um terminal na pasta do projeto.

```bash
npm install
npm run dev
```

Abra o endereço exibido no terminal, normalmente http://localhost:5173. Para gerar a versão de produção, execute `npm run build`.

## React, hooks e useState

- **React** é uma biblioteca JavaScript para criar interfaces a partir de componentes. Nesta atividade, `App` é o componente que apresenta o formulário e a lista.
- **Hooks** são funções que dão acesso a recursos do React em componentes de função. Eles são chamados no topo do componente, fora de condições e laços.
- **`useState`** é o hook que declara um valor de estado e retorna uma função para atualizá-lo. Em `src/App.jsx`, `input` guarda o texto digitado e `tarefas` guarda a lista. Ao adicionar uma tarefa, `setTarefas` cria um novo array com os itens anteriores e o novo item. O React atualiza a interface e `map` transforma cada item em um elemento da lista.

## Referências

- [Início rápido do React](https://pt-br.react.dev/learn)
- [Documentação de useState](https://pt-br.react.dev/reference/react/useState)
- [Guia de React para iniciantes da Devpills](https://www.devpills.com.br/post/react-iniciante/)
