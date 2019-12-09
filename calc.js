 /**
  * Functions used to determine the bits that need to be
  * active high to achieve the desired cutoff frequency.
  * 
  * Written by Haden Santefort for ECE 4900
  * 
  * Haden Santefort, Matt Daehn, Tamir Yankevich, 
  * Clayton Wise, Locke Wang
  */
 
 // Constant values
 const Rf_Value = 7.96e3;  // Can alter to adjust max cutoff frequency
 const N = 12;             // 12 bit DAC

 function calcF0(DACgain, F0Max) {
     return DACgain * F0Max;
 }

 function calcDACGain(X, n) {
     return X / Math.pow(2, n);
 }

 function calcF0Max(){
     return 1 / (2 * Math.PI * 1e-9 * Rf_Value);
 }
 /*
 Calculates the percent error for the given
 cutoff frequency
 */
 function calcError(decWord, reqFreq) {
     maxFreq = calcF0Max();
     var f0 = calcF0(calcDACGain(decWord, N), calcF0Max());
     return Math.abs((f0 - reqFreq) / reqFreq) * 100;
 }

 function calcWord(f0, Rf, n) {
     return Math.round(6.28e-9 * Rf * f0 * Math.pow(2, n)); // Equation found in App Notes on 
                                                            // Digitaly Programmable filter page 2
 }

 // Converts and pads decimal word to have 12 bits
 function convertToBinary(num) {
     var temp = (num).toString(2);
     var val = "";
     var i = 12 - temp.length;
     while (i > 0) {
         val += '0';
         i--;
     }
     val += temp;
     return val;
 }

 function determineBits(binNum) {
    var bitsValues = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    var i = 0;
    [...binNum].forEach(element => {
        bitsValues[i] = bitsValues[i] * element;
        i++;
    });

    var bits = bitsValues.filter(n => {
        return n !== 0;
    });

    return bits;
 }

 function onClick() {
     // Gets desired cutoff frequency
     var siUnit = document.getElementById("si").value;
     var cutoffFrequency = document.getElementById("freq").value * siUnit;
     var decWord = calcWord(cutoffFrequency, Rf_Value, N);
     var binWord = convertToBinary(decWord);
     var error = calcError(decWord, cutoffFrequency);
     var bits = determineBits(binWord);
     if (bits.length === 0) {
         bits = "None";
     }
     // Checks if cutoff frequency is possible
     if (binWord.length > 12) {
         document.getElementById("decVal").innerHTML = "ERROR";
         document.getElementById("binVal").innerHTML = "INVALID CUTOFF FREQUENCY";
         document.getElementById("error").innerHTML = "Error: INVALID";
     } else {
         document.getElementById("decVal").innerHTML = "DAC Value (Decimal): " + decWord.toString();
         document.getElementById("binVal").innerHTML = "DAC Value (Binary): " + binWord.toString() + " [" + bits.toString() + "]";
         document.getElementById("error").innerHTML = "Error: " + error.toFixed(1).toString() + "%";
     }
 }