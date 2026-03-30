import axios from "axios";
import { env } from "../config/env.js";

export async function getAccessToken(code) {
  const tokenResponse = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: env.REDIRECT_URI,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`).toString(
            "base64",
          ),
      },
    },
  );

  return {
    accessToken: tokenResponse.data.access_token,
    scope: tokenResponse.data.scope,
  };
}

export async function getUserProfile(accessToken) {
  const userResponse = await axios.get("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return userResponse.data;
}

export async function createPlaylist(accessToken) {
  const playlistResponse = await axios.post(
    "https://api.spotify.com/v1/me/playlists",
    {
      name: env.PLAYLIST_NAME,
      description: env.PLAYLIST_DESCRIPTION,
      public: false,
      collaborative: false,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );

  return playlistResponse.data;
}

export async function searchTrack(accessToken, prompt) {
  const searchResponse = await axios.get("https://api.spotify.com/v1/search", {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: {
      q: prompt,
      type: "track",
      limit: 1,
    },
  });

  const track = searchResponse.data?.tracks?.items?.[0];
  if (!track) {
    throw new Error("No track found");
  }

  return { track, trackUri: track.uri };
}

export async function addTracksToPlaylist(accessToken, playlistId, trackUris) {
  await axios.post(
    `https://api.spotify.com/v1/playlists/${playlistId}/items`,
    { uris: trackUris },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );
}

