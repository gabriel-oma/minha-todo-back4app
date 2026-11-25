# Minha Lista de Tarefas

Lista em React e Vite que busca, adiciona e exclui tarefas no Back4App. As tarefas são compartilhadas por quem acessa o site e reaparecem ao recarregar a página.

## Como rodar

1. Crie um app exclusivo para a atividade no Back4App. No Database Browser, crie a classe `Tarefa` com a coluna `titulo` do tipo String. Habilite as operações Find, Create e Delete para o acesso público da demonstração.
2. Copie `.env.example` para `.env` e preencha `VITE_APP_ID` e `VITE_REST_KEY` com o Application ID e a REST API Key do app.
3. Com Node.js instalado, rode `npm install` e `npm run dev`. Abra o endereço mostrado no terminal. Reinicie o servidor após editar o `.env`.

## Publicação

Site na Vercel: https://minha-todo-back4app.vercel.app


Variáveis `VITE_*` são incluídas no JavaScript do navegador. Use apenas as chaves do app de demonstração e mantenha a Master Key fora do frontend.
