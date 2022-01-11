package com.WT.LibraryApp.Exemplaar;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.WT.LibraryApp.Boek.Boek;
import com.WT.LibraryApp.Boek.BoekService;
import com.WT.LibraryApp.Reservering.Reservering;
import com.WT.LibraryApp.Reservering.ReserveringService;

@RestController
@CrossOrigin(maxAge = 3600)
public class ExemplaarController {

	@Autowired
	private ExemplaarService service;

	@Autowired
	private BoekService serviceBoek;
	
	@Autowired
	private ReserveringService serviceReservering;
	
	// Optie voor vragen naar alle exemplaren
	@RequestMapping(value = "/exemplaren" /* TODO */)
	public List<Exemplaar> vindExemplaren() {
		return service.vindAlleExemplaren();
	}
	
	// Optie voor vragen naar boek van exemplaar
	@RequestMapping(value = "/exemplaarboek/{boekid}" /* TODO */)
	public Optional<Boek> vindExemplaarBoek(@PathVariable int boekid) {
		return serviceBoek.vindBoek(boekid);		
	}
	
	// Optie voor vragen naar reservering van exemplaar
	@RequestMapping(value = "/exemplaarreservering/{reserveringid}" /* TODO */)
	public Optional<Reservering> vindExemplaarReservering(@PathVariable int reserveringid) {
		return serviceReservering.vindEentje(reserveringid);		
	}
	
	// Optie voor vragen naar boek en reserving van exemplaar
	@RequestMapping(value = "/exemplaartotaal/{boekid}/{reserveringid}" /* TODO */)
	public Map<String, Object> vindExemplaarTotaal(@PathVariable("reserveringid") int reserveringid, @PathVariable("boekid") int boekid) {
		Map<String, Object> map = new HashMap<>();
		map.put("Reservering", serviceReservering.vindEentje(reserveringid)) ;
		map.put("Boek", serviceBoek.vindBoek(boekid));
		return map;
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
