package com.leo.Gamestalgia.dto;

public record GameDetailDto(
    Long id,
    String name,
    String description,
    String backgroundImage,
    Double rating,
    String released
) {}
