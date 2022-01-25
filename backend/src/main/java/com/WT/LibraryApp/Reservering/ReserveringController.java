package com.WT.LibraryApp.Reservering;

import java.util.Collections;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.WT.LibraryApp.Boek.Boek;
import com.WT.LibraryApp.Boek.BoekService;
import com.WT.LibraryApp.Exemplaar.Exemplaar;
import com.WT.LibraryApp.Persoon.Persoon;
import com.WT.LibraryApp.Persoon.PersoonService;

@RestController
@CrossOrigin(maxAge = 3600)
public class ReserveringController {

	@Autowired
	private ReserveringService service;
	
	@Autowired
	private PersoonService servicePersoon;
	
	@Autowired
	private BoekService serviceBoek;

	@RequestMapping("/reservering/{mijnid}") // werkt nog niet
	public Optional<Reservering> vindEentje(@PathVariable int mijnid) {
		return service.vindEentje(mijnid);
	}

	@RequestMapping(value = "/reserveringen") // werkt nog niet
	public List<Reservering> vind() {
		return service.vindAlleReserveringen();
	}
	
	/*@RequestMapping(method = RequestMethod.POST, value = "/maakreserveringaan") // oude versie met String
	public Reservering maakReserveringAan(@RequestBody Reservering reservering) {
		return service.maakReserveringAan(reservering);
	}*/
	
	@RequestMapping(method = RequestMethod.POST, value = "/maakreserveringaan") // nieuwe versie met datum, werkt als de string yyyy-mm-dd is
	public Map<String, Object> maakReserveringAan(@RequestBody 
		@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Reservering reservering){
		Optional<Reservering> reserveringBestaat = service.vindReserveringMetPersoonIdEnBoekId(reservering);
		if (reserveringBestaat.isPresent()) {
			return Collections.singletonMap("bestaat", reserveringBestaat.get());
		}
		return Collections.singletonMap("bestaatNiet", service.maakReserveringAan(reservering));
  }

	/*
	 * @RequestMapping(method = RequestMethod.POST, value = "/maakreserveringaan")
	 * // oude versie met String public Reservering maakReserveringAan(@RequestBody
	 * Reservering reservering) { return service.maakReserveringAan(reservering); }
	 */

	// Meerdere Reservering toepassen voor testen
	@RequestMapping(method = RequestMethod.POST, value = "/maakreserveringenaan")
	public List<Reservering> maakReserveringenAan(
			@RequestBody @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) List<Reservering> reserveringen) {
		List<Reservering> nieuweReserveringen = new ArrayList<>();
		for (Reservering reservering : reserveringen) {
			nieuweReserveringen.add(service.maakReserveringAan(reservering));
		}
		return nieuweReserveringen;

	}
	
//	@RequestMapping(value = "/reserveringMetIds")
//	public Optional<Reservering> vindReserveringMetPersoonIdEnBoekId () {
//		return service.vindReserveringMetPersoonIdEnBoekId(reservering);
//	}
	
	@RequestMapping(value = "/reserveringMetPersoonEnBoek")
	public List<Map<String, Object>> vindReservering() {
		List<Reservering> reserveringen = service.vindAlleReserveringen();
		List<Map<String, Object>> reserveringArray = new ArrayList<>();
		for (Reservering reservering : reserveringen) {
			Map<String, Object> reserveringMap = new HashMap<>();
			
	
//			Map<String, String> naamEmail = servicePersoon.vindPersoonNaamEmail(persoonId);
//			reserveringMap.put("id", reservering.getId());
			reserveringMap.put("boekId", reservering.getBoekId());
			reserveringMap.put("persoonId", reservering.getPersoonId());
			reserveringMap.put("datum", reservering.getDatum());
			
			// Persoon naam en email toevoegen
			int persoonId = reservering.getPersoonId();
			Optional <Persoon> optionalPersoon = servicePersoon.vindPersoon(persoonId);
			if (optionalPersoon.isPresent()) {
				Persoon persoon = optionalPersoon.get();
				reserveringMap.put("naam", persoon.getNaam());
//				reserveringMap.put("email", persoon.getEmail());
			} else {
				reserveringMap.put("naam", null);
//		    	reserveringMap.put("email", null);
			}
			
			// Boek titel en auteur toevoegen
			int boekId = reservering.getBoekId();
			Optional <Boek> optionalBoek = serviceBoek.vindBoek(boekId);
			if (optionalBoek.isPresent()) {
				Boek boek = optionalBoek.get();
				reserveringMap.put("titel", boek.getTitel());
				reserveringMap.put("auteur", boek.getAuteur());
			} else {
				reserveringMap.put("titel", null);
		    	reserveringMap.put("auteur", null);
			}
			
			reserveringArray.add(reserveringMap);
			
//				reserveringMap.put("naam", naamEmail.get("naam"));
//				reserveringMap.put("email", naamEmail.get("email"));
				
//				reserveringArray.add(reservering);
//				reserveringArray.add(naamEmail);
//				reserveringMap.put(index, reserveringArray);

		}
	return reserveringArray;
	}

}
