package com.WT.LibraryApp.Exemplaar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExemplaarController {

	@Autowired
	private ExemplaarService service;
}
