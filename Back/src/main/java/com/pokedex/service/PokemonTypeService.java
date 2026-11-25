package com.pokedex.service;

import com.pokedex.model.PokemonType;
import com.pokedex.repository.PokemonTypeRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class PokemonTypeService {

    private final PokemonTypeRepository repository;

    public PokemonTypeService(PokemonTypeRepository repository) {
        this.repository = repository;
    }

    public List<PokemonType> listar() {
        return repository.findAll(Sort.by("id"));
    }
}
