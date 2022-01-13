package com.WT.LibraryApp.Uitlening;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UitleningService {

	@Autowired
	private IUitleningRepository repository;
	
	public Optional<Uitlening> vindEentje(int id) {
		return repository.findById(id);
	}
	
	public List<Uitlening> vindAlleUitleningen() {
		List<Uitlening> uitleningen =  repository.findAll();
		return uitleningen;
	}
	
	public Uitlening maakUitleningAan(Uitlening uitlening) {
		return repository.save(uitlening);
	}

	public Optional<Uitlening> vindExemplaar(int exemplaarid) {
		return repository.findByExemplaarId(exemplaarid);
	}
	
	
	
}
