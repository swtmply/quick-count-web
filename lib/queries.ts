import axios from "axios";

// Get all positions
export async function getPositions() {
  try {
    const result = await axios.get("/api/positions").then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}

// Get all position based on level
export async function getPositionsByLevel(level: string) {
  try {
    const result = await axios
      .get(`/api/positions?level=${level}`)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}

// Get all candidates per position
export async function getCandidates(position?: string) {
  try {
    const result = await axios
      .get(`/api/candidates?position=${position}`)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}

// Get national candidates
export async function getCandidatesByLevel(level?: string) {
  try {
    const result = await axios
      .get(`/api/candidates?level=${level}`)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}

// Get all regions
export async function getRegions() {
  try {
    const result = await axios.get("/api/regions").then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}

// Get all provinces in region
export async function getProvinces(reg_id: string) {
  try {
    const result = await axios
      .get(`/api/provinces?reg_id=${reg_id}`)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}

// Get all municipality in province
export async function getMunicipalities(prov_id: string) {
  try {
    const result = await axios
      .get(`/api/municipalities?prov_id=${prov_id}`)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}

// Get votes per candidates
export async function getAllVotes(position: string) {
  try {
    const result = await axios
      .get(`/api/votes?position=${position}`)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}

// Get votes per region
export async function getAllVotesPerRegion(region: string, position: string) {
  try {
    const result = await axios
      .get(`/api/votes?region=${region}&position=${position}`)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}

// Get votes per region
export async function getAllVotesPerProvince(
  province: string,
  position: string
) {
  try {
    const result = await axios
      .get(`/api/votes?province=${province}&position=${position}`)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}

// Get votes per region
export async function getAllVotesPerMunicipality(
  municipality: string,
  position: string,
  province: string
) {
  try {
    const result = await axios
      .get(
        `/api/votes?municipality=${municipality}&position=${position}&province=${province}`
      )
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}

// Get total ballot casts
export async function getBallotCasts() {
  try {
    const result = await axios.get("/api/ballot-count").then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}

// Get regional ballot cast
export async function getRegionalBallotCast(region: string) {
  try {
    const result = await axios
      .get(`/api/ballot-count?region=${region}`)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}

// Get provincial ballot cast
export async function getProvincialBallotCast(province: string) {
  try {
    const result = await axios
      .get(`/api/ballot-count?province=${province}`)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}

// Get municipal ballot cast
export async function getMunicipalBallotCast(
  province: string,
  municipal: string
) {
  try {
    const result = await axios
      .get(`/api/ballot-count?municipality=${municipal}&province=${province}`)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getTopCandidates(top: number) {
  try {
    const result = await axios
      .get(`/api/votes?top=${top}`)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}

// get all incidents type
export async function getIncidents(page: number) {
  try {
    const result = await axios
      .get(`/api/incidents?page=${page}`)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}

// get update incident
export async function updateIncidentRead(id: number) {
  try {
    const result = await axios
      .post(`/api/incidents?read=1`, { id })
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}

// get update incident
export async function updateIncidentStatus({
  id,
  newResolve,
}: {
  id: number;
  newResolve: string;
}) {
  try {
    const result = await axios
      .post(`/api/incidents?resolve=1`, { id, newResolve })
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}

// Search Incindent
export async function searchIncident(incident: string) {
  try {
    const result = await axios
      .post(`/api/incidents`, { incident })
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}

// get update incident
export async function getImageIncidentReport(ref_id: string) {
  try {
    const result = await axios
      .get(`/api/image?type=IR&ref_id=${ref_id}`)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}
