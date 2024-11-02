function checkTriangle() {
    const side1 = parseFloat(document.getElementById("side1").value);
    const side2 = parseFloat(document.getElementById("side2").value);
    const side3 = parseFloat(document.getElementById("side3").value);
    const resultElement = document.getElementById("result");
    const solutionElement = document.getElementById("solution");

    if (isNaN(side1) || isNaN(side2) || isNaN(side3)) {
        resultElement.textContent = "Please enter valid numbers for all sides!";
        resultElement.style.color = "red";
        solutionElement.textContent = "";
        return;
    }

    let triangleType = "";
    if (side1 === side2 && side2 === side3) {
        triangleType = "Equilateral Triangle";
        resultElement.textContent = "It's an Equilateral Triangle!";
    } else if (side1 === side2 || side2 === side3 || side1 === side3) {
        triangleType = "Isosceles Triangle";
        resultElement.textContent = "It's an Isosceles Triangle!";
    } else {
        triangleType = "Scalene Triangle";
        resultElement.textContent = "It's a Scalene Triangle!";
    }
    resultElement.style.color = "green";

    drawTriangle(side1, side2, side3);
    displaySolution(side1, side2, side3, triangleType);
}

function drawTriangle(a, b, c) {
    const canvas = document.getElementById("triangleCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const canvasSize = Math.min(window.innerWidth, 300);
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const scaleFactor = (canvasSize * 0.8) / Math.max(a, b, c);
    const A = a * scaleFactor;
    const B = b * scaleFactor;
    const C = c * scaleFactor;

    const x1 = 50, y1 = canvasSize - 50;
    const x2 = x1 + A;
    const y2 = y1;

    const angleC = Math.acos((A * A + B * B - C * C) / (2 * A * B));
    const x3 = x1 + B * Math.cos(angleC);
    const y3 = y1 - B * Math.sin(angleC);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();

    ctx.fillStyle = "#87CEEB";
    ctx.fill();
    ctx.strokeStyle = "#4682B4";
    ctx.lineWidth = 2;
    ctx.stroke();
}

function displaySolution(side1, side2, side3, triangleType) {
    const solutionElement = document.getElementById("solution");

    solutionElement.innerHTML = `
        <h2>Solution:</h2>
        <p>Given sides: A = ${side1}, B = ${side2}, C = ${side3}</p>
        <p>Step 1: Check if all sides are equal:</p>
        <p>${side1} = ${side2} = ${side3} ? ${side1 === side2 && side2 === side3 ? "Yes" : "No"}</p>
        <p>Step 2: Check if any two sides are equal:</p>
        <p>${side1} = ${side2} or ${side2} = ${side3} or ${side1} = ${side3} ? ${side1 === side2 || side2 === side3 || side1 === side3 ? "Yes" : "No"}</p>
        <p>Step 3: Since the sides ${side1}, ${side2}, and ${side3} do not all match any specific case,
         this is determined to be a <strong>${triangleType}</strong>.</p>
    `;
}
