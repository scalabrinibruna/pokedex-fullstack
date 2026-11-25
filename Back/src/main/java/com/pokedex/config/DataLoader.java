package com.pokedex.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pokedex.model.Pokemon;
import com.pokedex.model.PokemonType;
import com.pokedex.model.Trainer;
import com.pokedex.repository.PokemonRepository;
import com.pokedex.repository.PokemonTypeRepository;
import com.pokedex.repository.TrainerRepository;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

// Popula o banco com os dados do Script_Pokedex.sql (já convertidos para JSON) quando as coleções estão vazias.
@Component
public class DataLoader implements CommandLineRunner {

    private final PokemonRepository pokemons;
    private final TrainerRepository trainers;
    private final PokemonTypeRepository types;
    private final ObjectMapper mapper;

    public DataLoader(PokemonRepository pokemons, TrainerRepository trainers,
                      PokemonTypeRepository types, ObjectMapper mapper) {
        this.pokemons = pokemons;
        this.trainers = trainers;
        this.types = types;
        this.mapper = mapper;
    }

    @Override
    public void run(String... args) throws IOException {
        carregar(types, "/seed/types.json", new TypeReference<List<PokemonType>>() {});
        carregar(pokemons, "/seed/pokemons.json", new TypeReference<List<Pokemon>>() {});
        carregar(trainers, "/seed/trainers.json", new TypeReference<List<Trainer>>() {});
    }

    private <T> void carregar(MongoRepository<T, Integer> repository, String arquivo,
                              TypeReference<List<T>> tipo) throws IOException {
        if (repository.count() > 0) return;
        try (InputStream in = getClass().getResourceAsStream(arquivo)) {
            repository.saveAll(mapper.readValue(in, tipo));
        }
    }
}
