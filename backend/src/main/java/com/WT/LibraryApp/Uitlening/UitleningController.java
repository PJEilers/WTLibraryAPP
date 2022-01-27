package com.WT.LibraryApp.Uitlening;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.WT.LibraryApp.Exemplaar.Exemplaar.Status;
import com.WT.LibraryApp.Exemplaar.ExemplaarService;

import com.WT.LibraryApp.Reservering.Reservering.ReserveringStatus;
import com.WT.LibraryApp.Reservering.ReserveringService;

import com.WT.LibraryApp.Persoon.PersoonService;


@RestController
@CrossOrigin(maxAge = 3600)
public class UitleningController {

	@Autowired
	private UitleningService service;

	//Nodig voor Status update
	@Autowired
	private ExemplaarService exemplaarService;

	//Nodig voor andere Status update, bij reservering
	@Autowired
	private ReserveringService reserveringService;
	
  @Autowired
	private PersoonService persoonService;
  
	// Maakt een uitlening aan, met reservering id, en zet de status van het exemplaar, en in reservering, naar uitgeleend. Gebruikt in UitleningToevoegen.js, Constanten.js -> PersoonInformatie.js?, ExemplaarInformatie.js
	@RequestMapping(method = RequestMethod.POST, value = "/maakuitleningaan/{reserveringId}")
	public Uitlening maakUitleningAan(@PathVariable int reserveringId, @RequestBody @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Uitlening uitlening) {

		// Status moet via ExemplaarService worden aangepast naar Uitgeleend:
		exemplaarService.updateStatus(uitlening.getExemplaar().getId(), Status.UITGELEEND);
		// Reservering status moet via ReserveringService worden aangepast naar Uitgeleend:
		if (reserveringId != 0) {
			reserveringService.updateStatus(reserveringId, ReserveringStatus.UITGELEEND);
		}
		return service.maakUitleningAan(uitlening);
	}

	// Meerdere utileningen aanmaken voor testen
	@RequestMapping(method = RequestMethod.POST, value = "/maakuitleningenaan")
	public List<Uitlening> maakUitleningenAan(
			@RequestBody @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) List<Uitlening> uitleningen) {
		List<Uitlening> opgeslagenUitleningen = new ArrayList<>();

		for (Uitlening uitlening : uitleningen) {
			opgeslagenUitleningen.add(service.maakUitleningAan(uitlening));
			exemplaarService.updateStatus(uitlening.getExemplaar().getId(), Status.UITGELEEND);
		}

		return opgeslagenUitleningen;
	}

	// Haalt alle informatie van uitleningen op. Gebruikt in UitleenHistorie.js
	@RequestMapping(value = "/historie/{persoonId}")
	public List<Map<String, Object>> uitleenHistorie(@PathVariable int persoonId) {
		List<Uitlening> uitleningen = new ArrayList<>();
		
		// Check of de persoon een admin is. Niet echt veilig.
		Boolean adminRechten = persoonService.vindPersoon(persoonId).get().getAdminRechten();
		if (adminRechten) {
			uitleningen = service.vindAlleUitleningen();
		} else {
			uitleningen = service.vindUitleningenMetPersoon(persoonId);
		}
		
		List<Map<String, Object>> output = new ArrayList<Map<String, Object>>();
		for (Uitlening uitlening : uitleningen) {
			Map<String, Object> map = new HashMap<>();
			map.put("beginDatum", uitlening.getBeginDatum());
			map.put("eindDatum", uitlening.getEindDatum());			
			map.put("exemplaarId", uitlening.getExemplaar().getIndividueelId());
			map.put("boekId", uitlening.getExemplaar().getBoek().getId());
			map.put("boek", uitlening.getExemplaar().getBoek().getTitel());
			if (adminRechten) {
				map.put("id", uitlening.getId());
				map.put("persoon", uitlening.getPersoon().getNaam());
			}
			output.add(map);
		}

		return output;
	}
}
