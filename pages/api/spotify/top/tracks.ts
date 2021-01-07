import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
const getUsersTopTracks = async (req: NextApiRequest, res: NextApiResponse) => {
  //   const currentPage = req.query.page || 1;

  //   const perPage = 10;
  const session = await getSession({ req });

  if (session && session.accessToken) {
    return fetch("https://api.spotify.com/v1/me/top/tracks", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + session.accessToken,
      },
    });
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};

export default getUsersTopTracks;
