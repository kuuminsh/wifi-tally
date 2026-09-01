# Open Source Tally Light

vTally is an Open Source Wifi Tally Light based on the ESP8266.

It aims to be affordable without sacrificing reliability and works with most
common video mixers.

Its architecture uses a central Hub that connects the tallies to the video mixer and
allows easy configuration and monitoring.

![Architecture Setup](documentation/docs/images/architecture.png)
uses icons from the Noun Project by 
[Eucalyp](https://thenounproject.com/browse/?i=3151803),
[Atif Arshad](https://thenounproject.com/browse/?i=1294543),
[priyanka](https://thenounproject.com/browse/?i=1637910),
[Hrbon](https://thenounproject.com/browse?i=3014911) and
[ProSymbols](https://thenounproject.com/browse/?i=1086042), all licensed [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/us/legalcode)

## Features

* WiFi Tally Light based on the ESP8266
* Hardware costs of about 10€
* flexible USB power (battery pack, camera outlet, stationary)
* Fast communication and lightweight protocol
* uses a central Hub to communicate, that allows easy monitoring
* utilizes your local network and access points
* support for RGB Leds (anode, cathode), WS2812, NeoPixel, etc
* alternatively: turn any device with a browser (smartphone, tablet) into a Tally
* Open Source / Open Hardware

## Fork-Specific Changes

This fork adds vMix-focused configuration and reliability improvements:

* Assign multiple vMix Inputs to one Tally. Program takes priority over Preview when assigned Inputs have different states.
* Browse 15 vMix Inputs at a time and see each Input number before its title.
* Save independent Tally assignments and per-Tally settings for each vMix project. vTally detects the active project automatically and loads its saved profile; projects without a saved profile start with unpatched Tallies.
* See the active vMix project name, configuration status, application version, and build time in the web interface. Use **Save project** to store the active project's configuration.
* Process vMix TCP XML responses safely when they arrive in multiple network packets.
* Exit the Hub if a complete vMix connection cannot be made within 10 minutes; the portable tray application exits with it.
* Build standalone backend and portable Windows executables.

See [Fork-Changes.md](Fork-Changes.md) for the complete technical description and compatibility details.

## Getting Started

:arrow_forward: :arrow_forward: :arrow_forward: [Read the full documentation at wifi-tally.github.io](https://wifi-tally.github.io/) :arrow_backward: :arrow_backward: :arrow_backward:

## Status

![Build Status](https://github.com/wifi-tally/wifi-tally/workflows/build/badge.svg)
[![Cypress Tests](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/1qd2ua/master&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/1qd2ua/runs)

![GitHub last commit](https://img.shields.io/github/last-commit/wifi-tally/wifi-tally)
![GitHub (Pre-)Release Date](https://img.shields.io/github/release-date-pre/wifi-tally/wifi-tally?label=latest%20release)
