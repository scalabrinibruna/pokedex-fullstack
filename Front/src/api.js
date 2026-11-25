const BASE = import.meta.env.VITE_API_URL ?? "/api";

async function request(path, options = {}) {
  const response = await fetch(BASE + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    let message = `Erro ${response.status}`;
    try {
      message = (await response.json()).message ?? message;
    } catch {
      // resposta sem corpo
    }
    throw new Error(message);
  }

  return response.status === 204 ? null : response.json();
}

export const getPokemons = () => request("/pokemons");
export const getTrainers = () => request("/trainers");
export const getTypes = () => request("/types");

export const createPokemon = (pokemon) =>
  request("/pokemons", { method: "POST", body: JSON.stringify(pokemon) });

export const updatePokemon = (id, pokemon) =>
  request(`/pokemons/${id}`, { method: "PUT", body: JSON.stringify(pokemon) });

export const deletePokemon = (id) => request(`/pokemons/${id}`, { method: "DELETE" });

export const getPokemon = (id) => request(`/pokemons/${id}`);
