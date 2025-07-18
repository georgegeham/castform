import { Selected, Tournament, Reward, Play, ACTOR } from "./Types";
import axios, { AxiosResponse } from "axios";
//Tournaments
//GET Tournaments
const URL = "https://casthandasaserver-production.up.railway.app";
export const loadTournaments = async (): Promise<Selected[]> => {
  try {
    const response = await axios.get<Tournament[]>(`${URL}/tournaments`);
    return response.data.map((tournament: Tournament) => ({
      value: tournament.ID,
      label: tournament.tname,
    }));
  } catch (err) {
    console.log("Error while fetching trounaments", err);
    return [];
  }
};
//Post Tournament
export const createTournament = async (newInput: string): Promise<Selected> => {
  try {
    const response = await axios.post(
      ` ${URL}/tournaments`,
      { tname: newInput },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return {
      label: response.data.tname,
      value: response.data.ID,
    };
  } catch (err) {
    console.log("Error While Sending new Tournament", err);
    throw err;
  }
};
//Rewards
//Get Rewards
export const loadRewards = async (): Promise<Selected[]> => {
  try {
    const response = await axios.get<Reward[]>(`${URL}/reward`);
    return response.data.map((reward: Reward) => ({
      value: reward.ID,
      label: reward.rname,
    }));
  } catch (err) {
    console.log("Error while fetching Rewards");
    return [];
  }
};
//Create Reward
export const createReward = async (input: string): Promise<Selected> => {
  try {
    const response = await axios.post(
      `${URL}/reward`,
      { rname: input },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return {
      label: response.data.tname,
      value: response.data.ID,
    };
  } catch (err) {
    console.log("Error While Sending new Tournament", err);
    throw err;
  }
};

//Plays
//GET Plays
export const loadPlays = async (): Promise<Selected[]> => {
  try {
    const response = await axios.get<Play[]>(`${URL}/plays`);
    return response.data.map((play) => ({
      value: Date.now() + Math.random(),
      label: play.pname,
    }));
  } catch (err) {
    console.log("Error While loading plays", err);
    return [];
  }
};
//Post Plays
export const postPlay = async (
  inputValue: Play
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.post(
      `${URL}/plays`,
      { ...inputValue },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    console.log("Error While Creating Play");
    throw err;
  }
};

//Actor
//Post Actor

export const postActor = async (
  inputValue: ACTOR
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.post(
      `${URL}/actor`,
      { ...inputValue },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    console.log("Error While Creating Actor");
    throw err;
  }
};

//Upload Image
export async function uploadImageToImgbb(file: File): Promise<string> {
  const apiKey = "e4eca6a4b546d0715fddd3a8aa4ba56e";
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data.url;
}
