import { useEffect, useState } from 'react'
import { apagarTarefa, listarTarefas, salvarTarefa } from './back4app.js'

export default function App() {
  const [tarefas, setTarefas] = useState([])
  const [input, setInput] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [listaCarregada, setListaCarregada] = useState(false)
  const [tentativa, setTentativa] = useState(0)
  const [ocupado, setOcupado] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    const controlador = new AbortController()
    listarTarefas(controlador.signal)
      .then(dados => {
        if (controlador.signal.aborted) return
        setTarefas(dados)
        setListaCarregada(true)
      })
      .catch(falha => {
        if (!controlador.signal.aborted) setErro(falha.message)
      })
      .finally(() => {
        if (!controlador.signal.aborted) setCarregando(false)
      })

    return () => controlador.abort()
  }, [tentativa])

  function tentarNovamente() {
    setErro('')
    setCarregando(true)
    setTentativa(valor => valor + 1)
  }

  async function adicionarTarefa(evento) {
    evento.preventDefault()
    const titulo = input.trim()
    if (!titulo || !listaCarregada || ocupado) return

    setOcupado(true)
    setErro('')
    try {
      const tarefa = await salvarTarefa(titulo)
      setTarefas(anteriores => [...anteriores, tarefa])
      setInput('')
    } catch (falha) {
      setErro(`Não foi possível adicionar a tarefa. ${falha.message}`)
    } finally {
      setOcupado(false)
    }
  }

  async function excluirTarefa(objectId) {
    setOcupado(true)
    setErro('')
    try {
      await apagarTarefa(objectId)
      setTarefas(anteriores => anteriores.filter(tarefa => tarefa.objectId !== objectId))
    } catch (falha) {
      setErro(`Não foi possível excluir a tarefa. ${falha.message}`)
    } finally {
      setOcupado(false)
    }
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
            disabled={!listaCarregada || ocupado}
            required
          />
          <button disabled={!listaCarregada || ocupado || !input.trim()}>
            Adicionar
          </button>
        </div>
      </form>
      {erro && <p role="alert">{erro}</p>}
      {!listaCarregada && !carregando && (
        <button className="tentar" onClick={tentarNovamente}>Tentar novamente</button>
      )}
      <div aria-live="polite">
        {carregando && <p>Carregando tarefas…</p>}
        {listaCarregada && tarefas.length === 0 && <p>Nenhuma tarefa adicionada.</p>}
        {tarefas.length > 0 && (
          <ul>
            {tarefas.map(tarefa => (
              <li key={tarefa.objectId}>
                <div className="tarefa">
                  <span>{tarefa.titulo}</span>
                  <button
                    type="button"
                    className="excluir"
                    disabled={ocupado}
                    onClick={() => excluirTarefa(tarefa.objectId)}
                    aria-label={`Excluir ${tarefa.titulo}`}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
