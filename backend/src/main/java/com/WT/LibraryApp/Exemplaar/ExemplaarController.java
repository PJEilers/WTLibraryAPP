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
	@RequestMapping(value = "/exemplaren" /* TODO */)
	public List<Exemplaar> vindExemplaar() {
		return service.vindAlleExemplaren();
	}

	// Optie voor toevoegen van een exemplaar
	@RequestMapping(method = RequestMethod.POST, value = "/boektoevoegen" /* TODO */)
	public Exemplaar maakExemplaarAan(@RequestBody Exemplaar exemplaar) {
		return service.maakExemplaarAan(exemplaar);
	}

	// Optie voor toevoegen van reservatie
	@RequestMapping(method = RequestMethod.POST, value = "/opslaanexemplaar/{hoeveelheid}" /* TODO */)
	public void opslaanExemplaar(@RequestBody Exemplaar exemplaar, @PathVariable int hoeveelheid) {

		// Een temporary object wordt gebruikt omdat Hibernate(SQL) eenzelfde kopie van
		// een exemplaar niet leuk vind.
		Exemplaar tmpexemplaar;
		for (int i = 0; i < hoeveelheid; i++) {
			tmpexemplaar = new Exemplaar();
			tmpexemplaar.setBoek_id(exemplaar.getBoek_id());
			tmpexemplaar.setReservering_id(exemplaar.getReservering_id());
			service.opslaanExemplaar(tmpexemplaar);
		}
	}

}
