package com.WT.LibraryApp.Exemplaar;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.WT.LibraryApp.Boek.Boek;
import com.WT.LibraryApp.Boek.BoekService;
import com.WT.LibraryApp.Exemplaar.Exemplaar.Status;
import com.WT.LibraryApp.Reservering.ReserveringService;
import com.WT.LibraryApp.Uitlening.UitleningService;

@RestController
@CrossOrigin(maxAge = 3600)
public class ExemplaarController {

	@Autowired
	private ExemplaarService service;

	@Autowired
	private BoekService serviceBoek;

	@Autowired
	private ReserveringService serviceReservering;
	
	@Autowired
	private UitleningService serviceUitlening;

	// Optie voor vragen naar alle exemplaren van een bepaald boek. Gebruikt in ExemplaarInformatie.js
	@RequestMapping(value = "/boekexemplaren/{boekid}" /* TODO */) 
	public List<Exemplaar> vindBoekExemplaren(@PathVariable int boekid) {
		return service.vindBoekExemplaren(boekid);
	}

	// Optie voor toevoegen van meerdere exemplaren
	@RequestMapping(method = RequestMethod.POST, value = "/opslaanexemplaar/{boekId}/{hoeveelheid}" /* TODO */)
	public List<Integer> opslaanExemplaar(@PathVariable int boekId, @PathVariable int hoeveelheid) {

		List<Integer> gebruikteIds = new ArrayList<Integer>();
		Boek boek = serviceBoek.vindBoek(boekId).get();
		for (int i = 0; i < hoeveelheid; i++) {
			Exemplaar tmpexemplaar = new Exemplaar();
			tmpexemplaar.setBoek(boek);
			// Hierbij wordt aangenomen dat er geen exemplaren worden verwijdert maar dat de status dan wordt aangepast
			gebruikteIds.add(service.countByBoek(boek) + 1);
			tmpexemplaar.setIndividueelId(gebruikteIds.get(i));
			tmpexemplaar.setStatus(Status.BESCHIKBAAR);
			service.opslaanExemplaar(tmpexemplaar);
		}
		return gebruikteIds;
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/updateexemplaarstatus")
	public Optional<Exemplaar> updateExemplaarStatus(@RequestBody Exemplaar exemplaar) {
		Optional <Exemplaar> e = service.vindExemplaarOpId(exemplaar.getId());
		Status oudeStatus = e.get().getStatus();

		service.updateStatus(exemplaar.getId(), exemplaar.getStatus());
		if (oudeStatus == Status.UITGELEEND) {
			serviceUitlening.updateEindDatum(exemplaar.getId());
		}
		
		return service.vindExemplaarOpId(exemplaar.getId());
	}

}



