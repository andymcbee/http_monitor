import fetch from "node-fetch";

export const getHttpStatus = async (domain_name) => {
  let response;

  let startTime = Date.now();
  let timeout = 5000;

  try {
    response = await fetch(domain_name, {
      signal: AbortSignal.timeout(timeout),
    });
  } catch (error) {
    console.log(error);

    const responseTimeMs = Date.now() - startTime;

    if (error.type === "aborted") {
      //Handle response timeout (Website taking too long to respond)
      //This isn't a true error and program should still run
      return {
        status: null,
        statusText: `System-set timeout of ${timeout} ms triggered: ${error.message} ${error.type}`,
        responseTimeMs,
      };
    } else if (error.errno === "ENOTFOUND") {
      //Handle 500 response (Not found)
      //This isn't a true error and program should still run
      return {
        status: 500,
        statusText: error.message,
        responseTimeMs,
      };
    } else {
      throw `${error}`;
    }
  }

  const status = response?.status;
  const statusText = response?.statusText;
  const responseTimeMs = Date.now() - startTime;
  return { status, statusText, responseTimeMs };
};
