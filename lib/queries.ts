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
export async function getAllVotes() {
  try {
    const result = await axios.get("/api/votes").then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}