const { removeBackgroundFromImageFile } = require("remove.bg");
const fs = require("fs");
const path = require("path");

// Local file path
const localD = "C:\\output";
const localFile = path.join(localD, "current.jpg");



// Output directory and filename
const outputDir = "C:\\output";
const outputFile = path.join(outputDir, "photo-no-bg.png");

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Function to remove background from image
const removeBgFromImage = async () => {
  try {
    const result = await removeBackgroundFromImageFile({
      path: localFile,
      apiKey: "QSc3XacaG3idUQMeGvFdGwUN",
      type: "auto",      // Background removal type (auto, person, etc.)

      bg_color: "#001eff",
      outputFile        // Corrected: Now a full file path
    });

    console.log(`File saved to ${outputFile}`);
    const base64img = result.base64img; // Get base64 image data
    // You can use the base64img for further purposes if needed
  } catch (errors) {
    console.error("Error removing background:", JSON.stringify(errors));
  }
};

// Call the function
removeBgFromImage();
