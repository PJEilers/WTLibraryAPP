package com.WT.LibraryApp.Reservering;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.WT.LibraryApp.Reservering.Reservering.ReserveringStatus;

@Service
public class ReserveringService {

	@Autowired
	private IReserveringRepository repository;

	public Optional<Reservering> vindReserveringMetId(int id) {
		return repository.findById(id);
	}

	public List<Reservering> vindAlleReserveringen() {
		return repository.findAll();
	}

	public Reservering maakReserveringAan(Reservering reservering) {
		return repository.save(reservering);
	}

	public Optional<Reservering> vindReserveringMetPersoonEnBoek(Reservering reservering) {
		return repository.findByPersoonAndBoekAndStatus(reservering.getPersoon(), reservering.getBoek(), reservering.getReserveringStatus());
	}

	public void updateStatus(int id, ReserveringStatus status) {
		repository.getById(id).setReserveringStatus(status);
		Reservering e = repository.getById(id);
		repository.save(e);
	}

	// Haal alle reservering op die geen status hebben, i.e. nog open staan.
	public List<ReserveringPersoonBoekDTO> alleReserveringenPersoonBoek() {
		List<Reservering> reserveringen = repository.findByStatus(null);
		List<ReserveringPersoonBoekDTO> reserveringenPersoonBoekDTO = new ArrayList<>();
		for (Reservering reservering : reserveringen) {
			ReserveringPersoonBoekDTO reserveringPersoonBoekDTO = new ReserveringPersoonBoekDTO(reservering,
					reservering.getPersoon(), reservering.getBoek());
			reserveringenPersoonBoekDTO.add(reserveringPersoonBoekDTO);
		}
		return reserveringenPersoonBoekDTO;
	}

}
