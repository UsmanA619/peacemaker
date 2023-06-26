export const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI3ZTViYjk0Ni02MzZkLTRmZmUtODkzYi1kMmY3NmIwZjk0NWUiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4NzE0MDE4NSwiZXhwIjoxNjg3NzQ0OTg1fQ.iukdB3218CFaLzMRYByf3FKgudr6yfQlmEk4w01-16Y"; // token should be in String format

// API call to create meeting
export const createMeeting = async ({token}: {token: string}) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: 'POST',
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
  const {roomId}:{roomId: string} = await res.json();
  console.log('room id', roomId);
  return roomId;
};