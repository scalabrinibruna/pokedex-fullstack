package com.pokedex.service;

import com.pokedex.exception.PokemonNotFoundException;
import com.pokedex.model.Pokemon;
import com.pokedex.repository.PokemonRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class PokemonService {

    private final PokemonRepository repository;

    public PokemonService(PokemonRepository repository) {
        this.repository = repository;
    }

    public List<Pokemon> listar() {
        return repository.findAll(Sort.by("id"));
    }

    public Pokemon buscar(int id) {
        return repository.findById(id).orElseThrow(() -> new PokemonNotFoundException(id));
    }

    public Pokemon criar(Pokemon pokemon) {
        validar(pokemon);
        int proximoId = repository.findTopByOrderByIdDesc().map(p -> p.id() + 1).orElse(1);
        return repository.save(pokemon.withId(proximoId));
    }

    public Pokemon atualizar(int id, Pokemon pokemon) {
        validar(pokemon);
        buscar(id);
        return repository.save(pokemon.withId(id));
    }

    public void remover(int id) {
        buscar(id);
        repository.deleteById(id);
    }

    private void validar(Pokemon pokemon) {
        if (pokemon.name() == null || pokemon.name().isBlank()) {
            throw new IllegalArgumentException("O nome é obrigatório");
        }
        if (pokemon.stats() == null) {
            throw new IllegalArgumentException("Os atributos são obrigatórios");
        }
    }
}
