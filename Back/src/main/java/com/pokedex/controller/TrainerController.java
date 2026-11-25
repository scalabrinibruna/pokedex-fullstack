package com.pokedex.controller;

import com.pokedex.model.Trainer;
import com.pokedex.service.TrainerService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/trainers")
public class TrainerController {

    private final TrainerService service;

    public TrainerController(TrainerService service) {
        this.service = service;
    }

    @GetMapping
    public List<Trainer> listar() {
        return service.listar();
    }
}
