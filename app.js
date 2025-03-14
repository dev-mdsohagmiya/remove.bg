const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // Set to true for headless mode
    const page = await browser.newPage();

    // Go to the upload page
    await page.goto("https://www.cutout.pro/photo-enhancer-sharpener-upscaler/upload", { waitUntil: "networkidle2" });

    // Upload Image
    const fileInput = await page.$("input[type='file']");
    await fileInput.uploadFile("./photo.jpg"); // Change "image.jpg" to your file path

    console.log("Image uploaded, waiting for processing...");

    // Wait for processing to complete (adjust timeout if needed)
    await page.waitForSelector(".btn-one", { timeout: 60000 });

    // Click the "Free Download" button
    await page.click(".btn-one");

    console.log("Download button clicked, waiting for download...");

    // Wait for the download URL to appear
    await page.waitForResponse(response => response.url().includes("download") && response.status() === 200);

    // Get the final download URL
    const downloadUrl = await page.evaluate(() => {
        return document.querySelector(".btn-one").getAttribute("href");
    });

    console.log("Download URL:", downloadUrl);

    if (downloadUrl) {
        // Download the file using axios
        const axios = require("axios");
        const response = await axios({
            url: downloadUrl,
            method: "GET",
            responseType: "stream",
        });

        const writer = fs.createWriteStream(path.join(__dirname, "enhanced_image.jpg"));
        response.data.pipe(writer);

        writer.on("finish", () => console.log("Image downloaded successfully!"));
        writer.on("error", err => console.error("Download error:", err));
    }

    // Close browser
    await browser.close();
})();
