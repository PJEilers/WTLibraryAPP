package com.WT.LibraryApp.Boek;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.WT.LibraryApp.Exemplaar.*;


@RestController
@CrossOrigin(maxAge = 3600)
public class BoekController {
	@Autowired
	private BoekService service;
	
	@Autowired 
	private ExemplaarService serviceExemplaar;
	
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
			return Collections.singletonMap("bestaat", bestaandBoek);
		}
		return Collections.singletonMap("bestaatNiet", service.maakBoekAan(boek));
	}
	
	/*@RequestMapping(method = RequestMethod.POST, value="/zoektitel")
	public List<Boek> vindOpTitel(@RequestBody Boek input) {
		List<Boek> boek = service.vindOpTitel(input);
		if (boek.isEmpty()) {
			return null;
		} else {
			return boek;
		}
	}*/
	
	@RequestMapping(method = RequestMethod.POST, value="/zoektitel")
	public List<Map<String, Object>> vindOpTitel(@RequestBody Boek input) {
		List<Boek> boeken = service.vindOpTitel(input);
		if (boeken.isEmpty()) {
			return null;
		} else {
			List<Map<String, Object>> output = new ArrayList<Map<String, Object>>();
			for (Boek boek : boeken) {
				Map<String, Object> map = new HashMap<>();
				map.put("boekid", boek.getId());
				map.put("titel", boek.getTitel());
				map.put("auteur", boek.getAuteur());
				map.put("isbn", boek.getIsbn());
				map.put("tags", boek.getTags());
				map.put("exemplarenTotaal", serviceExemplaar.countByBoekId(boek.getId()));
				map.put("beschikbaar", serviceExemplaar.countBeschikbaar(boek.getId()));
				output.add(map);
			}
			return output;
		}
	}

}


