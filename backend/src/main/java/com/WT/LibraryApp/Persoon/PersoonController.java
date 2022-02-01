package com.WT.LibraryApp.Persoon;

import java.util.ArrayList;
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

public class PersoonController {

	@Autowired
	private PersoonService service;

	// Haalt alle personen op. Gebruikt in PersoonInformatie.js
	@RequestMapping(value = "/personen")
	public List<PersoonDTO> vindAllePersonen() {
		return service.vindAllePersonen();
	}

	// Maakt een persoon aan. Gebruikt in PersoonToevoegen.js
	@RequestMapping(method = RequestMethod.POST, value = "/maakpersoonaan")
	public PersoonDTO maakPersoonAan(@RequestBody Persoon persoon) {
		return service.maakPersoonAan(persoon);
	}

	// Meerdere personen aanmaken voor testing.
	@RequestMapping(method = RequestMethod.POST, value = "/maakpersonenaan")
	public List<PersoonDTO> maakPersonenAan(@RequestBody List<Persoon> personen) {
		List<PersoonDTO> gebruikers = new ArrayList<>();
		for (Persoon persoon : personen) {
			gebruikers.add(service.maakPersoonAan(persoon));
		}
		return gebruikers;
	}

	// Verwijdert persoonsgegevens en verandert deze in placeholders
	@RequestMapping(method = RequestMethod.GET, value = "/uitdienst/{persoonId}")
	public void uitDienst(@PathVariable int persoonId) {
		service.uitDienst(persoonId);
	}

}
