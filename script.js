const form = document.querySelector('form')

form.addEventListener('submit', e=>{
    e.preventDefault();

    const value1 = parseFloat(document.querySelector('.v1').value) || 0;
    const value2 = parseFloat(document.querySelector('.v2').value) || 0;
    const value3 = parseFloat(document.querySelector('.v3').value) || 0;

    const st = document.querySelector('.st').value || "space"

    const values1 = [value1, value2, value3];
    const median = (values1[0] + values1[1] + values1[2]) / 3;

    const display = document.querySelector('.display')

    let the_result = calculateDeviation(median, values1, st)
    let the_median = matchWithUncertainty(median, the_result)

    display.querySelector('h1').innerText = `Incerteza: ${the_result}
    \n Média: ${the_median} \n
    `
})

function matchWithUncertainty(value, uncertainty) {
    const decimalPlaces = -Math.floor(Math.log10(uncertainty));
    
    const factor = Math.pow(10, decimalPlaces);
    const roundedValue = Math.round(value * factor) / factor;
    
    return roundedValue;
}


function calculateDeviation(median, values, variance = "") {
    let a = 0;

    switch (variance) {
        case "space":
            a = 0.05;
            break;
        case "time":
            a = 0.001;
            break;
    }

    let sum = 0;
    for (let i = 0; i < values.length; i++) {
        sum += Math.pow(values[i] - median, 2);
    }

    const result = Math.sqrt(sum / 6);
    const result_2 = Math.sqrt(Math.pow(a, 2) + Math.pow(result, 2));


    return `${toOneSignificantFigure(result_2)}`;
}

function toOneSignificantFigure(number) {
    if (number === 0) return "0"; // Handle zero case
    const magnitude = Math.floor(Math.log10(Math.abs(number))); // Find order of magnitude
    const factor = Math.pow(10, magnitude); // Scale factor to isolate first digit
    return (Math.round(number / factor) * factor).toPrecision(1); // Scale back and format
}

// console.log(calculateDeviation(1.341293, values1, "time"));
