const puppeteer = require("puppeteer");
const bookModel = require("../models/Booklet.model");
const genrateAiResponse = require("../service/ai.service");

async function scrapeArticle(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  const article = await page.evaluate(() => {
    const title = document.querySelector("h1")?.innerText || "No title";
    const paragraphs = Array.from(document.querySelectorAll("p"))
      .map(p => p.innerText.trim())
      .filter(Boolean);

    return { title, content: paragraphs.join("\n") };
  });

  await browser.close();
  return article;
}

async function createBooklet(req, res) {
  try {
    const user = req.user;
    const { url } = req.body;

    // Scrape the article content
    const article = await scrapeArticle(url);

    // Create a prompt for Gemini
    const prompt = `
      Summarize the following article into 5 digestible Instagram carousel slides.
      Each slide should be concise, engaging, and clear.

      Title: ${article.title}

      ${article.content}
    `;

    // AI response
    const response = await genrateAiResponse(prompt);

    // Save booklet in DB
    const booklet = await bookModel.create({
      userId: user._id,
      url,
      title: article.title,
      slides: response,
    });

    res.status(200).json({
      success: true,
      booklet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Disconnected" });
  }
}

module.exports = createBooklet;