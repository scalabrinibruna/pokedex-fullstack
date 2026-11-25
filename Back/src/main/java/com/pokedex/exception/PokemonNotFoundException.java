package com.pokedex.exception;

public class PokemonNotFoundException extends RuntimeException {
    public PokemonNotFoundException(int id) {
        super("Pokémon " + id + " não encontrado");
    }
}
