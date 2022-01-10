package com.WT.LibraryApp.Exemplaar;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(maxAge = 3600)
public class ExemplaarController {

	@Autowired
	private ExemplaarService service;
	
	// Optie voor vragen naar alle exemplaren
	@RequestMapping(value = "/exemplaren" /*TODO*/)
	public List<Exemplaar> vindExemplaar() {
		return service.vindAlleExemplaren();
	}
	
	// Optie voor toevoegen van een exemplaar
	@RequestMapping(method = RequestMethod.POST, value = "/boektoevoegen" /*TODO*/)
	public Exemplaar maakExemplaarAan(@RequestBody Exemplaar exemplaar) {
		return service.maakExemplaarAan(exemplaar);		
	}
	
	// Optie voor toevoegen van reservatie
	@RequestMapping(method = RequestMethod.POST, value = "/reservatie/{hoeveelheid}" /*TODO*/)
	public void reserveerExemplaar(@RequestBody Exemplaar exemplaar, @PathVariable int hoeveelheid) {
		/*List<Exemplaar> exemplaarlist = new ArrayList<Exemplaar>();
		for (int i = 0; i < 3; i++) {
			exemplaarlist.add(exemplaar);
		}
		Iterator<Exemplaar> iterator = exemplaarlist.iterator();*/
		service.reserveerExemplaar(exemplaar);
	}
	
}
