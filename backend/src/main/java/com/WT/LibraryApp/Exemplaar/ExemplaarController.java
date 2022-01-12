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

	// Optie voor vragen naar alle exemplaren van een bepaald boek
	@RequestMapping(value = "/boekexemplaren/{boekid}" /* TODO */) 
	public Map<String, Object> vindBoekExemplaren(@PathVariable int boekid) {
		
		Map<String, Object> mapexemplaren = new HashMap<>();
		mapexemplaren.put("Exemplaren", service.vindBoekExemplaren(boekid));
		// Kan ook gewoon in frontend worden gedaan
		mapexemplaren.put("Hoeveelheid", (Integer) service.countByBoekId(boekid));
		// Placeholder voor status uitlenen
		mapexemplaren.put("Status", (Boolean) true);
		return mapexemplaren;
	}

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
	public Map<String, Object> vindExemplaarTotaal(@PathVariable("reserveringid") int reserveringid,
			@PathVariable("boekid") int boekid) {
		Map<String, Object> map = new HashMap<>();
		map.put("Reservering", serviceReservering.vindEentje(reserveringid));
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
	public int opslaanExemplaar(@RequestBody Exemplaar exemplaar, @PathVariable int hoeveelheid) {

		// Een temporary object wordt gebruikt omdat Hibernate(SQL) eenzelfde kopie van
		// een exemplaar niet leuk vind.
		Exemplaar tmpexemplaar;
		for (int i = 0; i < hoeveelheid; i++) {
			tmpexemplaar = new Exemplaar();
			tmpexemplaar.setBoekId(exemplaar.getBoekId());
			tmpexemplaar.setReserveringId(exemplaar.getReserveringId());
			service.opslaanExemplaar(tmpexemplaar);
		}
		return service.countByBoekId(exemplaar.getBoekId());
	}

}
