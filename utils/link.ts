import type { LinkStats, ShortLink } from "@prisma/client";

async function getLinks(
  userId: GetLinkVars
): Promise<GetLinkResult<ShortLink[]>> {
  const fetchResult = await fetch("http://localhost:3000/api/link", {
    method: "POST",
    body: JSON.stringify({ userId }) as string,
  });
  const res = await fetchResult.json();

  return res;
}

async function createLink({
  userId,
  url,
  slug,
}: CreateLinkVars): Promise<CreateLinkResult<ShortLink[]>> {
  const fetchResult = await fetch(
    "http://localhost:3000/api/link/create-link",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        url,
        slug,
      }),
    }
  );
  const res = await fetchResult.json();
  return res;
}

async function deleteLink({ id }: DeleteLinkVars) {
  const fetchResult = await fetch(
    "http://localhost:3000/api/link/delete-link",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    }
  );
  const res = await fetchResult.json();
  return res;
}

async function getLinkStats({
  slug,
  fromDate,
  toDate,
}: GetLinkStatsVars): Promise<GetLinkStatsResult<LinkStats[]>> {
  const fetchResult = await fetch("http://localhost:3000/api/link/stats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      slug,
      fromDate,
      toDate,
    }),
  });
  const res = await fetchResult.json();
  return res;
}

export { getLinks, createLink, deleteLink, getLinkStats };
