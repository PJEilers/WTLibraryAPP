package com.WT.LibraryApp.DTOs;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.WT.LibraryApp.Boek.Boek;
import com.WT.LibraryApp.Persoon.Persoon;
import com.WT.LibraryApp.Reservering.IReserveringRepository;
import com.WT.LibraryApp.Reservering.Reservering;

@Service
public class MapService {

    @Autowired
    private IReserveringRepository reserveringRepository;

    public List<ReserveringPersoonBoekDTO> alleReserveringenMetPersoonBoek() {
        return ((List<Reservering>) reserveringRepository
                .findAll())
                .stream()
                .map(this::convertToReserveringPersoonBoekDTO)
				        .collect(Collectors.toList());
    }

    private ReserveringPersoonBoekDTO convertToReserveringPersoonBoekDTO(Reservering reservering) {
        ReserveringPersoonBoekDTO reserveringPersoonBoekDTO = new ReserveringPersoonBoekDTO();
        reserveringPersoonBoekDTO.setId(reservering.getId());
        reserveringPersoonBoekDTO.setDatum(reservering.getDatum());
        Persoon persoon = reservering.getPersoon();
        reserveringPersoonBoekDTO.setNaam(persoon.getNaam());
        Boek boek = reservering.getBoek();
        reserveringPersoonBoekDTO.setTitel(boek.getTitel());
        reserveringPersoonBoekDTO.setAuteur(boek.getAuteur());
        return reserveringPersoonBoekDTO;
    }
    
}