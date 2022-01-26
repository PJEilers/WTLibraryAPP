package com.WT.LibraryApp.Uitlening;
import com.WT.LibraryApp.Exemplaar.ExemplaarService;
import com.WT.LibraryApp.Exemplaar.Exemplaar.Status;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.WT.LibraryApp.Persoon.PersoonService;
import com.WT.LibraryApp.Exemplaar.ExemplaarService;

@RestController
@CrossOrigin(maxAge = 3600)
public class UitleningController {
	@Autowired
	private UitleningService service;
	
	@Autowired
	private PersoonService servicePersoon;
	
	@Autowired ExemplaarService serviceExemplaar;

	@Autowired
	private ExemplaarService exemplaarService;

	@RequestMapping("/uitlening/{mijnid}") // werkt nog niet
	public Optional<Uitlening> vindEentje(@PathVariable int mijnid) {
		return service.vindEentje(mijnid);
	}

//	@RequestMapping("/vindexemplaar/{exemplaarid}") // werkt nog niet
//	public Uitlening vindExemplaar(@PathVariable int exemplaarid) {
//		return service.vindExemplaar(exemplaarid);
//	}
//	
	@RequestMapping(value = "/uitleningen")
	public List<Uitlening> vind() {
		return service.vindAlleUitleningen();
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/maakuitleningaan") // Werkt als de string yyyy-mm-dd is
	public Uitlening maakUitleningAan(@RequestBody
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Uitlening uitlening){
		exemplaarService.updateStatus(uitlening.getExemplaarId(), Status.UITGELEEND);
		return service.maakUitleningAan(uitlening);
	}

	// Werkt als de string yyyy-mm-dd is
	@RequestMapping(method = RequestMethod.POST, value = "/maakuitleningenaan")
	public List<Uitlening> maakUitleningenAan(@RequestBody @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) List<Uitlening> uitleningen) {
		List<Uitlening> opgeslagenUitleningen = new ArrayList<>();
		for (Uitlening uitlening: uitleningen) {
			opgeslagenUitleningen.add(service.maakUitleningAan(uitlening));
			exemplaarService.updateStatus(uitlening.getExemplaarId(), Status.UITGELEEND);
		}
		
		return opgeslagenUitleningen;
	}
	
	@RequestMapping(value = "/historie")
	public List<Map<String, Object>> uitleenHistorie() {
		List<Uitlening> uitleningen = service.vindAlleUitleningen();
		List<Map<String, Object>> output = new ArrayList<Map<String, Object>>();
		for (Uitlening uitlening : uitleningen) {
			Map<String, Object> map = new HashMap<>();
			map.put("id",  uitlening.getId());
			map.put("beginDatum", uitlening.getBeginDatum());
			map.put("eindDatum", uitlening.getEindDatum());
			map.put("persoon", servicePersoon.vindPersoonNaam(uitlening.getPersoonId()));
			map.put("exemplaarId", serviceExemplaar.vindIndividueelId(uitlening.getExemplaarId()));
			map.put("boekId", serviceExemplaar.vindBoekId(uitlening.getExemplaarId()));
			output.add(map);
		}
		
		return output;
	}
}
