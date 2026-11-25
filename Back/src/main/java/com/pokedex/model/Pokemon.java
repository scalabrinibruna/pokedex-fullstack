package com.pokedex.model;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("pokemons")
public record Pokemon(
        @Id Integer id,
        String name,
        Stats stats,
        List<TypeRef> types,
        String image) {

    public Pokemon {
        if (types == null) types = List.of();
    }

    public Pokemon withId(Integer novoId) {
        return new Pokemon(novoId, name, stats, types, image);
    }
}