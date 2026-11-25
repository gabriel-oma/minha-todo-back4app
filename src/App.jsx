import { useState } from 'react'

export default function App() {
  const [tarefas, setTarefas] = useState([])
  const [input, setInput] = useState('')

  function adicionarTarefa(evento) {
    evento.preventDefault()
    const tarefa = input.trim()

    if (!tarefa) return

    setTarefas(tarefasAnteriores => [...tarefasAnteriores, tarefa])
    setInput('')
  }

  return (
    <main>
      <h1>Minha Lista de Tarefas</h1>
      <form onSubmit={adicionarTarefa}>
        <label htmlFor="nova-tarefa">Nova tarefa</label>
        <div className="campo">
          <input
            id="nova-tarefa"
            value={input}
            onChange={evento => setInput(evento.target.value)}
            placeholder="O que você precisa fazer?"
            required
          />
          <button type="submit">Adicionar</button>
        </div>
      </form>
      <div aria-live="polite">
        {tarefas.length === 0 ? (
          <p>Nenhuma tarefa adicionada.</p>
        ) : (
          <ul>
            {tarefas.map((tarefa, index) => (
              <li key={index}>{tarefa}</li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
