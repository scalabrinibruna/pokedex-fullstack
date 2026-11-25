package com.pokedex.controller;

import com.pokedex.model.Pokemon;
import com.pokedex.service.PokemonService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pokemons")
public class PokemonController {

    private final PokemonService service;

    public PokemonController(PokemonService service) {
        this.service = service;
    }

    @GetMapping
    public List<Pokemon> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Pokemon buscar(@PathVariable int id) {
        return service.buscar(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Pokemon criar(@RequestBody Pokemon pokemon) {
        return service.criar(pokemon);
    }

    @PutMapping("/{id}")
    public Pokemon atualizar(@PathVariable int id, @RequestBody Pokemon pokemon) {
        return service.atualizar(id, pokemon);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable int id) {
        service.remover(id);
    }
}
