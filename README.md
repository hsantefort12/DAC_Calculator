# DesktopApp-Capstone

## DAC Calculator for ECE4900 Capstone Filter Design

Calculates the digital word to be put onto the DAC to determine the cutoff frequency for the multifilter.

Uses Electron version 6.0.11

## To get running on your machine

1. Make sure that you have node and npm installed (https://nodejs.org/en/download/)
2. Clone this repo
3. Change into your directory in a terminal
4. Enter npm i
5. Enter npm start

## NOTE:
After running npm i, you may need to explicitly install electron because NPM sucks. Enter
npm i --save-dev electron


## To Build
In your working directory, assuming you have run npm i:
Enter npm run-script build

## NOTE FOR WINDOWS 10 USERS
If you use wsl, you will get an error. Make sure to switch to PowerShell or cmd to run.
