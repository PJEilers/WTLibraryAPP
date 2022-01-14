package com.WT.LibraryApp.Persoon;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(maxAge = 3600)

public class PersoonController {

    @Autowired
    private PersoonService service;

    @ResponseStatus(value=HttpStatus.UNAUTHORIZED, reason = "Email of wachtwoord is incorrect")
    public class incorrectException extends RuntimeException {

    }

    @RequestMapping(value = "/personen")
	public List <Persoon> vindAllePersonen() {
		return service.vindAllePersonen();
	}

    @RequestMapping(method = RequestMethod.POST, value = "/maakpersoonaan")
    public Persoon maakPersoonAan(@RequestBody Persoon persoon) {
        return service.maakPersoonAan(persoon);
    }
    
    // Meerdere personen aanmaken voor testing.
    @RequestMapping(method = RequestMethod.POST, value = "/maakpersonenaan")
    public List<Persoon> maakPersonenAan(@RequestBody List<Persoon> personen) {
    	List<Persoon> gebruikers = new ArrayList<>();
    	for (Persoon persoon: personen) {
    		gebruikers.add(service.maakPersoonAan(persoon));
    	}
    	return gebruikers;
    }

    @RequestMapping(value = "/persoon/{id}") 
    public Optional<Persoon> vindPersoon(@PathVariable int id) {
        return service.vindPersoon(id);
    }
    
    @RequestMapping(value = "/zoekpersoonvianaam/{naam}") 
    public List<Persoon> zoekPersoonViaNaam(@PathVariable String naam) {
        return service.zoekPersoonViaNaam(naam);
    }

    @RequestMapping(value = "/login") 
    public Persoon login (@RequestBody LoginForm loginform) {
        Optional<Persoon> loginStatus = service.login(loginform);
        if (loginStatus.isPresent()) return loginStatus.get();
        throw new incorrectException();
    }
    

    


}