import fs from "fs";
import path from "path";

// Path to the JSON file
const jsonFilePath = path.join(__dirname, "test.json");

// Path to the output JSON file
const outputFilePath = path.join(__dirname, "output.json");

// Read the JSON file
fs.readFile(jsonFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  try {
    // Parse the JSON data
    const jsonData = JSON.parse(data);

    const parsed = jsonData.payload.components.reduce((acc, component) => {
      acc[component.description] = component.key;
      return acc;
  }, {});

    // Write the manipulated data to another file
    fs.writeFile(
      outputFilePath,
      JSON.stringify(parsed, null, 2),
      "utf8",
      (writeErr) => {
        if (writeErr) {
          console.error("Error writing the file:", writeErr);
          return;
        }
        console.log("Parsed data has been written to", outputFilePath);
      }
    );
  } catch (parseErr) {
    console.error("Error parsing JSON:", parseErr);
  }
});
