package com.WT.LibraryApp.Persoon;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(maxAge = 3600)

public class PersoonController {

    @Autowired
    private PersoonService service;

    @RequestMapping(value = "/personen")
	public List <Persoon> vindAllePersonen() {
		return service.vindAllePersonen();
	}

    @RequestMapping(method = RequestMethod.POST, value = "/maakpersoonaan")
    public Persoon maakPersoonAan(@RequestBody Persoon persoon) {
        return service.maakPersoonAan(persoon);
    } 

    @RequestMapping(value = "persoon/{id}") 
    public Optional<Persoon> vindPersoon(@PathVariable int id) {
        return service.vindPersoon(id);
    }

    


}