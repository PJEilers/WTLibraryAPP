package com.WT.LibraryApp.Persoon;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PersoonService {
    
    @Autowired
    private IPersoonRepository repository;
    
    @Autowired
	private PasswordEncoder bcryptEncoder;

    public Persoon maakPersoonAan(Persoon persoon) {
    	String wachtwoord = persoon.getWachtwoord();
    	persoon.setWachtwoord(bcryptEncoder.encode(wachtwoord));
    	
        return repository.save(persoon);
    }

    public List<Persoon> vindAllePersonen () {
        return repository.findAll();
    }

    public Optional<Persoon> vindPersoon(int id) {
        return repository.findById(id);
    }
    
    public int vindPersoonIdEmail(String email) {
        Optional<Persoon> persoon = repository.findByEmail(email);
        if (persoon.isPresent()) {
        	return persoon.get().getId();
        }
        return 0;
    }

    public Optional<Persoon> login (LoginForm loginform) {
        return repository.findByEmailAndWachtwoord(loginform.getEmail(), loginform.getWachtwoord());
    }

	public Optional<Persoon> vindPersoonEmail(String email) {
		return repository.findByEmail(email);
	}
}
