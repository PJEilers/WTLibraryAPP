package com.WT.LibraryApp.Boek;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(maxAge = 3600)
public class BoekController {
	@Autowired
	private BoekService service;

	/*
	 * @RequestMapping("/boeken/{boekid}") public Optional<Boek>
	 * vindBoek(@PathVariable int boekid) { return service.vindBoek(boekid); }
	 */

	@RequestMapping(value = "/boeken")
	public List<Boek> vindAlleBoeken() {
		return service.vindAlleBoeken();
	}

	@RequestMapping(method = RequestMethod.POST, value = "/maakboekaan")
	public Map<String, Object> maakBoekAan(@RequestBody Boek boek) {
		Optional<Boek> bestaandBoek = service.vindBoek(boek.getIsbn());
		if (bestaandBoek.isPresent()) {
			return Collections.singletonMap("bestaat", bestaandBoek);
		}
		return Collections.singletonMap("bestaatNiet", service.maakBoekAan(boek));
	}

	// Optie op de database te vullen met array van boeken.
	@RequestMapping(method = RequestMethod.POST, value = "/maakboekenaan")
	public List<Object> maakBoekenAan(@RequestBody List<Boek> boeken) {
		
		List<Object> toegevoegdeboeken = new ArrayList<>();
		for (Boek boek : boeken) {
			Optional<Boek> bestaandBoek = service.vindBoek(boek.getIsbn());
			if (!bestaandBoek.isPresent()) {
				toegevoegdeboeken.add(service.maakBoekAan(boek));
			} else {
				System.out.println("Bestaat al");
			}
		}
		
		return toegevoegdeboeken;
	}

}
