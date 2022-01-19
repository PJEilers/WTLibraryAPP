package com.WT.LibraryApp.Persoon;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersoonService {
    
    @Autowired
    private IPersoonRepository repository;

    public Persoon maakPersoonAan(Persoon persoon) {
        return repository.save(persoon);
    }

    public List<Persoon> vindAllePersonen () {
        return repository.findAll();
    }

    public Optional<Persoon> vindPersoon(int id) {
        return repository.findById(id);
    }

    public Optional<Persoon> login (LoginForm loginform) {
        return repository.findByEmailAndWachtwoord(loginform.getEmail(), loginform.getWachtwoord());
    }

	public List<Persoon> zoekPersoonViaNaam(String naam) {
		return repository.findAllByNaam(naam);
	}

	public String vindPersoonNaam(int id) {
		Optional<Persoon> optionalPersoon = repository.findById(id);
		if(optionalPersoon.isPresent()) {
			Persoon persoon = optionalPersoon.get();
			return persoon.getNaam();
		}
		return "-";
	}

}
