## Project Title

GBDA302 Week 4 Side Quest: JSON Maze Escape (Physics Update)

---

## Authors

Fiona Luo

---

## Description

This sketch is a grid-based maze game that demonstrates separating data from logic. It now includes smooth movement physics and visual particle collision effects for a more reactive experience.

---

## Learning Goals


- Using preload() and loadJSON() to import map configurations before game runs.
- Using nested loops to iterate through 2D arrays and render tiles (walls, floors, start, and goal) dynamically.
- How to turn raw JSON arrays into objects.
- Triggering a level change and resizing the canvas automatically when the player wined the game.
- Utilizing “lerp()” for smooth, physics-based movement transitions.
- Creating a dynamic particle system using arrays and objects to simulate collision physics (velocity, fading alpha).

Important Concepts:

- levels.json acts as the "blueprint" storing the map design, while sketch.js acts as the "engine" that processes that data. 
- This separation allows us to create new levels just by editing a text file, without touching the game code.

---

## Assets

N/A

---

## GenAI

1. I used GenAI to help explain the logic of parsing 2D arrays from the JSON file.
2. I used GenAI to write the code comments and translate them to English.
3. I used GenAI to implement the physics features, including the ”lerp()“ smooth movement and the particle collision visual effects.

---
