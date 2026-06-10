package com.leo.Gamestalgia.dto;

public record GameDto(
        Long id,
        String name,
        String backgroundImage,
        Double rating,
        String released
) {
}
