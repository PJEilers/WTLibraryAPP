package com.WT.LibraryApp.Boek;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoekService {
	
	@Autowired
	private IBoekRepository repository;
	
	public Optional<Boek> vindBoek(int id) {
		return repository.findById(id);
	}

	public Optional <Boek> vindBoek(String isbn) {
		return repository.findByIsbn(isbn);
	}
	
	public List<Boek> vindAlleBoeken() { 
    return repository.findAll();
	}
	
	public Boek maakBoekAan(Boek boek) {
		return repository.save(boek);
	}
}

