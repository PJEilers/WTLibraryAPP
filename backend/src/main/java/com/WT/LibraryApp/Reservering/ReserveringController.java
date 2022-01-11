package com.WT.LibraryApp.Reservering;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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
	public Reservering maakReserveringAan(@RequestBody 
		@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Reservering reservering){
		return service.maakReserveringAan(reservering);
	}

}
