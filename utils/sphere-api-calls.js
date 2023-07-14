const getProblem = async (endpoint, accessToken, problemId) => {
  try {
    const response = await fetch(
      `https://${endpoint}/api/v4/problems/${problemId}?access_token=${accessToken}`,
      {
        method: "GET",
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      // console.log(data);
      return data;
    } else {
      if (response.status === 401) {
        throw new Error("Invalid access token");
      } else if (response.status === 403) {
        throw new Error("Access denied");
      } else if (response.status === 404) {
        throw new Error("Problem not found");
      } else {
        throw new Error("Connection problem");
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

const addProblem = async (endpoint, accessToken, body) => {
  const problemData = body;

  try {
    const response = await fetch(
      `https://${endpoint}/api/v4/problems?access_token=${accessToken}`,
      {
        method: "POST",
        body: new URLSearchParams(problemData),
      }
    );

    if (response.status === 201) {
      const data = await response.json();
      return data;
      // console.log(data);
    } else {
      if (response.status === 401) {
        throw new Error("Invalid access token");
      } else if (response.status === 400) {
        const body = await response.json();
        throw new Error(
          "Error code: " +
            body.error_code +
            ", details available in the message: " +
            body.message
        );
      } else {
        throw new Error("Connection problem");
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

const updateProblem = async (endpoint, accessToken, problemId, body) => {
  var problemData = body;
  try {
    const response = await fetch(
      `https://${endpoint}/api/v4/problems/${problemId}?access_token=${accessToken}`,
      {
        method: "PUT",
        body: new URLSearchParams(problemData),
      }
    );

    if (response.status === 200) {
      console.log("Problem updated");
      return response;
    } else {
      if (response.status === 401) {
        console.log("Invalid access token");
      } else if (response.status === 403) {
        console.log("Access denied");
      } else if (response.status === 404) {
        console.log("Problem does not exist");
      } else if (response.status === 400) {
        const body = await response.json();
        throw new Error(
          "Error code: " +
            body.error_code +
            ", details available in the message: " +
            body.message
        );
      } else {
        throw new Error("Connection problem");
      }
    }
  } catch (error) {
    console.log("Connection problem: " + error.message);
  }
};

const deleteProblem = async (endpoint, accessToken, problemId) => {
  try {
    const response = await fetch(
      `https://${endpoint}/api/v4/problems/${problemId}?access_token=${accessToken}`,
      {
        method: "DELETE",
      }
    );

    if (response.status === 200) {
      console.log("Problem deleted");
      return response;
    } else {
      if (response.status === 401) {
        console.log("Invalid access token");
      } else if (response.status === 403) {
        console.log("Access denied");
      } else if (response.status === 404) {
        console.log("Problem not found");
      } else {
        throw new Error("Connection problem");
      }
    }
  } catch (error) {
    console.log("Connection problem: " + error.message);
  }
};

const getTestCases = async (endpoint, accessToken, problemId) => {
  try {
    const response = await fetch(
      `https://${endpoint}/api/v4/problems/${problemId}/testcases?access_token=${accessToken}`,
      {
        method: "GET",
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      // console.log(data);
      return data;
    } else {
      if (response.status === 401) {
        console.log("Invalid access token");
      } else if (response.status === 403) {
        console.log("Access denied");
      } else if (response.status === 404) {
        console.log("Problem not found");
      } else {
        throw new Error("Connection problem");
      }
    }
  } catch (error) {
    console.log("Connection problem: " + error.message);
  }
};

const addTestCases = async (endpoint, accessToken, problemId, body) => {
  var testcaseData = body;

  try {
    const response = await fetch(
      `https://${endpoint}/api/v4/problems/${problemId}/testcases?access_token=${accessToken}`,
      {
        method: "POST",
        body: new URLSearchParams(testcaseData),
      }
    );

    if (response.status === 201) {
      const data = await response.json();
      // console.log(data);
      return data;
    } else {
      if (response.status === 401) {
        console.log("Invalid access token");
      } else if (response.status === 403) {
        console.log("Access denied");
      } else if (response.status === 404) {
        console.log("Problem does not exist");
      } else if (response.status === 400) {
        const body = await response.json();
        throw new Error(
          "Error code: " +
            body.error_code +
            ", details available in the message: " +
            body.message
        );
      } else {
        throw new Error("Connection problem");
      }
    }
  } catch (error) {
    console.log("Connection problem: " + error.message);
  }
};

const submission = async (endpoint, accessToken, body) => {
  const submissionData = body;

  try {
    const response = await fetch(
      `https://${endpoint}/api/v4/submissions?access_token=${accessToken}`,
      {
        method: "POST",
        body: new URLSearchParams(submissionData),
      }
    );

    if (response.status === 201) {
      const data = await response.json();
      // console.log(data);
      return data; // submission data in JSON
    } else {
      if (response.status === 401) {
        console.log("Invalid access token");
      } else if (response.status === 402) {
        console.log("Unable to create submission");
      } else if (response.status === 400) {
        const body = await response.json();
        throw new Error(
          "Error code: " +
            body.error_code +
            ", details available in the message: " +
            body.message
        );
      } else {
        throw new Error("Connection problem");
      }
    }
  } catch (error) {
    console.log("Connection problem: " + error.message);
  }
};

const getResult = async (endpoint, accessToken, ...submissionsIds) => {
  try {
    const response = await fetch(
      `https://${endpoint}/api/v4/submissions?ids=${submissionsIds.join()}&access_token=${accessToken}`,
      {
        method: "GET",
      }
    );

    if (response.status === 200) {
      const { items } = await response.json();
      return items;
    } else {
      if (response.status === 401) {
        console.log("Invalid access token");
      } else if (response.status === 400) {
        const body = await response.json();
        throw new Error(
          "Error code: " +
            body.error_code +
            ", details available in the message: " +
            body.message
        );
      } else {
        throw new Error("Connection problem");
      }
    }
  } catch (error) {
    console.log("Connection problem: " + error.message);
  }
};

// const problemId = 68; //A4B89G3RI7
// const problemAccessToken = "ba026bbdf222b7cc41a0d8bbe9183f2f";
// const problemEndPoint = "d1d01637.problems.sphere-engine.com";
// addProblem(problemEndPoint, problemAccessToken);
// getProblem(problemEndPoint, problemAccessToken, problemId);
// updateProblem(problemEndPoint, problemAccessToken, problemId);
// deleteProblem(problemEndPoint, problemAccessToken,problemId);
// getTestCases(problemEndPoint, problemAccessToken, problemId)
// addTestCases(problemEndPoint, problemAccessToken, problemId)
// const compilerAccessToken = "ddc7df4ea469f3a6594523eddb0bd5ed";
// const compilerEndPoint = "d1d01637.compilers.sphere-engine.com";

// submission(compilerEndPoint, compilerAccessToken,problemId)
// const submissionId = [578755654, 578760076];
// getResult(compilerEndPoint, compilerAccessToken, submissionId);

module.exports = {
  getProblem,
  addProblem,
  updateProblem,
  deleteProblem,
  addTestCases,
  getTestCases,
  submission,
  getResult,
};
