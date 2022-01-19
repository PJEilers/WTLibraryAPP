package com.WT.LibraryApp.Persoon;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    public Map<String, String> vindPersoonNaamEmail(int id) {
        Optional<Persoon> optionalPersoon = repository.findById(id);
        Map<String, String> naamEmailMap = new HashMap<>();
        if (optionalPersoon.isPresent()) {
        	Persoon persoon = optionalPersoon.get();
        	naamEmailMap.put("naam", persoon.getNaam());
        	naamEmailMap.put("email", persoon.getEmail());
        	return naamEmailMap;
        }
        naamEmailMap.put("naam", null);
    	naamEmailMap.put("email", null);
    	return naamEmailMap;
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
