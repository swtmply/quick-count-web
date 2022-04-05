import axios from "axios";

export async function getPositions() {
  try {
    const result = await axios.get("/api/positions").then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getCandidates(position: string) {
  try {
    const result = await axios
      .get(`/api/candidates?position=${position}`)
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
