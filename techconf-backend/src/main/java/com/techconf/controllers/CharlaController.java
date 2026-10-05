package com.techconf.controllers;

import com.techconf.exceptions.ResourceNotFoundException;
import com.techconf.models.Asistente;
import com.techconf.models.Charla;
import com.techconf.repositories.AsistenteRepository;
import com.techconf.repositories.CharlaRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/charlas")
@CrossOrigin(origins = "http://localhost:4200")
public class CharlaController {

    private final CharlaRepository charlaRepository;
    private final AsistenteRepository asistenteRepository;

    public CharlaController(CharlaRepository charlaRepository, AsistenteRepository asistenteRepository) {
        this.charlaRepository = charlaRepository;
        this.asistenteRepository = asistenteRepository;
    }

    @GetMapping
    public List<Charla> obtenerTodas() {
        return charlaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Charla obtenerPorId(@PathVariable Long id) {
        return buscarCharla(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Charla registrarCharla(@Valid @RequestBody Charla nuevaCharla) {
        if (nuevaCharla.getFechaFin().isBefore(nuevaCharla.getFechaInicio())) {
            throw new IllegalArgumentException("La fecha de fin no puede ser anterior a la de inicio");
        }

        List<String> etiquetas = nuevaCharla.getEtiquetas().stream()
                .map(String::trim)
                .filter(etiqueta -> !etiqueta.isEmpty())
                .collect(Collectors.toList());
        if (etiquetas.isEmpty()) {
            throw new IllegalArgumentException("Debe indicar al menos una etiqueta");
        }

        nuevaCharla.setId(null);
        nuevaCharla.setEtiquetas(etiquetas);
        nuevaCharla.setAsistentes(new ArrayList<>());
        return charlaRepository.save(nuevaCharla);
    }

    @PostMapping("/{id}/asistentes")
    @ResponseStatus(HttpStatus.CREATED)
    public Asistente inscribirAsistente(@PathVariable Long id, @Valid @RequestBody Asistente asistente) {
        Charla charla = buscarCharla(id);
        asistente.setId(null);
        asistente.setCharla(charla);
        return asistenteRepository.save(asistente);
    }

    private Charla buscarCharla(Long id) {
        return charlaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe una charla con id: " + id));
    }
}
