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
	
	public List<Reservering> vindAllePersonen() {
		List<Reservering> reserveringen =  repository.findAll();
		
		return reserveringen;
	}
	
	public Reservering maakPersoonAan(Reservering reservering) {
		return repository.save(reservering);
	}
	
}
