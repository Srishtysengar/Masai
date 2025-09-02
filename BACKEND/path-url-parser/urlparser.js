const url = require("url");

function parseUrl(fullUrl) {
  if (!fullUrl) {
    return { error: "URL is missing" };
  }

  try {
    const parsed = new URL(fullUrl);
    const queryParams = {};
    parsed.searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });

    return {
      hostname: parsed.hostname,
      pathname: parsed.pathname,
      query: queryParams,
    };
  } catch (err) {
    return { error: "Invalid URL format" };
  }
}

module.exports = parseUrl;
