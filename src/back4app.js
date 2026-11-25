const URL = 'https://parseapi.back4app.com/classes/Tarefa'
const appId = import.meta.env.VITE_APP_ID
const restKey = import.meta.env.VITE_REST_KEY

async function requisitar(caminho, opcoes = {}) {
  if (!appId || !restKey) {
    throw new Error('Configure VITE_APP_ID e VITE_REST_KEY para conectar ao Back4App.')
  }

  const resposta = await fetch(URL + caminho, {
    ...opcoes,
    headers: {
      'X-Parse-Application-Id': appId,
      'X-Parse-REST-API-Key': restKey,
      'Content-Type': 'application/json',
    },
  })

  if (!resposta.ok) {
    const dados = await resposta.json().catch(() => null)
    throw new Error(dados?.error || `Back4App retornou HTTP ${resposta.status}.`)
  }

  return resposta.status === 204 ? null : resposta.json()
}

export async function listarTarefas(signal) {
  const tarefas = []
  const limite = 100

  while (true) {
    const { results } = await requisitar(
      `?order=createdAt,objectId&limit=${limite}&skip=${tarefas.length}`,
      { signal },
    )
    tarefas.push(...results)

    if (results.length < limite) return tarefas
  }
}

export async function salvarTarefa(titulo) {
  const dados = await requisitar('', {
    method: 'POST',
    body: JSON.stringify({ titulo }),
  })

  return { objectId: dados.objectId, titulo }
}

export function apagarTarefa(objectId) {
  return requisitar(`/${encodeURIComponent(objectId)}`, { method: 'DELETE' })
}
