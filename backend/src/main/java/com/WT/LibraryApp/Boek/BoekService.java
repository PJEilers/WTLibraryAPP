package com.WT.LibraryApp.Boek;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoekService {
	@Autowired
	private IBoekRepository repository;
	
	/*public Optional<Boek> vindBoek(int id) {
		return repository.findById(id);
	}
	
	public List<Boek> vindAlleBoeken() {
	 	List<Boek> boeken = repository.findAll();
	 	
	 	return boeken;
	}*/
	
	public Boek maakBoekAan(Boek boek) {
		return repository.save(boek);
		
	}
}

