package com.pokedex.controller;

import com.pokedex.model.PokemonType;
import com.pokedex.service.PokemonTypeService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/types")
public class PokemonTypeController {

    private final PokemonTypeService service;

    public PokemonTypeController(PokemonTypeService service) {
        this.service = service;
    }

    @GetMapping
    public List<PokemonType> listar() {
        return service.listar();
    }
}
