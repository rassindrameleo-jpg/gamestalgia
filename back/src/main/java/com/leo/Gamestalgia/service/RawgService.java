package com.leo.Gamestalgia.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.leo.Gamestalgia.dto.GameDetailDto;
import com.leo.Gamestalgia.dto.GameDto;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
public class RawgService {

    @Value("${rawg.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    public List<GameDto> getPopularGames() {

        String url =
                "https://api.rawg.io/api/games?key="
                        + apiKey;

        try {

            String response =
                    restTemplate.getForObject(url, String.class);

            JsonNode root = mapper.readTree(response);

            List<GameDto> games = new ArrayList<>();

            for (JsonNode game : root.get("results")) {

                games.add(new GameDto(
                        game.get("id").asLong(),
                        game.get("name").asText(),
                        game.get("background_image").asText(),
                        game.get("rating").asDouble(),
                        game.get("released").asText()
                ));
            }

            return games;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public List<GameDto> searchGames(String query) {
        String url =
            "https://api.rawg.io/api/games?search="
            + query
            + "&key="
            + apiKey;

        try {

            String response =
                    restTemplate.getForObject(url, String.class);

            JsonNode root = mapper.readTree(response);

            List<GameDto> games = new ArrayList<>();

            for (JsonNode game : root.get("results")) {

                games.add(new GameDto(
                        game.get("id").asLong(),
                        game.get("name").asText(),
                        game.get("background_image").asText(),
                        game.get("rating").asDouble(),
                        game.get("released").asText()
                ));
            }

            return games;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public GameDetailDto getGameById(Long id) {

    String url =
        "https://api.rawg.io/api/games/"
        + id
        + "?key="
        + apiKey;

    try {

        String response =
            restTemplate.getForObject(url, String.class);

        JsonNode game = mapper.readTree(response);

        GameDetailDto dto = new GameDetailDto(
            game.get("id").asLong(),
            game.get("name").asText(),
            game.get("description").asText(),
            game.get("background_image").asText(),
            game.get("rating").asDouble(),
            game.get("released").asText()
        );

        return dto;

    } catch (Exception e) {
        throw new RuntimeException(e);
    }
}
}