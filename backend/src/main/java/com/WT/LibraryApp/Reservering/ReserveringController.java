package com.WT.LibraryApp.Reservering;

import java.util.List;
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
public class ReserveringController {
	
	@Autowired
	private ReserveringService service;
	
	@RequestMapping("/reservering/{mijnid}")
	public Optional<Reservering> vindEentje(@PathVariable int mijnid) {
		return service.vindEentje(mijnid);
	}
	
	@RequestMapping(value = "/reserveringen")
	public List<Reservering> vind() {
		return service.vindAlleReserveringen();
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/maakreserveringaan")
	public Reservering maakReserveringAan(@RequestBody Reservering reservering) {
		return service.maakReserveringAan(reservering);
	}

}
