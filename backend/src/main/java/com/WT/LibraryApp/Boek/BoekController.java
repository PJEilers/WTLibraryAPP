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

import com.WT.LibraryApp.Exemplaar.ExemplaarService;
import com.WT.LibraryApp.Uitlening.UitleningService;

@RestController
@CrossOrigin(maxAge = 3600)
public class BoekController {

	@Autowired
	private BoekService service;

	@Autowired
	private ExemplaarService serviceExemplaar;
	
	@Autowired
	private UitleningService uitleningService;

	// Haalt informatie alle boeken op. Gebruikt in BoekTabel.js
	@RequestMapping(value = "/boeken")
	public List<BoekDTO> vindAlleBoeken() {
		List<Boek> boeken = service.vindAlleBoeken();
		List<BoekDTO> boekenDTO = new ArrayList<>();		

		for (Boek boek : boeken) {
			// Hier wordt alle informatie in het Data Transfer Object gestopt.
			BoekDTO boekDTO = new BoekDTO(boek, 
					serviceExemplaar.countByBoek(boek),
					serviceExemplaar.countBeschikbaar(boek), 
					uitleningService.countUitleningMetExemplaren(serviceExemplaar.vindExemplarenViaBoek(boek))
					);
			boekenDTO.add(boekDTO);
		}

		return boekenDTO;
	}

	// Maakt een Boek aan als deze nog niet bestaat. Gebruikt in BoekToevoegen.js
	@RequestMapping(method = RequestMethod.POST, value = "/maakboekaan")
	public Map<String, Object> maakBoekAan(@RequestBody Boek boek) {
		Optional<Boek> bestaandBoek = service.vindBoek(boek.getIsbn());
		if (bestaandBoek.isPresent()) {
			return Collections.singletonMap("bestaat", bestaandBoek.get());
		}
		return Collections.singletonMap("bestaatNiet", service.maakBoekAan(boek));
	}

	// Optie op de database te vullen met array van boeken. Voor testen.
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
