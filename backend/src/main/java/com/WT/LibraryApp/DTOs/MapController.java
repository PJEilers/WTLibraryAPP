package com.WT.LibraryApp.DTOs;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MapController {
  
    @Autowired
    private MapService mapService;

    @GetMapping("/mapReserveringenPersoonBoek")
    @ResponseBody
    public List<ReserveringPersoonBoekDTO> alleReserveringenMetPersoonBoek() {
        List <ReserveringPersoonBoekDTO> reserveringenPersoonBoek = mapService.alleReserveringenMetPersoonBoek();
        return reserveringenPersoonBoek;
    }
}