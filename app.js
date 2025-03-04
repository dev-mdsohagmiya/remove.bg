const { removeBackgroundFromImageFile } = require("remove.bg");

// Local file path
const localFile = "./photo.jpg";

// Output file path
const outputFile = "C:\\output";

// Function to remove background from image
const removeBgFromImage = async () => {
  try {
    const result = await removeBackgroundFromImageFile({
      path: localFile,
      apiKey: "QSc3XacaG3idUQMeGvFdGwUN",
      size: "regular",   // Image size (e.g., regular, preview)
      type: "auto",      // Background removal type (auto, person, etc.)
      scale: "50%",  
      bg_color:"#001eff",
      // Scaling factor
      outputFile        // Output path where the image will be saved
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