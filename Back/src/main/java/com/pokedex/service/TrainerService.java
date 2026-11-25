package com.pokedex.service;

import com.pokedex.model.Trainer;
import com.pokedex.repository.TrainerRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class TrainerService {

    private final TrainerRepository repository;

    public TrainerService(TrainerRepository repository) {
        this.repository = repository;
    }

    public List<Trainer> listar() {
        return repository.findAll(Sort.by("id"));
    }
}
