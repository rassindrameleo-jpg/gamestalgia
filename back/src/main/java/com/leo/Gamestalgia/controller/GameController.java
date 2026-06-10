package com.leo.Gamestalgia.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leo.Gamestalgia.dto.GameDto;
import com.leo.Gamestalgia.service.RawgService;

@RestController
public class GameController {

    private final RawgService rawgService;

    public GameController(RawgService rawgService) {
        this.rawgService = rawgService;
    }

    @GetMapping("/api/games")
    public List<GameDto> getGames() {
        return rawgService.getPopularGames();
    }
}
