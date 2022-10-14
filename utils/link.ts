import type { ShortLink } from "@prisma/client";

async function getLinks({
  userId,
}: GetLinkVars): Promise<GetLinkResult<ShortLink[]>> {
  const fetchResult = await fetch("http://localhost:3000/api/link", {
    method: "POST",
    body: JSON.stringify({ userId }) as string,
  });
  const res = await fetchResult.json();

  return res.links;
}

async function createLink({
  user_id,
  url,
  slug,
}: CreateLinkVars): Promise<CreateLinkResult<ShortLink[]>> {
  const fetchResult = await fetch(
    "http://localhost:3000/api/link/create-link",
    {
      method: "POST",
      body: JSON.stringify({
        user_id,
        url,
        slug,
      }) as string,
    }
  );
  const res = await fetchResult.json();

  return res;
}

export { getLinks, createLink };
