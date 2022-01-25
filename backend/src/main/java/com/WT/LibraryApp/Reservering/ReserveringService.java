package com.WT.LibraryApp.Reservering;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReserveringService {

	@Autowired
	private IReserveringRepository repository;
	
	public Optional<Reservering> vindEentje(int id) {
		return repository.findById(id);
	}
	
	public List<Reservering> vindAlleReserveringen() {
		List<Reservering> reserveringen =  repository.findAll();
		return reserveringen;
	}
	
	public Reservering maakReserveringAan(Reservering reservering) {
		return repository.save(reservering);
	}

	public Optional<Reservering> vindReserveringMetPersoonEnBoekId (Reservering reservering) {
		return repository.findByPersoonAndBoek(reservering.getPersoon(), reservering.getBoek());
	} 
	
}
