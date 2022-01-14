package com.WT.LibraryApp.Boek;

import java.util.Collections;
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


@RestController
@CrossOrigin(maxAge = 3600)
public class BoekController {
	@Autowired
	private BoekService service;
	
	/*@RequestMapping("/boeken/{boekid}")
	public Optional<Boek> vindBoek(@PathVariable int boekid) {
		return service.vindBoek(boekid);
	}*/

	@RequestMapping(value = "/boeken")
	public List<Boek> vindAlleBoeken() {
		return service.vindAlleBoeken();
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/maakboekaan")
	public Map<String, Object> maakBoekAan(@RequestBody Boek boek) {
		Optional<Boek> bestaandBoek = service.vindBoek(boek.getIsbn());
		if (bestaandBoek.isPresent()) {
			return Collections.singletonMap("bestaat", bestaandBoek.get());
		}
		return Collections.singletonMap("bestaatNiet", service.maakBoekAan(boek));
	}

}


